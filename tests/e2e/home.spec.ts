import { readdirSync } from "node:fs";

import { expect, test, type Page } from "@playwright/test";

import { ACTS, CERTIFICATIONS, OPENING } from "../../src/lib/profile";
import { OWNER } from "../../src/lib/site";

const SECTION_IDS = [
  "hero-title",
  "acts-title",
  "bill-title",
  "sheet-title",
  "awards-title",
  "finale-title",
];

const PROJECT_COUNT = readdirSync("src/content/projets").filter((file) => file.endsWith(".mdx")).length;
const STATUS_LABELS = /À l'affiche|En tournage|Prochainement/;

function sectionIds(page: Page) {
  return page
    .locator("main section[aria-labelledby]")
    .evaluateAll((sections) => sections.map((section) => section.getAttribute("aria-labelledby")));
}

// Erreurs console, hors Vercel Analytics dont le script n'est servi que sur Vercel.
function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !message.location().url.includes("/_vercel/")) {
      errors.push(message.text());
    }
  });
  return errors;
}

// Parcourt la page à la molette jusqu'en bas. La hauteur est relue à chaque pas :
// les sections épinglées allongent la page après l'hydratation.
async function scrollThrough(page: Page) {
  for (let step = 0; step < 200; step++) {
    const atEnd = await page.evaluate(
      () =>
        new Promise<boolean>((resolve) =>
          requestAnimationFrame(() =>
            resolve(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2),
          ),
        ),
    );
    if (atEnd) return;
    await page.mouse.wheel(0, 600);
  }
  throw new Error("Le bas de la page n'a pas été atteint");
}

function overflowsHorizontally(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
}

test.describe("accueil", () => {
  test("affiche les six sections dans l'ordre, le nom en H1, sans erreur console", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");

    expect(await sectionIds(page)).toEqual(SECTION_IDS);
    await expect(page.getByRole("heading", { level: 1, name: OWNER.fullName })).toBeVisible();
    await scrollThrough(page);
    expect(errors).toEqual([]);
  });

  test("met 3 projets à la une, avec leur statut, et mène au catalogue", async ({ page }) => {
    await page.goto("/");
    const bill = page.locator("section[aria-labelledby='bill-title']");
    const posters = bill.locator("[data-poster]");

    await expect(posters).toHaveCount(3);
    for (const poster of await posters.all()) {
      await expect(poster).toContainText(STATUS_LABELS);
    }
    const all = bill.getByRole("link", { name: /Tous les projets/ });
    await expect(all).toContainText(`(${PROJECT_COUNT})`);
    await all.click();
    await expect(page).toHaveURL("/projets");
  });

  test("le clavier atteint les affiches et les boutons de fin avec un focus visible", async ({ page }) => {
    await page.goto("/");

    for (const selector of ["[data-poster]", "section[aria-labelledby='finale-title'] a"]) {
      const target = page.locator(selector).first();
      await target.scrollIntoViewIfNeeded();
      await target.focus();
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Tab");
      await expect(target).toBeFocused();
      const outline = await target.evaluate((element) => {
        const style = getComputedStyle(element);
        return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
      });
      expect(outline.style).not.toBe("none");
      expect(outline.width).toBeGreaterThanOrEqual(2);
    }
  });

  test("affiche les 5 actes, la fiche technique et une couronne par certification", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("[data-act]")).toHaveCount(ACTS.length);
    for (const act of ACTS) {
      await expect(page.getByRole("heading", { level: 3, name: act.place })).toBeAttached();
    }
    await expect(page.locator("section[aria-labelledby='awards-title'] li")).toHaveCount(
      CERTIFICATIONS.length,
    );
    await expect(page.getByRole("heading", { level: 2, name: "Fiche technique" })).toBeAttached();
  });
});

// Place le défilement à une fraction (0 à 1) d'une section épinglée.
async function scrollToPin(page: Page, selector: string, fraction: number) {
  await page.evaluate(
    ([target, at]) => {
      const spacer = document.querySelector(target as string)?.closest(".pin-spacer") as HTMLElement | null;
      if (!spacer) throw new Error(`Pas d'épinglage pour ${target}`);
      const top = spacer.getBoundingClientRect().top + window.scrollY;
      const length = spacer.offsetHeight - window.innerHeight;
      window.scrollTo(0, top + Math.max(0, length * (at as number) - 4));
    },
    [selector, fraction] as const,
  );
}

