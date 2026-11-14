import Link from "next/link";

import { DOMAIN_LABEL, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

import s from "./poster.styles";
import { StatusBadge } from "./status-badge";

const VARIANTS = [s.hot, s.cream, s.dark] as const;

// Une affiche de projet. Le titre court est en grand ; le titre complet nomme le lien.
export function Poster({ project, index }: { project: Project; index: number }) {
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
        <h3 className={s.title}>{project.poster}</h3>
        <p className={s.cast}>{project.summary}</p>
      </div>
      <div className={cn(s.label, s.foot)}>
        <span>{DOMAIN_LABEL[project.domain]}</span>
        <span className={s.more}>Voir la fiche →</span>
      </div>
    </Link>
  );
}
