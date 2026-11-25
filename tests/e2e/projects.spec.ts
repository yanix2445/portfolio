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
    const filters = page.getByRole("radiogroup", { name: "Filtrer par domaine" }).getByRole("radio");
    const posters = page.locator("[data-poster]");
    const domain = filters.nth(1);
    const label = (await domain.innerText()).trim();

    await expect(filters.first()).toBeChecked();
    await domain.click();

    await expect(domain).toBeChecked();
    await expect(filters.first()).not.toBeChecked();
    const filtered = await posters.count();
    expect(filtered).toBeGreaterThan(0);
    // Dès qu'il y a plusieurs domaines, un filtre retire au moins un projet.
    if ((await filters.count()) > 2) expect(filtered).toBeLessThan(PROJECT_COUNT);
    for (const poster of await posters.all()) {
      await expect(poster).toContainText(new RegExp(label, "i"));
    }
    await expect(page.locator("[data-catalog-count]")).toContainText(String(filtered));

    // Recliquer sur le filtre actif ne le retire pas : un filtre reste toujours choisi.
    await domain.click();
    await expect(domain).toBeChecked();

    await filters.first().click();
    await expect(posters).toHaveCount(PROJECT_COUNT);
  });

  test("les filtres s'utilisent au clavier, avec un focus visible", async ({ page }) => {
    await page.goto("/projets");
    const filters = page.getByRole("radiogroup", { name: "Filtrer par domaine" }).getByRole("radio");
    const domain = filters.nth(1);

    // Le groupe se parcourt aux flèches : Tab y entre, la flèche passe au filtre suivant.
    // Les flèches n'agissent qu'une fois la page hydratée : on réessaie jusque-là.
    await expect(async () => {
      await filters.first().focus();
      await page.keyboard.press("ArrowRight");
      await expect(domain).toBeFocused({ timeout: 500 });
    }).toPass();
    const outline = await domain.evaluate((element) => {
      const style = getComputedStyle(element);
      return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
    });
    expect(outline.style).not.toBe("none");
    expect(outline.width).toBeGreaterThanOrEqual(2);

    await page.keyboard.press("Enter");
    await expect(domain).toBeChecked();
  });
});

test.describe("catalogue qui grandit", () => {
  test("un filtre se garde dans l'adresse et survit au rechargement", async ({ page }) => {
    await page.goto("/projets");
    const filters = page.getByRole("radiogroup", { name: "Filtrer par domaine" }).getByRole("radio");
    const domain = filters.nth(1);

    await expect(async () => {
      await domain.click();
      await expect(page).toHaveURL(/[?&]domaine=/, { timeout: 500 });
    }).toPass();
    await page.reload();
    await expect(filters.nth(1)).toBeChecked();
  });

  test("deux filtres sans projet commun le disent et proposent de tout réafficher", async ({ page }) => {
    await page.goto("/projets");
    const contexts = page.getByRole("radiogroup", { name: "Filtrer par cadre" }).getByRole("radio");
    const domains = page.getByRole("radiogroup", { name: "Filtrer par domaine" }).getByRole("radio");
    test.skip((await contexts.count()) < 3, "un seul cadre : pas de combinaison possible");
    await expect(async () => {
      await contexts.nth(1).click();
      await expect(contexts.nth(1)).toBeChecked({ timeout: 500 });
    }).toPass();

    // On cherche un domaine qui ne croise pas ce cadre ; s'il n'y en a pas, rien à vérifier.
    let empty = false;
    for (let index = 1; index < (await domains.count()); index++) {
      await domains.nth(index).click();
      if ((await page.locator("[data-poster]").count()) === 0) {
        empty = true;
        break;
      }
    }
    test.skip(!empty, "chaque domaine croise ce cadre");

    await expect(page.getByText("Aucun projet ne correspond à ces deux filtres.")).toBeVisible();
    await page.getByRole("button", { name: "Voir tous les projets" }).click();
    await expect(page.locator("[data-poster]")).toHaveCount(PROJECT_COUNT);
    await expect(page).not.toHaveURL(/[?&](cadre|domaine)=/);
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
