import { readdirSync } from "node:fs";

import { expect, test } from "@playwright/test";

const slugs = (collection: string) =>
  readdirSync(`src/content/${collection}`)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => `/${collection}/${file.replace(/\.mdx$/, "")}`);

const PAGES = [...slugs("projets"), ...slugs("veille")];

test.describe("fiches projet et articles de veille", () => {
  for (const url of PAGES) {
    test(`${url} : sommaire relié aux intertitres, générique et suite`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(url);
      const article = page.getByRole("article");

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(article.locator("header dl")).toContainText("Date");

      const sequences = page.getByRole("navigation", { name: "Séquences" }).getByRole("link");
      // Les intertitres du texte, sans le titre de la colonne « Documents ».
      const headings = article.locator(".prose h2[id]");
      const count = await headings.count();
      await expect(sequences).toHaveCount(count);
      for (let index = 0; index < count; index++) {
        const id = await headings.nth(index).getAttribute("id");
        await expect(sequences.nth(index)).toHaveAttribute("href", `#${id}`);
      }

      if (count > 0) {
        await sequences.last().click();
        await expect(sequences.last()).toHaveAttribute("aria-current", "location");
      }

      const next = page.getByRole("navigation", { name: "Suite" });
      await expect(next.getByRole("link").first()).toBeVisible();
    });
  }

  test("sur téléphone, la fiche ne déborde pas et le sommaire s'efface", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const url of PAGES) {
      await page.goto(url);
      await expect(page.getByRole("navigation", { name: "Séquences" })).toBeHidden();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, url).toBeLessThanOrEqual(0);
    }
  });
});