// Part de la hauteur du portrait rognée en haut, par le cadrage de l'image ou par son cadre.
// Les cheveux commencent vers 8 % : au-delà de 6 %, la tête n'est plus entière.
const HEAD_MARGIN = 0.06;

function headCrop(page: Page) {
  return page.evaluate(() => {
    const photo = document.querySelector("[data-hero-photo]") as HTMLImageElement;
    const plate = document.querySelector("[data-hero-plate]") as HTMLElement;
    const box = photo.getBoundingClientRect();
    const scale = Math.max(box.width / photo.naturalWidth, box.height / photo.naturalHeight);
    const imageHeight = photo.naturalHeight * scale;
    const positionY = parseFloat(getComputedStyle(photo).objectPosition.split(" ")[1]) / 100;
    const inset = /inset\(([\d.]+)px/.exec(getComputedStyle(plate).clipPath);
    const frameTop = plate.getBoundingClientRect().top + (inset ? parseFloat(inset[1]) : 0);
    const hidden = (imageHeight - box.height) * positionY + Math.max(0, frameTop - box.top);
    return hidden / imageHeight;
  });
}

function box(page: Page, selector: string) {
  return page.locator(selector).evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
  });
}

// Attend qu'un élément animé (intro, défilement lissé) ne bouge plus.
async function settle(page: Page, selector: string) {
  await expect(async () => {
    const before = await box(page, selector);
    await page.waitForTimeout(120);
    expect(await box(page, selector)).toEqual(before);
  }).toPass();
}

