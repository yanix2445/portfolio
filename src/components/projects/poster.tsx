import Image from "next/image";
import Link from "next/link";

import { DOMAIN_LABEL, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

import { StatusBadge } from "./status-badge";
import { fitTitle } from "@/lib/title-fit";
import { frenchSpacing } from "@/lib/typography";

// Trois encres d'affiche, attribuées dans l'ordre (accueil) : orange, crème, sombre (titre orange).
const INKS: readonly { frame: string; title?: string }[] = [
  { frame: "bg-primary text-primary-foreground" },
  { frame: "bg-foreground text-background" },
  { frame: "border border-border bg-card", title: "text-primary" },
];

// Encre neutre, pour une grille de nombreuses affiches : sombre, l'orange seulement au survol.
const PLAIN_INK = {
  frame: "group/poster border border-border bg-card",
  title:
    "transition-colors duration-200 group-hover/poster:text-primary group-focus-visible/poster:text-primary",
};

type PosterProps = {
  project: Project;
  index: number;
  /** Niveau du titre : `h3` sous le titre d'une section, `h2` directement sous le titre de la page. */
  heading?: "h2" | "h3";
  /** Affiche sans couleur de statut (catalogue) : trop de couleurs à la fois dans une grande grille. */
  plain?: boolean;
};

// Une affiche de projet. Le titre court est en grand ; le titre complet de la fiche est dans `data-title`.
export function Poster({ project, index, heading: Heading = "h3", plain = false }: PosterProps) {
  const ink = plain ? PLAIN_INK : INKS[index % INKS.length];

  return (
    <Link
      href={`/projets/${project.slug}`}
      className={cn(
        "relative flex h-full min-h-96 flex-col justify-between gap-6 overflow-hidden rounded-xl p-poster md:aspect-3/4 md:min-h-0 md:rounded-2xl",
        "motion-safe:transition-transform motion-safe:duration-550 motion-safe:ease-poster motion-safe:hover:-translate-y-3 motion-safe:hover:-rotate-[1.2deg] motion-safe:focus-visible:-translate-y-3 motion-safe:focus-visible:-rotate-[1.2deg]",
        // Avec une image, l'affiche grandit au lieu d'écraser l'image ; la grille aligne les hauteurs.
        project.cover && "md:aspect-auto",
        ink.frame,
      )}
      data-title={frenchSpacing(project.title)}
      data-poster
    >
      {/* L'image suit la ligne du haut : dans une rangée, les images s'alignent. */}
      <div className="flex shrink-0 flex-col gap-6">
        <div className="type-label flex items-start justify-between gap-4">
          <span>N° {index + 1}</span>
          <StatusBadge status={project.status} />
        </div>
        {project.cover ? (
          // Image décorative : le titre de l'affiche nomme déjà le lien.
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={project.cover}
              alt=""
              fill
              sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
      <div className="@container">
        <Heading
          className={cn(
            "type-poster pt-[0.14em] text-center text-display-poster text-balance",
            ink.title,
          )}
          style={fitTitle(frenchSpacing(project.poster), "display-poster")}
        >
          {frenchSpacing(project.poster)}
        </Heading>
        <p className={cn("mt-[1.6vh] text-body-sm", project.cover ? "line-clamp-2" : "line-clamp-4")}>{frenchSpacing(project.summary)}</p>
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
