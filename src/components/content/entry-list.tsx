import Link from "next/link";

import { ActionCue, ENTRY_ACTION } from "@/components/content/action-cue";
import { formatDate, type Collection, type ContentEntry } from "@/lib/content";
import { frenchSpacing } from "@/lib/typography";
import { cn } from "@/lib/utils";

type Entry = ContentEntry & {
  /** Temps de lecture estimé, en minutes. */
  minutes: number;
};

/** Numéro de semaine ISO 8601 d'une date `YYYY-MM-DD` (la semaine qui contient le jeudi). */
function isoWeek(date: string): number {
  const day = new Date(`${date}T00:00:00Z`);
  const thursday = new Date(day);
  thursday.setUTCDate(day.getUTCDate() + 3 - ((day.getUTCDay() + 6) % 7));
  const firstThursday = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 4));
  return 1 + Math.round((thursday.getTime() - firstThursday.getTime()) / 604_800_000);
}

// Journal des fiches, de la plus récente à la plus ancienne, sur un fil vertical : un point par
// semaine de publication, plein pour la dernière parue. Sur grand écran, la semaine et la date sont
// à gauche du fil ; sur téléphone, sous le titre. Toute l'entrée est cliquable, mais le lien n'est
// nommé que par le titre. Aucune animation d'entrée : la liste se relit souvent ; seul le survol
// répond (point, titre et flèche).
export function EntryList({ collection, entries }: { collection: Collection; entries: Entry[] }) {
  if (entries.length === 0) {
    return (
      <p className="mt-6 text-body text-muted-foreground md:mt-[4vh]">Aucune fiche pour le moment.</p>
    );
  }

  return (
    <ol className="mt-8 md:mt-[5vh]">
      {entries.map(({ slug, metadata, minutes }, index) => {
        const latest = index === 0;
        const title = frenchSpacing(metadata.title);
        const meta = (
          <>
            <span className={cn(latest ? "text-primary" : "text-foreground")}>
              Semaine {isoWeek(metadata.date)}
            </span>
            <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
            <span>{minutes} min de lecture</span>
          </>
        );
        return (
          <li key={slug} className="group/item">
            <Link
              href={`/${collection}/${slug}`}
              aria-labelledby={`entry-${slug}`}
              data-title={title}
              className="group/card grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 rounded-lg focus-visible:outline-offset-[0.75rem] md:grid-cols-[11rem_2.5rem_minmax(0,1fr)] md:gap-x-[2vw]"
            >
              {/* Grand écran : la semaine, la date et la durée, alignées à droite contre le fil. */}
              <p className="type-label hidden flex-col items-end gap-1 pt-[0.55em] text-right text-muted-foreground md:flex">
                {meta}
              </p>

              {/* Le fil et son point. Le fil commence au premier point et s'arrête au dernier. */}
              <div
                aria-hidden
                className="relative flex justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-px after:-translate-x-1/2 after:bg-border group-first/item:after:top-[0.9em] group-last/item:after:bottom-auto group-last/item:after:h-[0.9em]"
              >
                <span
                  className={cn(
                    "relative z-10 mt-[0.6em] size-3 rounded-full border border-primary transition-colors duration-200 ease-poster",
                    latest ? "bg-primary" : "bg-background group-hover/card:bg-primary",
                  )}
                />
              </div>

              <div className="pb-12 md:pb-[8vh]">
                <h3
                  id={`entry-${slug}`}
                  className="type-poster pt-[0.14em] text-display-sm text-balance transition-colors duration-200 group-hover/card:text-primary"
                >
                  {title}
                </h3>
                <p className="type-label mt-3 flex flex-wrap gap-x-[1.2em] gap-y-1 text-muted-foreground md:hidden">
                  {meta}
                </p>
                {metadata.takeaway ? (
                  <div className="mt-5 max-w-[60ch] md:mt-[2.6vh]">
                    <p className="type-label text-primary">Ce que j&apos;en retiens</p>
                    <p className="mt-2 text-lead">{frenchSpacing(metadata.takeaway)}</p>
                  </div>
                ) : null}
                <p className="mt-4 max-w-[60ch] text-body-sm text-soft md:mt-[2vh]">
                  {frenchSpacing(metadata.summary)}
                </p>
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 md:mt-[2.6vh]">
                  <ul aria-label="Sujets" className="flex flex-wrap gap-x-[0.6em] gap-y-1.5 type-label text-muted-foreground">
                    {metadata.tags.map((tag) => (
                      <li key={tag} className="whitespace-nowrap not-last:after:ml-[0.6em] not-last:after:content-['·']">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <ActionCue>{ENTRY_ACTION[collection]}</ActionCue>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