test.describe("mise en scène sur grand écran", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("la photo se range en affiche, la tête entière à chaque instant", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pin-spacer")).toHaveCount(2);
    await expect(page.locator("[data-hero-photo]")).toHaveJSProperty("complete", true);

    for (const fraction of [0, 0.25, 0.5, 0.75, 1]) {
      await scrollToPin(page, "[data-hero]", fraction);
      await settle(page, "[data-hero-photo]");
      expect(await headCrop(page), `à ${fraction * 100} % du hero`).toBeLessThan(HEAD_MARGIN);
    }

    // Fin de l'animation : l'affiche est calée en haut de son cadre, à 13 % de l'écran.
    const poster = await box(page, "[data-hero-photo]");
    expect(Math.abs(poster.top - 900 * 0.13)).toBeLessThan(6);
    expect(Math.abs(poster.height - 900 * 0.7)).toBeLessThan(6);
    await expect(page.locator("[data-hero-photo]")).toHaveCSS("object-position", "50% 0%");
    await expect(page.locator("[data-hero-synopsis]")).toBeVisible();
    await expect(page.locator("[data-hero-synopsis]")).toContainText(OPENING.synopsisAccent);
  });

  test("l'intro masque tout d'un coup : rien ne reste affiché pour disparaître ensuite", async ({ page }) => {
    // Une mesure par image, dès que le hero existe.
    await page.addInitScript(() => {
      const frames: { line: boolean; slate: number; kicker: number; cue: number }[] = [];
      Object.assign(window, { __frames: frames });
      const opacity = (selector: string) => {
        const element = document.querySelector(selector);
        return element ? Number(getComputedStyle(element).opacity) : 1;
      };
      const tick = () => {
        const line = document.querySelector("[data-hero-line]");
        if (line) {
          frames.push({
            line: getComputedStyle(line).transform !== "none",
            slate: opacity("[data-hero-slate]"),
            kicker: opacity("[data-hero-kicker]"),
            cue: opacity("[data-hero-cue]"),
          });
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await page.goto("/");

    // L'intro a commencé quand le nom a quitté sa place.
    await expect
      .poll(() => page.evaluate(() => (window as unknown as { __frames: { line: boolean }[] }).__frames.some((frame) => frame.line)))
      .toBe(true);
    const first = await page.evaluate(() => {
      const frames = (window as unknown as { __frames: { line: boolean; slate: number; kicker: number; cue: number }[] }).__frames;
      return frames.find((frame) => frame.line);
    });
    expect(first).toMatchObject({ slate: 0, kicker: 0, cue: 0 });

    // Et tout finit affiché.
    for (const selector of ["[data-hero-slate]", "[data-hero-kicker]", "[data-hero-cue]"]) {
      await expect(page.locator(selector).first()).toHaveCSS("opacity", "1");
    }
  });

  test("le synopsis reste lu par les lecteurs d'écran pendant le hero épinglé", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pin-spacer")).toHaveCount(2);
    const flow = page.locator("[data-hero-synopsis-flow]");

    // La copie affichée dans le hero est décorative ; la copie du flux reste dans l'arbre d'accessibilité.
    await expect(page.locator("[data-hero-synopsis]")).toHaveAttribute("aria-hidden", "true");
    await expect(flow).not.toHaveCSS("display", "none");
    await expect(flow).not.toHaveCSS("visibility", "hidden");
    await expect(flow).toContainText(OPENING.synopsis);
    expect((await box(page, "[data-hero-synopsis-flow]")).height).toBeLessThanOrEqual(1);
  });

  test("les actes sont épinglés et défilent jusqu'au dernier", async ({ page }) => {
    await page.goto("/");
    const acts = page.locator("[data-acts]");
    await expect(acts).toHaveAttribute("data-orientation", "horizontal");

    // Le premier acte est lisible dès que la section est épinglée, avant tout défilement horizontal.
    await scrollToPin(page, "[data-acts]", 0);
    const first = page.getByRole("heading", { level: 3, name: ACTS[0].place });
    await expect(first).toBeInViewport();
    await expect(first).toHaveCSS("opacity", "1");

    await scrollToPin(page, "[data-acts]", 1);

    const last = ACTS[ACTS.length - 1];
    await expect(page.getByRole("heading", { level: 3, name: last.place })).toBeInViewport();
    await expect(page.getByRole("heading", { level: 3, name: last.place })).toHaveCSS("opacity", "1");
    await expect(page.locator("[data-acts-count]")).toHaveText(`Acte ${ACTS.length} / ${ACTS.length}`);
  });

  test("une fois la page parcourue, tout est affiché et les affiches ont retrouvé leur style", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);

    // À la fin de son apparition, l'affiche ne garde aucun style posé par l'animation : le survol CSS s'applique.
    for (const poster of await page.locator("[data-reveal='poster']").all()) {
      await expect(poster).not.toHaveAttribute("style", /\S/);
    }
    await expect
      .poll(() =>
        page
          .locator("[data-reveal]")
          .evaluateAll((elements) => elements.filter((element) => getComputedStyle(element).opacity !== "1").length),
      )
      .toBe(0);
  });

  test("en repassant sur petit écran, la photo retrouve son cadre et plus rien n'est épinglé", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pin-spacer")).toHaveCount(2);

    await page.setViewportSize({ width: 600, height: 800 });

    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator("[data-acts]")).not.toHaveAttribute("data-orientation", "horizontal");
    await expect(page.locator("[data-hero-synopsis-flow]")).toBeVisible();
    await expect(async () => {
      const photo = await box(page, "[data-hero-photo]");
      const frame = await box(page, "[data-hero-plate]");
      expect(Math.round(photo.width)).toBe(Math.round(frame.width));
      expect(Math.round(photo.height)).toBe(Math.round(frame.height));
    }).toPass();
    expect(await headCrop(page)).toBeLessThan(HEAD_MARGIN);
    expect(await overflowsHorizontally(page)).toBe(false);
  });

  test("ne laisse aucun épinglage orphelin après une navigation client", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");

    await page
      .getByRole("navigation", { name: "Navigation principale" })
      .getByRole("link", { name: "Projets" })
      .click();
    await expect(page).toHaveURL("/projets");
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await page.getByRole("banner").getByRole("link", { name: OWNER.fullName, exact: true }).click();
    await expect(page).toHaveURL("/");
    await expect(page.locator(".pin-spacer")).toHaveCount(2);
    await scrollThrough(page);
    expect(errors).toEqual([]);
  });
});

