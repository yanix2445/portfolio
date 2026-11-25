import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import type { ComponentType } from "react";

import { extractHeadings, readingMinutes, type Heading } from "@/lib/headings";
import { toProject, type Project, type ProjectFields } from "@/lib/projects";

export type Collection = "projets" | "veille";

/** Pièce jointe d'une fiche : un fichier de `public/documents/<slug>/` ou un lien externe. */
export type EntryDocument = {
  label: string;
  href: string;
};

export type ContentMeta = {
  title: string;
  summary: string;
  /** Date ISO `YYYY-MM-DD`. */
  date: string;
  tags: string[];
  /** Documents affichés à droite du texte (schémas, captures, rapports). */
  documents?: EntryDocument[];
  /**
   * Fiche de veille : ce que Yanis en retient, en une phrase citée de sa section
   * « Ce que j'en retiens ». Affichée dans la liste de `/veille`. Facultatif.
   */
  takeaway?: string;
} & ProjectFields;

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

export type Outline = {
  headings: Heading[];
  /** Temps de lecture estimé, en minutes. */
  minutes: number;
};

/** Plan d'une fiche, lu dans sa source MDX : le sommaire et le temps de lecture. */
export async function getOutline(collection: Collection, slug: string): Promise<Outline> {
  "use cache";
  cacheLife("max");
  const source = await readFile(path.join(CONTENT_DIR, collection, `${slug}.mdx`), "utf8");
  return { headings: extractHeadings(source), minutes: readingMinutes(source) };
}

/** Tous les projets, du plus récent au plus ancien, avec leurs valeurs par défaut. */
export async function getProjects(): Promise<Project[]> {
  const projects = (await getEntries("projets")).map(toProject);
  // À date égale, le rang des projets à la une départage : l'accueil et le catalogue
  // présentent ainsi les mêmes projets dans le même ordre.
  return projects.toSorted((a, b) => b.date.localeCompare(a.date) || a.rank - b.rank);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(date));
}
