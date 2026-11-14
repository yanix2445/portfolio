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
    <section aria-labelledby="catalog-title" className="gc-page">
      <p className="gc-label gc-kicker">Catalogue</p>
      <h1 id="catalog-title" className="gc-title">
        Tous les projets
      </h1>
      <p className="gc-lead">
        Terminés, en cours ou à venir : chaque projet a sa fiche, avec le contexte, ce que j&apos;ai
        fait et ce que j&apos;en retiens.
      </p>
      <Catalog projects={projects} />
    </section>
  );
}