// Le hero se compose en fonction de la largeur ET de la hauteur : on le vérifie hors du 1440 × 900 de la maquette.
for (const [label, viewport] of [
  ["portable 16:9", { width: 1366, height: 650 }],
  ["écran ultra-large", { width: 2560, height: 1080 }],
  ["tablette en portrait", { width: 768, height: 1024 }],
] as const) {
  test.describe(`hero sur ${label}`, () => {
    test.use({ viewport });

    test("rien ne se chevauche, la tête est entière et la page ne déborde pas", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator(".pin-spacer")).toHaveCount(2);
      await expect(page.locator("[data-hero-photo]")).toHaveJSProperty("complete", true);

      // Premier écran, une fois l'intro jouée : la légende est au-dessus du nom, le haut de la tête dans le cadre.
      await settle(page, "[data-hero-photo]");
      expect((await box(page, "[data-hero-kicker]")).bottom).toBeLessThan((await box(page, "[data-hero-title]")).top);
      expect(await headCrop(page)).toBeLessThan(HEAD_MARGIN);
      expect(await overflowsHorizontally(page)).toBe(false);

      // Fin du hero : le synopsis est au-dessus du nom rétréci.
      await scrollToPin(page, "[data-hero]", 1);
      await expect(page.locator("[data-hero-synopsis]")).toHaveCSS("opacity", "1");
      await expect(async () => {
        const synopsis = await box(page, "[data-hero-synopsis]");
        const title = await box(page, "[data-hero-title]");
        expect(synopsis.bottom).toBeLessThan(title.top);
      }).toPass();
      await settle(page, "[data-hero-photo]");
      expect(await headCrop(page)).toBeLessThan(HEAD_MARGIN);

      // Aucun acte n'est plus large que l'écran.
      const overflowing = await page
        .locator("[data-act]")
        .evaluateAll((acts) => acts.filter((act) => act.scrollWidth > act.clientWidth + 1).length);
      expect(overflowing).toBe(0);
      await scrollThrough(page);
      expect(await overflowsHorizontally(page)).toBe(false);
    });
  });
}

test.describe("accueil sur téléphone en paysage", () => {
  test.use({ viewport: { width: 844, height: 390 } });

  test("l'écran est trop bas pour épingler : tout reste en colonne", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);

    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator("[data-acts]")).not.toHaveAttribute("data-orientation", "horizontal");
    await expect(page.locator("[data-hero-synopsis-flow]")).toBeVisible();
    expect(await overflowsHorizontally(page)).toBe(false);
  });
});

test.describe("accueil avec moins de mouvement", () => {
  test.use({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });

  test("rien n'est épinglé ni masqué, les actes restent en colonne", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);

    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator("[data-acts]")).not.toHaveAttribute("data-orientation", "horizontal");
    await expect(page.locator("[data-hero-synopsis-flow]")).toBeVisible();
    for (const act of ACTS) {
      await expect(page.getByRole("heading", { level: 3, name: act.place })).toBeVisible();
    }
    const hidden = await page
      .locator("[data-reveal], [data-act-item], [data-hero-line]")
      .evaluateAll((elements) => elements.filter((element) => getComputedStyle(element).opacity !== "1").length);
    expect(hidden).toBe(0);
  });
});

test.describe("accueil sans JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("le nom, le synopsis, la photo et toutes les sections sont dans le HTML", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: OWNER.fullName })).toBeVisible();
    // La copie lue du synopsis suit le hero ; celle du hero est décorative et posée par l'animation.
    await expect(page.locator("[data-hero-synopsis-flow]")).toContainText(OPENING.synopsis);
    await expect(page.locator("[data-hero-synopsis-flow]")).toBeVisible();
    await expect(page.getByRole("img", { name: `Portrait de ${OWNER.fullName}` })).toBeVisible();
    expect(await sectionIds(page)).toEqual(SECTION_IDS);
    for (const act of ACTS) {
      await expect(page.getByRole("heading", { level: 3, name: act.place })).toBeVisible();
    }
    await expect(page.locator("[data-poster]")).toHaveCount(3);
  });
});

test.describe("accueil sur mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("aucun débordement horizontal, actes en colonne", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);

    expect(await overflowsHorizontally(page)).toBe(false);
    const lefts = await page
      .locator("[data-act]")
      .evaluateAll((acts) => acts.map((act) => Math.round(act.getBoundingClientRect().left)));
    expect(new Set(lefts).size).toBe(1);
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
  });

  test("le nom d'un organisme ne déborde pas sur les feuilles de sa couronne", async ({ page }) => {
    await page.goto("/");

    const overflowing = await page.locator("[data-laurel-body]").evaluateAll(
      (bodies) =>
        bodies.filter((body) => {
          const limit = body.getBoundingClientRect().width + 1;
          return [...body.children].some((child) => child.getBoundingClientRect().width > limit);
        }).length,
    );
    expect(overflowing).toBe(0);
  });
});
