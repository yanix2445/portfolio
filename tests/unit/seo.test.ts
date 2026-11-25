import "./setup-content";

import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { entryMetadata } from "@/components/content/entry-page";
import { getEntry } from "@/lib/content";
import { CERTIFICATIONS } from "@/lib/profile";
import { CONTACT, SHARE_IMAGE, SITE_URL } from "@/lib/site";
import { entryGraph, profileGraph } from "@/lib/structured-data";

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
        `${SITE_URL}/cv/yanis-harrat-cv.pdf`,
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
    expect(routes).toHaveLength(10);
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

  it("partage l'image de la fiche, sinon celle du site", async () => {
    const withCover = await entryMetadata("projets", "projet-recent");
    const withoutCover = await entryMetadata("projets", "ancien-projet");

    expect(withCover.openGraph?.images).toEqual([
      { url: "/images/projets/projet-recent.jpg", alt: "Capture du projet récent" },
    ]);
    expect(withoutCover.openGraph?.images).toEqual([SHARE_IMAGE]);
  });

  it("préfère le titre et la description dédiés aux moteurs, sans changer l'Open Graph", async () => {
    const metadata = await entryMetadata("veille", "article-veille");

    expect(metadata.title).toBe("Veille courte");
    expect(metadata.description).toBe("Description pour les moteurs.");
    expect(metadata.openGraph).toMatchObject({
      title: "Article de veille",
      description: "Description pour les moteurs.",
    });
  });

  it("renvoie des métadonnées vides pour un slug inconnu", async () => {
    expect(await entryMetadata("projets", "inexistant")).toEqual({});
  });
});

describe("données structurées", () => {
  const nodes = (graph: { "@graph": Record<string, unknown>[] }) =>
    Object.fromEntries(graph["@graph"].map((node) => [node["@type"], node]));

  it("décrit le site, la page de profil et la personne, reliés par leurs @id", () => {
    const { WebSite, ProfilePage, Person } = nodes(profileGraph());

    expect(ProfilePage).toMatchObject({ mainEntity: { "@id": Person["@id"] } });
    expect(WebSite).toMatchObject({ publisher: { "@id": Person["@id"] } });
    expect(Person).toMatchObject({
      name: "Yanis Harrat",
      sameAs: [CONTACT.linkedin, CONTACT.github],
    });
    expect(Person.hasCredential).toHaveLength(CERTIFICATIONS.length);
  });

  it("type une fiche selon sa collection et désigne l'auteur sans le recopier", async () => {
    const entry = await getEntry("veille", "article-veille");
    const { BlogPosting, BreadcrumbList } = nodes(entryGraph("veille", "article-veille", entry!.metadata));
    const { TechArticle } = nodes(entryGraph("projets", "projet-recent", entry!.metadata));
    const { Person } = nodes(profileGraph());

    expect(BlogPosting).toMatchObject({
      headline: "Article de veille",
      description: "Description pour les moteurs.",
      datePublished: "2026-02-15",
      author: { "@id": Person["@id"] },
    });
    expect(TechArticle).toBeDefined();
    expect(BreadcrumbList.itemListElement).toHaveLength(3);
  });
});
