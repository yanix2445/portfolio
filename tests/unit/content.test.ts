import "./setup-content";

import { describe, expect, it } from "vitest";

import {
  formatDate,
  getEntries,
  getEntry,
  getProjects,
  getSlugs,
} from "@/lib/content";
import { pickFeatured, presentContexts, presentDomains, toProject } from "@/lib/projects";

describe("getSlugs", () => {
  it("ne liste que les fichiers MDX d'une collection", async () => {
    const slugs = await getSlugs("projets");

    expect(slugs.sort()).toEqual(["ancien-projet", "projet-a-venir", "projet-recent"]);
  });
});

describe("getEntries", () => {
  it("renvoie toutes les entrées, de la plus récente à la plus ancienne", async () => {
    const entries = await getEntries("projets");

    expect(entries.map((entry) => entry.slug)).toEqual([
      "projet-recent",
      "projet-a-venir",
      "ancien-projet",
    ]);
    expect(entries[0].metadata).toMatchObject({ title: "Projet récent", date: "2026-03-01" });
  });

  it("isole chaque collection", async () => {
    const entries = await getEntries("veille");

    expect(entries.map((entry) => entry.slug)).toEqual(["article-veille"]);
  });
});

describe("getEntry", () => {
  it("renvoie l'entrée et son composant pour un slug connu", async () => {
    const entry = await getEntry("projets", "ancien-projet");

    expect(entry?.metadata.title).toBe("Ancien projet");
    expect(typeof entry?.Content).toBe("function");
  });

  it("renvoie null pour un slug inconnu ou d'une autre collection", async () => {
    expect(await getEntry("projets", "inexistant")).toBeNull();
    expect(await getEntry("projets", "article-veille")).toBeNull();
  });
});

describe("formatDate", () => {
  it("affiche une date ISO en toutes lettres, en français", () => {
    expect(formatDate("2026-11-13")).toBe("13 novembre 2026");
  });

  it("ne décale pas le jour selon le fuseau horaire", () => {
    expect(formatDate("2026-01-01")).toBe("1 janvier 2026");
  });
});

describe("projets", () => {
  it("applique les valeurs par défaut à une fiche sans champs optionnels", async () => {
    const projects = await getProjects();
    const ancien = projects.find((project) => project.slug === "ancien-projet");

    expect(ancien).toMatchObject({
      featured: false,
      status: "released",
      domain: "autre",
      context: "personnel",
      poster: "Ancien projet",
    });
  });

  it("reprend le statut, le domaine et le titre d'affiche d'une fiche", async () => {
    const projects = await getProjects();

    expect(projects.find((project) => project.slug === "projet-recent")).toMatchObject({
      featured: true,
      status: "in-progress",
      domain: "systemes",
      context: "entreprise",
      poster: "Récent",
    });
    expect(projects.find((project) => project.slug === "projet-a-venir")?.status).toBe("upcoming");
  });

  it("met 3 projets à la une : les marqués d'abord, complétés par les plus récents", async () => {
    const featured = pickFeatured(await getProjects());

    expect(featured.map((project) => project.slug)).toEqual([
      "projet-recent",
      "projet-a-venir",
      "ancien-projet",
    ]);
  });

  it("ordonne les projets à la une par rang, sans rang en dernier", async () => {
    const [first, second, third] = (await getProjects()).map((project) => ({ ...project, featured: true }));
    const ranked = [
      { ...first, slug: "troisieme", rank: Number.POSITIVE_INFINITY },
      { ...second, slug: "deuxieme", rank: 2 },
      { ...third, slug: "premier", rank: 1 },
    ];

    expect(pickFeatured(ranked).map((project) => project.slug)).toEqual([
      "premier",
      "deuxieme",
      "troisieme",
    ]);
  });

  it("retombe sur le statut et le domaine par défaut quand une fiche porte une valeur inconnue", () => {
    const project = toProject({
      slug: "faute-de-frappe",
      metadata: {
        title: "Titre",
        summary: "Résumé",
        date: "2026-01-01",
        tags: [],
        status: "relased" as never,
        domain: "systeme" as never,
        context: "ecole" as never,
      },
    });

    expect(project).toMatchObject({ status: "released", domain: "autre", context: "personnel", cover: null });
  });

  it("ne dépasse jamais le nombre de projets à la une demandé", async () => {
    const projects = await getProjects();
    const allFeatured = projects.map((project) => ({ ...project, featured: true }));

    expect(pickFeatured(allFeatured, 2)).toHaveLength(2);
    expect(pickFeatured([], 3)).toEqual([]);
  });

  it("ne propose que les domaines qui ont un projet, dans l'ordre d'affichage", async () => {
    expect(presentDomains(await getProjects())).toEqual(["systemes", "reseau", "autre"]);
  });

  it("ne propose que les cadres qui ont un projet : entreprise, formation, puis personnel", async () => {
    expect(presentContexts(await getProjects())).toEqual(["entreprise", "formation", "personnel"]);
  });
});
