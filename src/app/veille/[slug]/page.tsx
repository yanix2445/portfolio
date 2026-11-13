import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Prose } from "@/components/mdx/prose";
import { formatDate, getEntry, getSlugs } from "@/lib/content";

// Un slug absent de generateStaticParams est rendu en entier avant la réponse :
// notFound() renvoie alors un vrai statut 404 au lieu d'un shell en 200.
export const ensureStatic = "navigation";

export async function generateStaticParams() {
  const slugs = await getSlugs("veille");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/veille/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntry("veille", slug);
  if (!entry) return {};
  return {
    title: entry.metadata.title,
    description: entry.metadata.summary,
  };
}

export default async function VeilleArticlePage({ params }: PageProps<"/veille/[slug]">) {
  const { slug } = await params;
  const entry = await getEntry("veille", slug);
  if (!entry) notFound();

  const { metadata, Content } = entry;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{metadata.title}</h1>
        <p className="mt-2 text-muted-foreground">{metadata.summary}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
          {metadata.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </header>
      <Prose>
        <Content />
      </Prose>
    </article>
  );
}
