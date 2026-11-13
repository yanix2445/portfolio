import { expect, test } from "@playwright/test";

const PAGES = ["/", "/projets", "/veille", "/contact", "/mentions-legales"];

test.describe("pages publiques", () => {
  for (const path of PAGES) {
    test(`${path} répond et est en français`, async ({ page }) => {
      const response = await page.goto(path);

      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "fr");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});

test.describe("contenu MDX", () => {
  test("une entrée listée ouvre sa page de détail avec son corps", async ({ page }) => {
    await page.goto("/projets");
    const firstEntry = page.getByRole("main").getByRole("listitem").getByRole("link").first();
    const title = await firstEntry.getByRole("heading").innerText();

    await firstEntry.click();

    await expect(page).toHaveURL(/\/projets\/[\w-]+$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(page.locator("article time")).toBeVisible();
  });

  test("un slug inconnu répond 404", async ({ page }) => {
    const response = await page.goto("/projets/slug-qui-n-existe-pas");

    expect(response?.status()).toBe(404);
  });

  test("une URL inconnue répond 404 avec la page dédiée", async ({ page }) => {
    const response = await page.goto("/page-qui-n-existe-pas");

    expect(response?.status()).toBe(404);
    await expect(page).toHaveTitle(/Page introuvable/);
  });
});

test.describe("SEO technique", () => {
  test("le sitemap liste des URL absolues du site", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    expect(response.status()).toBe(200);
    expect(body).toContain("<loc>https://yanis-harrat.com/projets</loc>");
    expect(body).toMatch(/<loc>https:\/\/yanis-harrat\.com\/projets\/[\w-]+<\/loc>/);
  });

  test("robots.txt autorise l'indexation et pointe vers le sitemap", async ({ request }) => {
    const body = await (await request.get("/robots.txt")).text();

    expect(body).toContain("Allow: /");
    expect(body).toContain("Sitemap: https://yanis-harrat.com/sitemap.xml");
  });
});

test("la navigation principale mène aux sections", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Navigation principale" });

  for (const [label, path] of [
    ["Projets", "/projets"],
    ["Veille", "/veille"],
    ["Contact", "/contact"],
  ] as const) {
    await nav.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(path);
    await page.goto("/");
  }
});
