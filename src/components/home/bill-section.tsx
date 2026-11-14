import Link from "next/link";

import { getProjects } from "@/lib/content";
import { pickFeatured } from "@/lib/projects";
import { cn } from "@/lib/utils";

import s from "./home.styles";
import { Poster } from "./poster";

// Les 3 projets à la une, et l'accès au catalogue avec le nombre total de projets.
export async function BillSection() {
  const projects = await getProjects();
  const featured = pickFeatured(projects);

  return (
    <section aria-labelledby="bill-title" className={s.bill} data-reveal-group>
      <div className={s.billHead}>
        <div>
          <p className={cn(s.label, s.sectionLabel)}>Projets personnels</p>
          <h2 id="bill-title" className={cn(s.poster, s.billTitle)} data-reveal="title">
            À l&apos;affiche
          </h2>
        </div>
        <div className={s.billAside}>
          <p className={s.lead}>
            Ce que je monte chez moi, en dehors des cours et du travail. Chaque projet a sa fiche
            détaillée.
          </p>
          <Link href="/projets" className={cn(s.label, s.allLink)} data-all-projects>
            Tous les projets ({projects.length}) →
          </Link>
        </div>
      </div>
      <ul className={s.posters}>
        {featured.map((project, index) => (
          <li key={project.slug} data-reveal="poster">
            <Poster project={project} index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
}
