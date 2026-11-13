import "./setup-content";

import { describe, expect, it } from "vitest";

import { formatDate, getEntries, getEntry, getSlugs } from "@/lib/content";

describe("getSlugs", () => {
  it("ne liste que les fichiers MDX d'une collection", async () => {
    const slugs = await getSlugs("projets");

    expect(slugs.sort()).toEqual(["ancien-projet", "projet-recent"]);
  });
});

describe("getEntries", () => {
  it("renvoie toutes les entrées, de la plus récente à la plus ancienne", async () => {
    const entries = await getEntries("projets");

    expect(entries.map((entry) => entry.slug)).toEqual(["projet-recent", "ancien-projet"]);
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
