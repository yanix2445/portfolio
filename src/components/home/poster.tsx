import Link from "next/link";

import { DOMAIN_LABEL, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

import s from "./poster.styles";
import { StatusBadge } from "./status-badge";

const VARIANTS = [s.hot, s.cream, s.dark] as const;

type PosterProps = {
  project: Project;
  index: number;
  /** Niveau du titre : `h3` sous le titre d'une section, `h2` directement sous le titre de la page. */
  heading?: "h2" | "h3";
};

// Une affiche de projet. Le titre court est en grand ; le titre complet de la fiche est dans `data-title`.
export function Poster({ project, index, heading: Heading = "h3" }: PosterProps) {
  return (
    <Link
      href={`/projets/${project.slug}`}
      className={cn(s.poster, VARIANTS[index % VARIANTS.length])}
      data-title={project.title}
      data-poster
    >
      <div className={cn(s.label, s.top)}>
        <span>N° {index + 1}</span>
        <StatusBadge status={project.status} />
      </div>
      <div>
        <Heading className={s.title}>{project.poster}</Heading>
        <p className={s.cast}>{project.summary}</p>
      </div>
      <div className={cn(s.label, s.foot)}>
        <span>{DOMAIN_LABEL[project.domain]}</span>
        <span className={s.more}>Voir la fiche →</span>
      </div>
    </Link>
  );
}
