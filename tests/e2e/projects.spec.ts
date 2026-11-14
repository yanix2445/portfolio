import { readdirSync } from "node:fs";

import { expect, test } from "@playwright/test";

const PROJECT_COUNT = readdirSync("src/content/projets").filter((file) => file.endsWith(".mdx")).length;
const STATUS_LABELS = /À l'affiche|En tournage|Prochainement/;

test.describe("catalogue des projets", () => {
  test("liste tous les projets, chacun avec son statut et un lien vers sa fiche", async ({ page }) => {
    await page.goto("/projets");
    const posters = page.locator("[data-poster]");

    await expect(page.getByRole("heading", { level: 1, name: "Tous les projets" })).toBeVisible();
    await expect(posters).toHaveCount(PROJECT_COUNT);
    for (const poster of await posters.all()) {
      await expect(poster).toContainText(STATUS_LABELS);
      await expect(poster).toHaveAttribute("href", /^\/projets\/[\w-]+$/);
    }
  });

  test("un filtre réduit la liste à son domaine, « Tous » la rétablit", async ({ page }) => {
    await page.goto("/projets");
    const filters = page.getByRole("group", { name: "Filtrer par domaine" }).getByRole("button");
    const posters = page.locator("[data-poster]");
    const domain = filters.nth(1);
    const label = (await domain.innerText()).trim();

    await domain.click();

    await expect(domain).toHaveAttribute("aria-pressed", "true");
    const filtered = await posters.count();
    expect(filtered).toBeGreaterThan(0);
    // Dès qu'il y a plusieurs domaines, un filtre retire au moins un projet.
    if ((await filters.count()) > 2) expect(filtered).toBeLessThan(PROJECT_COUNT);
    for (const poster of await posters.all()) {
      await expect(poster).toContainText(new RegExp(label, "i"));
    }
    await expect(page.locator("[data-catalog-count]")).toContainText(String(filtered));

    await filters.first().click();
    await expect(posters).toHaveCount(PROJECT_COUNT);
  });

  test("les filtres s'utilisent au clavier, avec un focus visible", async ({ page }) => {
    await page.goto("/projets");
    const domain = page
      .getByRole("group", { name: "Filtrer par domaine" })
      .getByRole("button")
      .nth(1);

    await domain.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(domain).toBeFocused();
    const outline = await domain.evaluate((element) => {
      const style = getComputedStyle(element);
      return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
    });
    expect(outline.style).not.toBe("none");
    expect(outline.width).toBeGreaterThanOrEqual(2);

    await page.keyboard.press("Enter");
    await expect(domain).toHaveAttribute("aria-pressed", "true");
  });
});

test.describe("catalogue sans JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("tous les projets sont listés", async ({ page }) => {
    await page.goto("/projets");

    await expect(page.locator("[data-poster]")).toHaveCount(PROJECT_COUNT);
  });
});

test.describe("catalogue sur mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("aucun débordement horizontal", async ({ page }) => {
    await page.goto("/projets");

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
    ).toBe(false);
  });
});
