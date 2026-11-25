import { readdirSync } from "node:fs";

import { expect, test } from "@playwright/test";

import { VEILLE } from "../../src/lib/veille";

const slugs = (collection: string) =>
  readdirSync(`src/content/${collection}`)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => `/${collection}/${file.replace(/\.mdx$/, "")}`);

const PAGES = [...slugs("projets"), ...slugs("veille")];

test("chaque ligne de la veille est un lien nommé par son seul titre", async ({ page }) => {
  await page.goto("/veille");
  const links = page.getByRole("main").getByRole("listitem").getByRole("link");
  const count = await links.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index++) {
    const link = links.nth(index);
    // Le titre affiché (espaces insécables compris) est porté par `data-title`.
    await expect(link).toHaveAccessibleName((await link.getAttribute("data-title")) ?? "");
    await expect(link).toContainText("Lire l'article");
  }
});

test("chaque fiche de la veille s'ouvre depuis la liste, sur sa propre page", async ({ page }) => {
  await page.goto("/veille");
  const links = page.getByRole("main").getByRole("listitem").getByRole("link");
  const targets = await links.evaluateAll((elements) =>
    elements.map((element) => ({
      href: element.getAttribute("href") ?? "",
      title: element.getAttribute("data-title") ?? "",
    })),
  );
  expect(targets.length).toBeGreaterThan(0);

  for (const { href, title } of targets) {
    await page.goto("/veille");
    await page.locator(`a[href="${href}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    // Le titre affiché (espaces insécables compris) est porté par `data-title`.
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
  }
});

test.describe("présentation de la veille", () => {
  test("la présentation précède les fiches publiées et tient sur téléphone", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/veille");
    const main = page.getByRole("main");

    const intro = main.getByRole("region", { name: "Présentation de la veille" });
    await expect(intro).toContainText(VEILLE.question.slice(0, 40));
    await expect(intro).toContainText(VEILLE.position.admin);
    const fiches = main.getByRole("heading", { level: 2, name: "Fiches publiées" });
    await expect(fiches).toBeVisible();
    // La présentation vient avant la liste des fiches.
    expect((await intro.boundingBox())!.y).toBeLessThan((await fiches.boundingBox())!.y);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
    ).toBe(false);
  });

  test.describe("sans JavaScript", () => {
    test.use({ javaScriptEnabled: false });

    test("la présentation et chaque fiche sont dans la page", async ({ page }) => {
      await page.goto("/veille");
      const main = page.getByRole("main");

      await expect(main.getByText(VEILLE.position.admin)).toBeVisible();
      await expect(main.getByRole("heading", { level: 2, name: "Fiches publiées" })).toBeVisible();
      const count = readdirSync("src/content/veille").filter((file) => file.endsWith(".mdx")).length;
      await expect(main.getByRole("listitem").getByRole("link", { name: /.+/ }).and(main.locator("a[data-title]"))).toHaveCount(count);
    });
  });
});

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
