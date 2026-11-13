import { readdir } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import type { ComponentType } from "react";

export type Collection = "projets" | "veille";

export type ContentMeta = {
  title: string;
  summary: string;
  /** Date ISO `YYYY-MM-DD`. */
  date: string;
  tags: string[];
};

export type ContentEntry = {
  slug: string;
  metadata: ContentMeta;
};

type ContentModule = {
  default: ComponentType;
  metadata: ContentMeta;
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

function loadModule(collection: Collection, slug: string): Promise<ContentModule> {
  return collection === "projets"
    ? import(`@/content/projets/${slug}.mdx`)
    : import(`@/content/veille/${slug}.mdx`);
}

// Le contenu ne change qu'au build : lectures fs et imports mis en cache
// pour que les routes restent prérendues (Cache Components).
export async function getSlugs(collection: Collection): Promise<string[]> {
  "use cache";
  cacheLife("max");
  const files = await readdir(path.join(CONTENT_DIR, collection));
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getEntries(collection: Collection): Promise<ContentEntry[]> {
  "use cache";
  cacheLife("max");
  const slugs = await getSlugs(collection);
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await loadModule(collection, slug);
      return { slug, metadata };
    }),
  );
  return entries.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
}

export async function getEntry(
  collection: Collection,
  slug: string,
): Promise<(ContentEntry & { Content: ComponentType }) | null> {
  // Pas de "use cache" ici : le composant MDX renvoyé n'est pas sérialisable.
  const slugs = await getSlugs(collection);
  if (!slugs.includes(slug)) return null;
  const { default: Content, metadata } = await loadModule(collection, slug);
  return { slug, metadata, Content };
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(date));
}
