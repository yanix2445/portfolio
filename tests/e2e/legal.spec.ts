import { expect, test } from "@playwright/test";

import { HOST, PROVIDERS, TREATMENTS } from "../../src/lib/legal";
import { CONTACT, OWNER } from "../../src/lib/site";

test.describe("mentions légales", () => {
  test("donnent l'éditeur, le directeur de la publication et l'hébergeur", async ({ page }) => {
    await page.goto("/mentions-legales");
    const main = page.getByRole("main");

    await expect(main.locator("time")).toHaveAttribute("datetime", /^\d{4}-\d{2}-\d{2}$/);
    for (const label of ["Éditeur", "Directeur de la publication", "Hébergeur"]) {
      await expect(main.getByRole("term").filter({ hasText: new RegExp(`^${label}$`) })).toBeVisible();
    }
    await expect(main.getByText(`${OWNER.fullName}, particulier`)).toBeVisible();
    await expect(main.getByText(HOST.address, { exact: false })).toBeVisible();
    await expect(main.getByRole("link", { name: CONTACT.email }).first()).toHaveAttribute(
      "href",
      `mailto:${CONTACT.email}`,
    );
    for (const provider of PROVIDERS) {
      await expect(main.getByRole("term").filter({ hasText: provider.role })).toBeVisible();
    }
  });

  test("décrivent chaque traitement de données et les droits du visiteur", async ({ page }) => {
    await page.goto("/mentions-legales");
    const main = page.getByRole("main");

    for (const treatment of TREATMENTS) {
      await expect(main.getByRole("heading", { level: 3, name: treatment.title })).toBeVisible();
    }
    // Chaque fiche porte les cinq informations du RGPD (art. 13).
    for (const field of ["Données", "Pourquoi", "Base légale", "Conservation", "Destinataires"]) {
      await expect(main.getByRole("term").filter({ hasText: new RegExp(`^${field}$`) })).toHaveCount(
        TREATMENTS.length,
      );
    }
    await expect(main.getByRole("link", { name: "CNIL" })).toHaveAttribute("href", /cnil\.fr/);
  });

  test("le sommaire mène à chaque partie", async ({ page }) => {
    await page.goto("/mentions-legales");
    const sequences = page.getByRole("navigation", { name: "Séquences" }).getByRole("link");
    const headings = page.getByRole("main").locator(".prose h2[id]");

    await expect(sequences).toHaveCount(await headings.count());
    for (const [index, link] of (await sequences.all()).entries()) {
      await expect(link).toHaveAttribute("href", `#${await headings.nth(index).getAttribute("id")}`);
    }
  });

  test.describe("sur mobile", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("se lisent sans défilement horizontal, l'essentiel avant le texte", async ({ page }) => {
      await page.goto("/mentions-legales");

      await expect(page.getByRole("navigation", { name: "Séquences" })).toBeHidden();
      const essentials = await page.getByRole("heading", { name: "L'essentiel" }).boundingBox();
      const first = await page.getByRole("heading", { level: 2, name: /Éditeur et hébergeur/ }).boundingBox();
      expect(essentials!.y).toBeLessThan(first!.y);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
        ),
      ).toBe(false);
    });
  });
});
