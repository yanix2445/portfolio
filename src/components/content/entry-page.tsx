import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ActionCue, ENTRY_ACTION } from "@/components/content/action-cue";
import { SequenceNav } from "@/components/content/sequence-nav";
import { Prose } from "@/components/mdx/prose";
import { StatusBadge } from "@/components/projects/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatDate,
  getEntries,
  getEntry,
  getOutline,
  getProjects,
  getSlugs,
  type Collection,
  type EntryDocument,
} from "@/lib/content";
import { DOMAIN_LABEL, toProject } from "@/lib/projects";
import { BASE_OPEN_GRAPH } from "@/lib/site";
import { cn } from "@/lib/utils";
import { fitTitle } from "@/lib/title-fit";
import { frenchSpacing } from "@/lib/typography";

const COPY: Record<
  Collection,
  { kicker: string; back: { href: string; label: string }; next: string; tags: string }
> = {
  projets: {
    kicker: "Fiche projet",
    back: { href: "/projets", label: "← Tous les projets" },
    next: "Projet suivant",
    tags: "Outils",
  },
  veille: {
    kicker: "Veille technologique",
    back: { href: "/veille", label: "← Toute la veille" },
    next: "Article suivant",
    tags: "Sujets",
  },
};

export async function entryStaticParams(collection: Collection) {
  const slugs = await getSlugs(collection);
  return slugs.map((slug) => ({ slug }));
}

export async function entryMetadata(collection: Collection, slug: string): Promise<Metadata> {
  const entry = await getEntry(collection, slug);
  if (!entry) return {};
  const { title, summary, cover, coverAlt } = entry.metadata;
  const url = `/${collection}/${slug}`;
  return {
    title,
    description: summary,
    alternates: { canonical: url },
    openGraph: {
      ...BASE_OPEN_GRAPH,
      type: "article",
      title,
      description: summary,
      url,
      // L'image de la fiche sert aussi d'aperçu quand le lien est partagé.
      ...(cover ? { images: [{ url: cover, alt: coverAlt ?? title }] } : {}),
    },
  };
}

/** L'entrée qui suit dans l'ordre des listes (catalogue ou veille), en boucle. */
async function nextEntry(collection: Collection, slug: string) {
  const entries =
    collection === "projets"
      ? (await getProjects()).map(({ slug, title, summary }) => ({ slug, title, summary }))
      : (await getEntries(collection)).map(({ slug, metadata }) => ({ slug, ...metadata }));
  if (entries.length < 2) return null;
  const index = entries.findIndex((entry) => entry.slug === slug);
  return entries[(index + 1) % entries.length];
}

// Une ligne du générique : légende mono, valeur dessous. En rangée sur grand écran,
// en grille de deux sur téléphone.
function Credit({ label, wide, children }: { label: string; wide?: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 border-t border-border py-4 md:flex-1 md:border-t-0 md:border-l md:px-[1.6vw] md:py-[2.4vh] md:first:border-l-0 md:first:pl-0",
        wide && "col-span-2 md:flex-[2.4]",
      )}
    >
      <dt className="type-label text-muted-foreground">{label}</dt>
      {/* Hauteur d'un badge : un texte et un badge voisins se centrent sur la même ligne. */}
      <dd className="flex min-h-8 items-center text-body-sm">{children}</dd>
    </div>
  );
}

