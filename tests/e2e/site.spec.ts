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

test.describe("en-têtes de sécurité", () => {
  for (const path of ["/", "/contact", "/page-qui-n-existe-pas"]) {
    test(`${path} interdit l'encadrement et le reniflage de type`, async ({ request }) => {
      const headers = (await request.get(path)).headers();

      expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
      expect(headers["content-security-policy"]).toContain("object-src 'none'");
      expect(headers["x-frame-options"]).toBe("DENY");
      expect(headers["x-content-type-options"]).toBe("nosniff");
      expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
      expect(headers["permissions-policy"]).toContain("camera=()");
    });
  }

  // La politique ne doit rien bloquer de ce que le site charge, Turnstile compris (`/contact`).
  for (const path of PAGES) {
    test(`${path} ne déclenche aucune violation de la politique`, async ({ page }) => {
      const violations: string[] = [];
      page.on("console", (message) => {
        if (message.text().includes("Content Security Policy")) violations.push(message.text());
      });

      await page.goto(path, { waitUntil: "load" });
      if (path === "/contact") {
        // Un jeton prouve que le script et le cadre de Turnstile ont pu se charger.
        await expect(page.locator("input[name='cf-turnstile-response']")).not.toHaveValue("", {
          timeout: 20_000,
        });
      }

      expect(violations).toEqual([]);
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

  test("les pages du site partagent l'image du site", async ({ page, request }) => {
    for (const path of ["/", "/projets", "/veille", "/contact"]) {
      await page.goto(path);
      const image = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(image, path).toMatch(/^https:\/\/yanis-harrat\.com\/opengraph-image/);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    }

    const response = await request.get("/opengraph-image");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");
  });

  test("chaque fiche partage sa propre image", async ({ page, request }) => {
    for (const collection of ["projets", "veille"] as const) {
      await page.goto(`/${collection}`);
      const hrefs = await page
        .locator(`main a[href^="/${collection}/"]`)
        .evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")!))]);
      expect(hrefs.length).toBeGreaterThan(0);

      for (const href of hrefs) {
        await page.goto(href);
        const image = await page.locator('meta[property="og:image"]').getAttribute("content");
        expect(image, href).toMatch(new RegExp(`^https://yanis-harrat\\.com${href}/opengraph-image`));

        const response = await request.get(`${href}/opengraph-image`);
        expect(response.status(), href).toBe(200);
        expect(response.headers()["content-type"]).toBe("image/png");
      }
    }
  });

  test("chaque fiche déclare son article et son auteur en JSON-LD", async ({ page }) => {
    for (const collection of ["projets", "veille"] as const) {
      await page.goto(`/${collection}`);
      const href = await page.locator(`main a[href^="/${collection}/"]`).first().getAttribute("href");
      await page.goto(href!);
      const raw = await page.locator('script[type="application/ld+json"]').textContent();
      const graph: Record<string, unknown>[] = JSON.parse(raw ?? "{}")["@graph"];

      expect(graph).toContainEqual(
        expect.objectContaining({
          "@type": collection === "veille" ? "BlogPosting" : "TechArticle",
          url: `https://yanis-harrat.com${href}`,
          author: { "@id": "https://yanis-harrat.com/#person" },
        }),
      );
    }
  });

  test("llms.txt résume le profil pour les assistants IA", async ({ request }) => {
    const response = await request.get("/llms.txt");

    expect(response.status()).toBe(200);
    expect(await response.text()).toMatch(/^# Yanis Harrat/);
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
  test("la page contact expose l'e-mail, la réservation d'un appel et les profils", async ({ page }) => {
    await page.goto("/contact");
    const main = page.getByRole("main");

    await expect(main.getByRole("link", { name: "yanis@yanis-harrat.com" })).toHaveAttribute(
      "href",
      "mailto:yanis@yanis-harrat.com",
    );
    await expect(main.getByRole("link", { name: /Réserver un appel/ })).toHaveAttribute(
      "href",
      "https://cal.com/yanis-harrat/rdv-15min",
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

  test("aucune page n'affiche de numéro de téléphone", async ({ page }) => {
    for (const path of ["/", "/contact", "/mentions-legales"]) {
      await page.goto(path);
      await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
    }
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
    const graph: Record<string, unknown>[] = JSON.parse(raw ?? "{}")["@graph"];

    expect(graph).toContainEqual(
      expect.objectContaining({
        "@type": "Person",
        name: "Yanis Harrat",
        sameAs: ["https://www.linkedin.com/in/yanis-harrat/", "https://github.com/yanix2445"],
      }),
    );
  });
});
