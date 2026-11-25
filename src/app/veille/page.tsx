import type { Metadata } from "next";
import Link from "next/link";

import { BookCallLink } from "@/components/contact/book-call-link";
import { EntryList } from "@/components/content/entry-list";
import { VeilleIntro } from "@/components/content/veille-intro";
import { Button } from "@/components/ui/button";
import { getEntries, getOutline } from "@/lib/content";
import { VEILLE } from "@/lib/veille";

export const metadata: Metadata = {
  title: "Veille",
  description:
    "La veille technologique de Yanis Harrat (BTS SIO SISR) : l'IA comme assistant de l'administrateur systèmes et réseaux, sans perdre la sécurité, la traçabilité ni la maîtrise des décisions. Une fiche par semaine.",
  alternates: { canonical: "/veille" },
};

export default async function VeillePage() {
  const entries = await getEntries("veille");
  // Le temps de lecture de chaque article, lu dans sa source.
  const withMinutes = await Promise.all(
    entries.map(async (entry) => ({
      ...entry,
      minutes: (await getOutline("veille", entry.slug)).minutes,
    })),
  );

  return (
    <>
      <section
        aria-labelledby="veille-title"
        className="px-gutter pt-12 pb-20 md:pt-[12vh] md:pb-[14vh]"
      >
        <VeilleIntro />

        {/* Le journal des fiches, à part de la présentation : le travail de chaque semaine. */}
        <section aria-labelledby="fiches-title" className="mt-16 border-t border-border pt-10 md:mt-[12vh] md:pt-[6vh]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2 id="fiches-title" className="type-poster pt-[0.1em] text-display-sm">
              Fiches publiées
            </h2>
            <p className="type-label text-muted-foreground" data-fiches-count>
              {withMinutes.length === 0
                ? "Aucune fiche publiée"
                : `${withMinutes.length} ${withMinutes.length > 1 ? "fiches publiées" : "fiche publiée"}`}
            </p>
          </div>
          <p className="mt-4 max-w-[60ch] text-body text-soft md:mt-[2vh]">{VEILLE.method}</p>
          <EntryList collection="veille" entries={withMinutes} />
        </section>
      </section>

      {/* Fin de page : la veille se prolonge dans les projets. */}
      <section
        aria-labelledby="veille-next-title"
        className="border-t border-border px-gutter py-16 md:flex md:items-end md:justify-between md:gap-[4vw] md:py-[10vh]"
      >
        <div>
          <h2 id="veille-next-title" className="type-poster pt-[0.1em] text-display-sm text-balance">
            Ce que je lis, je l&apos;essaie.
          </h2>
          <p className="mt-[2vh] max-w-[46ch] text-body text-soft">
            Dans mes labs et mes projets, chaque fiche raconte l&apos;installation, les pannes
            rencontrées et le résultat.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2.5 md:mt-0 md:shrink-0 md:gap-[1vw]">
          <Button asChild size="xl" className="max-md:basis-full">
            <Link href="/projets">Voir les projets</Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="max-md:basis-full">
            <BookCallLink />
          </Button>
        </div>
      </section>
    </>
  );
}
