import type { Metadata } from "next";

import { Catalog } from "@/components/projects/catalog";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projets",
  description: "Projets et réalisations professionnelles du BTS SIO option SISR.",
  alternates: { canonical: "/projets" },
};

export default async function ProjetsPage() {
  const projects = await getProjects();

  return (
    <section aria-labelledby="catalog-title" className="px-gutter pt-12 pb-20 md:pt-[12vh] md:pb-[14vh]">
      <p className="type-label mb-[1.6vh] text-primary">Catalogue</p>
      <h1 id="catalog-title" className="type-poster pt-[0.1em] text-display-xl">
        Tous les projets
      </h1>
      <p className="mt-[3vh] max-w-[44ch] text-body text-soft">
        Terminés, en cours ou à venir : chaque projet a sa fiche, avec le contexte, ce que j&apos;ai
        fait et ce que j&apos;en retiens.
      </p>
      <Catalog projects={projects} />
    </section>
  );
}
