import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatDate, type Collection, type ContentEntry } from "@/lib/content";

// Liste d'articles : une ligne par entrée, la date à gauche, comme la fiche technique de l'accueil.
export function EntryList({
  collection,
  entries,
}: {
  collection: Collection;
  entries: ContentEntry[];
}) {
  if (entries.length === 0) {
    return (
      <p className="mt-10 text-body text-muted-foreground md:mt-[7vh]">
        Aucun contenu pour le moment.
      </p>
    );
  }

  return (
    <ul className="mt-10 border-b border-border md:mt-[7vh]">
      {entries.map(({ slug, metadata }) => (
        <li key={slug} className="border-t border-border">
          <Link
            href={`/${collection}/${slug}`}
            data-title={metadata.title}
            className="group/entry grid gap-4 py-8 md:grid-cols-[0.78fr_1.22fr] md:gap-[4vw] md:py-[5vh]"
          >
            <time dateTime={metadata.date} className="type-label pt-[0.4em] text-muted-foreground">
              {formatDate(metadata.date)}
            </time>
            <div>
              <h2 className="type-poster pt-[0.14em] text-display-title text-balance transition-colors duration-200 group-hover/entry:text-primary">
                {metadata.title}
              </h2>
              <p className="mt-[2.2vh] max-w-[60ch] text-body text-soft">{metadata.summary}</p>
              <div className="mt-[3vh] flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
                <ul className="flex flex-wrap gap-2">
                  {metadata.tags.map((tag) => (
                    <li key={tag}>
                      <Badge variant="outline">{tag}</Badge>
                    </li>
                  ))}
                </ul>
                <span className="text-action whitespace-nowrap">Lire l&apos;article →</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
