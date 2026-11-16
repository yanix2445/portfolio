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
    // L'affiche montre un titre court : le titre complet de la fiche est porté par le lien.
    const title = (await firstEntry.getAttribute("data-title")) ?? "";
    expect(title).not.toBe("");

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
    // La page courante est signalée, aussi aux lecteurs d'écran.
    await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
    await page.goto("/");
  }
});

test.describe("contact", () => {
  test("la page contact expose l'e-mail, le téléphone et les profils", async ({ page }) => {
    await page.goto("/contact");
    const main = page.getByRole("main");

    await expect(main.getByRole("link", { name: "yanis@yanis-harrat.com" })).toHaveAttribute(
      "href",
      "mailto:yanis@yanis-harrat.com",
    );
    await expect(main.getByRole("link", { name: "07 68 18 79 34" })).toHaveAttribute(
      "href",
      "tel:+33768187934",
    );
    await expect(main.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/yanis-harrat/",
    );
    await expect(main.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/yanix2445",
    );
  });

  test("le footer pointe vers les vrais profils", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");

    await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/yanix2445",
    );
    await expect(footer.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/yanis-harrat/",
    );
  });

  test("le CV est téléchargeable", async ({ request }) => {
    const response = await request.get("/cv/yanis-harrat-cv.pdf");

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
  });

  test("l'accueil déclare la personne en JSON-LD", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const person = JSON.parse(raw ?? "{}");

    expect(person).toMatchObject({
      "@type": "Person",
      name: "Yanis HARRAT",
      sameAs: ["https://www.linkedin.com/in/yanis-harrat/", "https://github.com/yanix2445"],
    });
  });
});
