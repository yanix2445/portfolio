import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntryMeta } from "@/components/content/entry-meta";
import { Prose } from "@/components/mdx/prose";
import { getEntry, getSlugs, type Collection } from "@/lib/content";
import { BASE_OPEN_GRAPH } from "@/lib/site";

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
    openGraph: { ...BASE_OPEN_GRAPH, type: "article", title, description: summary, url },
  };
}

export async function EntryPage({ collection, slug }: { collection: Collection; slug: string }) {
  const entry = await getEntry(collection, slug);
  if (!entry) notFound();

  const { metadata, Content } = entry;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{metadata.title}</h1>
        <p className="mt-2 mb-3 text-muted-foreground">{metadata.summary}</p>
        <EntryMeta metadata={metadata} />
      </header>
      <Prose>
        <Content />
      </Prose>
    </article>
  );
}
