import Link from "next/link";

import { EntryMeta } from "@/components/content/entry-meta";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
            data-title={metadata.title}
            className="group/entry block rounded-xl"
          >
            <Card className="transition-colors group-hover/entry:bg-muted">
              <CardHeader>
                <CardTitle>
                  <h3>{metadata.title}</h3>
                </CardTitle>
                <CardDescription>{metadata.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <EntryMeta metadata={metadata} />
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
