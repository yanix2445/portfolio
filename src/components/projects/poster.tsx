import Link from "next/link";

import { DOMAIN_LABEL, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

import { StatusBadge } from "./status-badge";

// Trois encres d'affiche, attribuées dans l'ordre : orange, crème, sombre (titre orange).
const INKS = [
  { frame: "bg-primary text-primary-foreground" },
  { frame: "bg-foreground text-background" },
  { frame: "border border-border bg-card", title: "text-primary" },
] as const;

type PosterProps = {
  project: Project;
  index: number;
  /** Niveau du titre : `h3` sous le titre d'une section, `h2` directement sous le titre de la page. */
  heading?: "h2" | "h3";
};

// Une affiche de projet. Le titre court est en grand ; le titre complet de la fiche est dans `data-title`.
export function Poster({ project, index, heading: Heading = "h3" }: PosterProps) {
  const ink = INKS[index % INKS.length];

  return (
    <Link
      href={`/projets/${project.slug}`}
      className={cn(
        "relative flex h-full min-h-96 flex-col justify-between gap-6 overflow-hidden rounded-xl p-poster md:aspect-3/4 md:min-h-0 md:rounded-2xl",
        "motion-safe:transition-transform motion-safe:duration-550 motion-safe:ease-poster motion-safe:hover:-translate-y-3 motion-safe:hover:-rotate-[1.2deg] motion-safe:focus-visible:-translate-y-3 motion-safe:focus-visible:-rotate-[1.2deg]",
        ink.frame,
      )}
      data-title={project.title}
      data-poster
    >
      <div className="type-label flex items-start justify-between gap-4">
        <span>N° {index + 1}</span>
        <StatusBadge status={project.status} />
      </div>
      <div>
        <Heading
          className={cn(
            "type-poster pt-[0.14em] text-display-poster wrap-break-word",
            "title" in ink && ink.title,
          )}
        >
          {project.poster}
        </Heading>
        <p className="mt-[1.6vh] line-clamp-4 text-body-sm">{project.summary}</p>
      </div>
      <div className="type-label flex items-center justify-between gap-4 border-t border-current pt-3 md:pt-4">
        <span>{DOMAIN_LABEL[project.domain]}</span>
        <span className="font-sans text-action tracking-normal whitespace-nowrap normal-case">
          Voir la fiche →
        </span>
      </div>
    </Link>
  );
}
