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

async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let top = 0; top < height; top += 400) {
    await page.mouse.wheel(0, 400);
  }
  await page.waitForTimeout(300);
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

// Fin d'une section épinglée : le bas de son espace d'épinglage arrive en bas de l'écran.
async function scrollToPinEnd(page: Page, selector: string) {
  await page.evaluate((target) => {
    const spacer = document.querySelector(target)?.closest(".pin-spacer") as HTMLElement | null;
    if (!spacer) throw new Error(`Pas d'épinglage pour ${target}`);
    const top = spacer.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + spacer.offsetHeight - window.innerHeight - 4);
  }, selector);
  await page.waitForTimeout(1600);
}

test.describe("mise en scène sur grand écran", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("la photo se range en affiche sans rogner la tête", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pin-spacer")).toHaveCount(2);

    await scrollToPinEnd(page, "[data-hero]");

    const photo = page.locator("[data-hero-photo]");
    const frame = await photo.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top,
        height: rect.height,
        position: getComputedStyle(element).objectPosition,
        viewport: window.innerHeight,
      };
    });
    // Le haut de l'image coïncide avec le haut du cadre (13 % de l'écran) : rien n'est coupé en haut.
    expect(Math.abs(frame.top - frame.viewport * 0.13)).toBeLessThan(6);
    expect(Math.abs(frame.height - frame.viewport * 0.7)).toBeLessThan(6);
    expect(frame.position).toBe("50% 0%");
    await expect(page.locator("[data-hero-synopsis]")).toBeVisible();
    await expect(page.locator("[data-hero-synopsis]")).toContainText(OPENING.synopsisAccent);
  });

  test("les actes sont épinglés et défilent jusqu'au dernier", async ({ page }) => {
    await page.goto("/");
    const acts = page.locator("[data-acts]");
    await expect(acts).toHaveAttribute("data-orientation", "horizontal");

    // Le premier acte est lisible dès que la section est épinglée, avant tout défilement horizontal.
    await page.evaluate(() => {
      const spacer = document.querySelector("[data-acts]")?.closest(".pin-spacer") as HTMLElement;
      window.scrollTo(0, spacer.getBoundingClientRect().top + window.scrollY);
    });
    const first = page.getByRole("heading", { level: 3, name: ACTS[0].place });
    await expect(first).toBeInViewport();
    await expect.poll(() => first.evaluate((element) => getComputedStyle(element).opacity)).toBe("1");

    await scrollToPinEnd(page, "[data-acts]");

    const last = ACTS[ACTS.length - 1];
    await expect(page.getByRole("heading", { level: 3, name: last.place })).toBeInViewport();
    await expect(page.locator("[data-acts-count]")).toHaveText(`Acte ${ACTS.length} / ${ACTS.length}`);
  });

  test("les affiches finissent droites et gardent leur survol", async ({ page }) => {
    await page.goto("/");
    const poster = page.locator("[data-reveal='poster']").first();
    await poster.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2200);

    expect(await poster.evaluate((element) => element.getAttribute("style") ?? "")).toBe("");
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
});
