import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Prose } from "@/components/mdx/prose";
import { StatusBadge } from "@/components/projects/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, getEntry, getSlugs, type Collection } from "@/lib/content";
import { DOMAIN_LABEL, toProject } from "@/lib/projects";
import { BASE_OPEN_GRAPH } from "@/lib/site";

const BACK: Record<Collection, { href: string; label: string }> = {
  projets: { href: "/projets", label: "← Tous les projets" },
  veille: { href: "/veille", label: "← Toute la veille" },
};

export async function entryStaticParams(collection: Collection) {
  const slugs = await getSlugs(collection);
  return slugs.map((slug) => ({ slug }));
}

export async function entryMetadata(collection: Collection, slug: string): Promise<Metadata> {
  const entry = await getEntry(collection, slug);
  if (!entry) return {};
  const { title, summary } = entry.metadata;
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
    },
  };
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-t border-border py-3 md:grid-cols-1 md:gap-2 md:py-[1.8vh]">
      <dt className="type-label text-muted-foreground">{label}</dt>
      <dd className="text-body-sm">{children}</dd>
    </div>
  );
}

// Fiche d'un projet ou article de veille : titre d'affiche, puis le texte dans la colonne
// de droite et les faits (date, statut, domaine, sujets) dans la colonne de gauche.
export async function EntryPage({ collection, slug }: { collection: Collection; slug: string }) {
  const entry = await getEntry(collection, slug);
  if (!entry) notFound();

  const { metadata, Content } = entry;
  const project = collection === "projets" ? toProject(entry) : null;
  const back = BACK[collection];

  return (
    <article
      aria-labelledby="entry-title"
      className="px-gutter pt-10 pb-20 md:pt-[8vh] md:pb-[14vh]"
    >
      <header>
        <Button asChild variant="outline" size="label">
          <Link href={back.href}>{back.label}</Link>
        </Button>
        <h1
          id="entry-title"
          className="mt-8 max-w-[22ch] type-poster pt-[0.1em] text-display-title text-balance md:mt-[6vh]"
        >
          {metadata.title}
        </h1>
        <p className="mt-[3vh] max-w-[56ch] text-lead text-soft">{metadata.summary}</p>
      </header>

      <div className="mt-10 grid items-start gap-10 md:mt-[7vh] md:grid-cols-[0.78fr_1.22fr] md:gap-[4vw]">
        <dl className="border-b border-border md:sticky md:top-[calc(var(--header-h)+4vh)]">
          <Fact label="Date">
            <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
          </Fact>
          {project ? (
            <>
              <Fact label="Statut">
                <StatusBadge status={project.status} />
              </Fact>
              <Fact label="Domaine">{DOMAIN_LABEL[project.domain]}</Fact>
            </>
          ) : null}
          <Fact label="Sujets">
            <ul className="flex flex-wrap gap-2">
              {metadata.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline">{tag}</Badge>
                </li>
              ))}
            </ul>
          </Fact>
        </dl>
        <Prose>
          <Content />
        </Prose>
      </div>
    </article>
  );
}
