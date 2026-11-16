import Link from "next/link";

import { Poster } from "@/components/projects/poster";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/content";
import { pickFeatured } from "@/lib/projects";

// Les 3 projets à la une, et l'accès au catalogue avec le nombre total de projets.
// Les affiches arrivent inclinées : la section coupe ce qui dépasse en largeur.
export async function BillSection() {
  const projects = await getProjects();
  const featured = pickFeatured(projects);

  return (
    <section
      aria-labelledby="bill-title"
      className="overflow-x-clip border-t border-border px-gutter pt-20 pb-16 md:pt-[17vh] md:pb-[15vh]"
      data-reveal-group
    >
      <div className="mb-8 md:mb-[6vh] md:flex md:items-end md:justify-between md:gap-[4vw]">
        <div>
          <p className="type-label mb-[1.6vh] text-primary">Projets personnels</p>
          <h2 id="bill-title" className="type-poster pt-[0.16em] text-display-xl" data-reveal="title">
            À l&apos;affiche
          </h2>
        </div>
        <div className="mt-5 md:mt-0 md:max-w-[30vw] md:pb-[1vw]">
          <p className="text-body text-soft">
            Ce que je monte chez moi, en dehors des cours et du travail. Chaque projet a sa fiche
            détaillée.
          </p>
          <Button asChild variant="outline" size="label" className="mt-[2.4vh]">
            <Link href="/projets" data-all-projects>
              Tous les projets ({projects.length}) →
            </Link>
          </Button>
        </div>
      </div>
      <ul className="grid gap-4 md:grid-cols-3 md:gap-[1.6vw]">
        {featured.map((project, index) => (
          <li key={project.slug} data-reveal="poster">
            <Poster project={project} index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
}
