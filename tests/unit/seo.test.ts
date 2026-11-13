import "./setup-content";

import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { entryMetadata } from "@/components/content/entry-page";
import { SITE_URL } from "@/lib/site";

describe("sitemap", () => {
  it("liste les pages fixes et une URL absolue datée par entrée", async () => {
    const routes = await sitemap();
    const urls = routes.map((route) => route.url);

    expect(urls).toEqual(
      expect.arrayContaining([
        SITE_URL,
        `${SITE_URL}/projets`,
        `${SITE_URL}/veille`,
        `${SITE_URL}/contact`,
        `${SITE_URL}/mentions-legales`,
      ]),
    );
    expect(routes).toContainEqual({
      url: `${SITE_URL}/projets/projet-recent`,
      lastModified: "2026-03-01",
    });
    expect(routes).toContainEqual({
      url: `${SITE_URL}/veille/article-veille`,
      lastModified: "2026-02-15",
    });
    expect(routes).toHaveLength(8);
    expect(urls.every((url) => url.startsWith(SITE_URL))).toBe(true);
  });
});

describe("entryMetadata", () => {
  it("expose un canonical et un Open Graph d'article pour une entrée", async () => {
    const metadata = await entryMetadata("projets", "projet-recent");

    expect(metadata.title).toBe("Projet récent");
    expect(metadata.description).toBe("Projet le plus récent.");
    expect(metadata.alternates?.canonical).toBe("/projets/projet-recent");
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: "/projets/projet-recent",
      locale: "fr_FR",
    });
  });

  it("renvoie des métadonnées vides pour un slug inconnu", async () => {
    expect(await entryMetadata("projets", "inexistant")).toEqual({});
  });
});
