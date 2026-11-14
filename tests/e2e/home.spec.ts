import { expect, test, type Page } from "@playwright/test";

import { CERTIFICATIONS, HERO } from "../../src/lib/profile";
import { OWNER } from "../../src/lib/site";

const SECTION_IDS = [
  "hero-title",
  "skills-title",
  "certifications-title",
  "timeline-title",
  "projects-title",
  "watch-contact-title",
];

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

test.describe("accueil", () => {
  test("affiche les six sections dans l'ordre, le nom en H1, sans erreur console", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: OWNER.fullName })).toBeVisible();
    expect(await sectionIds(page)).toEqual(SECTION_IDS);
    await scrollThrough(page);
    expect(errors).toEqual([]);
  });

  test("épingle le parcours et le fait défiler horizontalement sur desktop", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".pin-spacer")).toHaveCount(1);
    await expect(page.locator('[data-orientation="horizontal"] [data-timeline-track]')).toHaveCount(1);
  });

  test("ne laisse aucun ScrollTrigger orphelin après une navigation client", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Navigation principale" });

    await nav.getByRole("link", { name: "Projets" }).click();
    await expect(page).toHaveURL("/projets");
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await page.getByRole("banner").getByRole("link", { name: OWNER.fullName, exact: true }).click();
    await expect(page).toHaveURL("/");
    await expect(page.locator(".pin-spacer")).toHaveCount(1);
    await scrollThrough(page);
    expect(errors).toEqual([]);
  });

  test("le clavier atteint les boutons du hero avec un focus visible", async ({ page }) => {
    await page.goto("/");
    const projectsButton = page.getByRole("link", { name: "Voir les projets" });

    for (let step = 0; step < 15; step++) {
      await page.keyboard.press("Tab");
      if (await projectsButton.evaluate((element) => element === document.activeElement)) break;
    }

    await expect(projectsButton).toBeFocused();
    expect(await projectsButton.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe("solid");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Télécharger le CV" })).toBeFocused();
  });
});

test.describe("accueil sans JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("le nom, l'accroche, la photo et les six sections sont dans le HTML", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: OWNER.fullName })).toBeVisible();
    await expect(page.getByText(HERO.role).first()).toBeVisible();
    await expect(page.getByRole("img", { name: OWNER.fullName })).toBeVisible();
    expect(await sectionIds(page)).toEqual(SECTION_IDS);
  });
});

test.describe("accueil avec moins de mouvement", () => {
  test.use({ reducedMotion: "reduce" });

  test("tout est visible, rien n'est épinglé ni masqué", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);

    for (const id of SECTION_IDS) {
      await expect(page.locator(`[aria-labelledby="${id}"]`)).toBeVisible();
    }
    const badges = page.getByRole("list", { name: "Certifications obtenues" }).getByRole("listitem");
    await expect(badges).toHaveCount(CERTIFICATIONS.length);
    for (const badge of await badges.all()) {
      await expect(badge).toBeVisible();
    }
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    const opacities = await page
      .locator("[data-reveal], [data-hero-reveal], [data-hero-letter]")
      .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).opacity));
    expect(opacities.every((opacity) => opacity === "1")).toBe(true);
  });
});

test.describe("accueil sur mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("aucun débordement horizontal et parcours non épinglé", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
  });
});