/** Format affiché d'un document : l'extension du fichier, « Lien » pour une page. */
function documentKind(href: string): string {
  const extension = /\.([a-z0-9]+)$/i.exec(href.split(/[?#]/)[0]);
  return extension && !href.startsWith("http") ? extension[1].toUpperCase() : "Lien";
}

function Documents({ documents }: { documents: EntryDocument[] }) {
  return (
    <section aria-labelledby="documents-title">
      <h2 id="documents-title" className="type-label text-muted-foreground">
        Documents
      </h2>
      <ul className="mt-5 border-b border-border md:mt-[2.6vh]">
        {documents.map(({ label, href }) => (
          <li key={href} className="border-t border-border">
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group/document flex items-baseline justify-between gap-4 py-3 text-body-sm transition-colors hover:text-primary md:py-[1.5vh]"
            >
              <span>
                {label}
                <span className="sr-only"> (nouvel onglet)</span>
              </span>
              <span className="type-label whitespace-nowrap text-muted-foreground transition-colors group-hover/document:text-primary">
                {documentKind(href)} ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Corps d'une fiche : sommaire à gauche, texte centré, documents à droite. Sous 80 rem,
 * les documents passent sous le texte ; sur téléphone, tout est en colonne.
 */
const BODY_GRID =
  "grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] md:gap-[4vw] xl:grid-cols-[minmax(13rem,0.75fr)_minmax(0,3fr)_minmax(13rem,0.75fr)] xl:gap-[3vw]";

/** Place réservée pendant la navigation, le temps que la fiche arrive : évite le saut du pied de page. */
export function EntryPageFallback() {
  return <div aria-busy="true" className="min-h-svh" />;
}

// Fiche d'un projet ou article de veille, montée comme un générique : titre d'affiche,
// bandeau des faits, puis le sommaire en séquences à gauche et le texte à droite.
export async function EntryPage({
  collection,
  params,
}: {
  collection: Collection;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry(collection, slug);
  if (!entry) notFound();

  const { metadata, Content } = entry;
  const [outline, next] = await Promise.all([
    getOutline(collection, slug),
    nextEntry(collection, slug),
  ]);
  const project = collection === "projets" ? toProject(entry) : null;
  const copy = COPY[collection];
  const documents = metadata.documents ?? [];

  return (
    <article aria-labelledby="entry-title" className="px-gutter pt-8 pb-20 md:pt-[6vh] md:pb-[12vh]">
      <header className="@container">
        <div className="flex items-center justify-between gap-4">
          <Button asChild variant="outline" size="label">
            <Link href={copy.back.href}>{copy.back.label}</Link>
          </Button>
          <p className="type-label text-muted-foreground max-sm:hidden">{copy.kicker}</p>
        </div>
        <h1
          id="entry-title"
          className="mt-10 type-poster pt-[0.1em] text-display-title text-balance md:mt-[8vh]"
          style={fitTitle(frenchSpacing(metadata.title), "display-title")}
        >
          {frenchSpacing(metadata.title)}
        </h1>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 border-b border-border md:mt-[6vh] md:flex md:border-t">
          <Credit label="Date">
            <time dateTime={metadata.date} className="whitespace-nowrap">
              {formatDate(metadata.date)}
            </time>
          </Credit>
          {project ? (
            <>
              <Credit label="Statut">
                <StatusBadge status={project.status} />
              </Credit>
              <Credit label="Domaine">{DOMAIN_LABEL[project.domain]}</Credit>
            </>
          ) : (
            <Credit label="Lecture">{outline.minutes} min</Credit>
          )}
          <Credit label={copy.tags} wide>
            <ul className="flex flex-wrap gap-2">
              {metadata.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline">{tag}</Badge>
                </li>
              ))}
            </ul>
          </Credit>
        </dl>
      </header>

      <div className={cn(BODY_GRID, "mt-12 items-start md:mt-[9vh]")}>
        {outline.headings.length > 0 ? (
          <aside className="max-md:hidden md:sticky md:top-[calc(var(--header-h)+5vh)] md:row-span-2 xl:row-span-1">
            <SequenceNav headings={outline.headings} />
          </aside>
        ) : null}
        <div className="md:col-start-2 md:row-start-1">
          {metadata.cover ? (
            // L'image de l'affiche, en tête du texte : entière (16:9), jamais rognée ni agrandie.
            <div className="relative mb-12 aspect-video overflow-hidden rounded-xl md:mb-[8vh] md:rounded-2xl">
              <Image
                src={metadata.cover}
                alt={metadata.coverAlt ?? ""}
                fill
                preload
                sizes="(min-width: 80rem) 60vw, (min-width: 48rem) 70vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <p className="type-label text-primary">Synopsis</p>
          <p className="mt-4 max-w-[44ch] text-subtitle text-pretty md:mt-[2.6vh]">
            {frenchSpacing(metadata.summary)}
          </p>
          <Prose className="prose-sequences mt-12 max-w-[75ch] md:mt-[9vh]">
            <Content />
          </Prose>
        </div>
        {documents.length > 0 ? (
          <aside className="md:col-start-2 md:row-start-2 xl:sticky xl:top-[calc(var(--header-h)+5vh)] xl:col-start-3 xl:row-start-1">
            <Documents documents={documents} />
          </aside>
        ) : null}
      </div>

      <nav
        aria-label="Suite"
        className={cn(BODY_GRID, "mt-20 gap-8 border-t border-border pt-10 md:mt-[14vh] md:pt-[6vh]")}
      >
        <div className="flex flex-col items-start gap-6">
          <p className="type-label text-muted-foreground">{next ? copy.next : "Fin"}</p>
          <Button asChild variant="outline" size="label" className="max-md:order-last">
            <Link href={copy.back.href}>{copy.back.label}</Link>
          </Button>
        </div>
        {next ? (
          <Link
            href={`/${collection}/${next.slug}`}
            data-title={frenchSpacing(next.title)}
            className="group/card block @container"
          >
            <span
              className="block type-poster pt-[0.1em] text-display-title text-balance transition-colors duration-200 group-hover/card:text-primary"
              style={fitTitle(frenchSpacing(next.title), "display-title")}
            >
              {frenchSpacing(next.title)}
            </span>
            <span className="mt-[2.4vh] block max-w-[56ch] text-body text-soft">
              {frenchSpacing(next.summary)}
            </span>
            <ActionCue className="mt-[3vh] flex w-fit">{ENTRY_ACTION[collection]}</ActionCue>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
