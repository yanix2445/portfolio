import Link from "next/link";

import { ActionCue, ENTRY_ACTION } from "@/components/content/action-cue";
import { Badge } from "@/components/ui/badge";
import { formatDate, type Collection, type ContentEntry } from "@/lib/content";
import { fitTitle } from "@/lib/title-fit";
import { frenchSpacing } from "@/lib/typography";

// Liste d'articles : une ligne par entrée, la date dans une colonne étroite à gauche, pour
// laisser au titre toute la largeur possible. Toute la ligne est cliquable, mais le lien
// n'est nommé que par le titre : un lecteur d'écran n'annonce pas la ligne entière.
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
            aria-labelledby={`entry-${slug}`}
            data-title={frenchSpacing(metadata.title)}
            className="group/card grid gap-4 py-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-[4vw] md:py-[5vh]"
          >
            <time dateTime={metadata.date} className="type-label pt-[0.4em] text-muted-foreground">
              {formatDate(metadata.date)}
            </time>
            <div className="@container">
              <h2
                id={`entry-${slug}`}
                className="type-poster pt-[0.14em] text-display-title text-balance transition-colors duration-200 group-hover/card:text-primary"
                style={fitTitle(frenchSpacing(metadata.title), "display-title")}
              >
                {frenchSpacing(metadata.title)}
              </h2>
              <p className="mt-[2.2vh] max-w-[60ch] text-body text-soft">{frenchSpacing(metadata.summary)}</p>
              <div className="mt-[3vh] flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
                <ul className="flex flex-wrap gap-2">
                  {metadata.tags.map((tag) => (
                    <li key={tag}>
                      <Badge variant="outline">{tag}</Badge>
                    </li>
                  ))}
                </ul>
                <ActionCue>{ENTRY_ACTION[collection]}</ActionCue>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
