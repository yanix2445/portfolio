import Link from "next/link";

import { formatDate, type Collection, type ContentEntry } from "@/lib/content";

export function EntryList({
  collection,
  entries,
}: {
  collection: Collection;
  entries: ContentEntry[];
}) {
  if (entries.length === 0) {
    return <p className="text-muted-foreground">Aucun contenu pour le moment.</p>;
  }

  return (
    <ul className="grid gap-4">
      {entries.map(({ slug, metadata }) => (
        <li key={slug}>
          <Link
            href={`/${collection}/${slug}`}
            className="block rounded-xl border bg-card p-5 text-card-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <h3 className="text-lg font-semibold">{metadata.title}</h3>
            <p className="mt-1 text-muted-foreground">{metadata.summary}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
              {metadata.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
