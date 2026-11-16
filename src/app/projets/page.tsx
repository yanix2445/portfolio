import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
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
      <PageHeader id="catalog-title" title="Tous les projets">
        Terminés, en cours ou à venir : chaque projet a sa fiche, avec le contexte, ce que j&apos;ai
        fait et ce que j&apos;en retiens.
      </PageHeader>
      <Catalog projects={projects} />
    </section>
  );
}
