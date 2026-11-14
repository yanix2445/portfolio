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

test.describe("accueil sans JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("le nom, le synopsis, la photo et toutes les sections sont dans le HTML", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: OWNER.fullName })).toBeVisible();
    await expect(page.getByText(OPENING.synopsis).first()).toBeVisible();
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
