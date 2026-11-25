import type { Metadata } from "next";
import Link from "next/link";

import { BookCallLink } from "@/components/contact/book-call-link";
import { PageHeader } from "@/components/layout/page-header";
import { Catalog } from "@/components/projects/catalog";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Les projets de Yanis Harrat, futur technicien systèmes et réseaux en alternance (BTS SIO SISR) : en entreprise, en formation ou personnels, chacun avec sa fiche détaillée.",
  alternates: { canonical: "/projets" },
};

export default async function ProjetsPage() {
  const projects = await getProjects();

  return (
    <>
      <section aria-labelledby="catalog-title" className="px-gutter pt-12 pb-20 md:pt-[12vh] md:pb-[14vh]">
        <PageHeader id="catalog-title" title="Tous les projets">
          En entreprise, en formation ou chez moi : chaque projet a sa fiche, avec le contexte,
          l&apos;installation, les pannes rencontrées et le résultat.
        </PageHeader>
        <Catalog projects={projects} />
      </section>

      {/* Fin de page : la même action principale que l'accueil. */}
      <section
        aria-labelledby="catalog-next-title"
        className="border-t border-border px-gutter py-16 md:flex md:items-end md:justify-between md:gap-[4vw] md:py-[10vh]"
      >
        <div>
          <h2 id="catalog-next-title" className="type-poster pt-[0.1em] text-display-sm text-balance">
            Parlons de votre équipe.
          </h2>
          <p className="mt-[2vh] max-w-[46ch] text-body text-soft">
            Ces environnements, je veux les gérer chez vous : deux ans d&apos;alternance, 3 jours
            par semaine en entreprise, à partir de septembre 2027.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2.5 md:mt-0 md:shrink-0 md:gap-[1vw]">
          <Button asChild size="xl" className="max-md:basis-full">
            <Link href="/contact?motif=alternance">Proposer une alternance</Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="max-md:basis-full">
            <BookCallLink />
          </Button>
        </div>
      </section>
    </>
  );
}
