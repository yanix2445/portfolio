import Link from "next/link";

import { EntryMeta } from "@/components/content/entry-meta";
import type { Collection, ContentEntry } from "@/lib/content";

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
            <EntryMeta metadata={metadata} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
