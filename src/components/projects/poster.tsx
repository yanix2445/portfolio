import Image from "next/image";
import Link from "next/link";

import { ActionCue, ENTRY_ACTION } from "@/components/content/action-cue";
import { CONTEXT_LABEL, DOMAIN_LABEL, type Project } from "@/lib/projects";
import { fitTitle } from "@/lib/title-fit";
import { frenchSpacing } from "@/lib/typography";
import { cn } from "@/lib/utils";

import { StatusBadge } from "./status-badge";

// Trois encres d'affiche, attribuées dans l'ordre (accueil) : orange, crème, sombre (titre orange).
const INKS: readonly { frame: string; title?: string }[] = [
  { frame: "bg-primary text-primary-foreground" },
  { frame: "bg-foreground text-background" },
  { frame: "border border-border bg-card", title: "text-primary" },
];

// Nombre d'outils montrés sur une affiche du catalogue.
const TOOLS_SHOWN = 3;

// Encre neutre, pour une grille de nombreuses affiches : sombre, l'orange seulement au survol.
const PLAIN_INK = {
  frame: "border border-border bg-card",
  title:
    "transition-colors duration-200 group-hover/card:text-primary group-focus-visible/card:text-primary",
};

type PosterProps = {
  project: Project;
  index: number;
  /** Niveau du titre : `h3` sous le titre d'une section, `h2` directement sous le titre de la page. */
  heading?: "h2" | "h3";
  /** Affiche sans couleur de statut (catalogue) : trop de couleurs à la fois dans une grande grille. */
  plain?: boolean;
};

/**
 * Classes de l'élément de liste qui porte une affiche. Chaque affiche occupe trois lignes de la
 * grille parente (haut, contenu, pied) en sous-grille : dans une rangée, les lignes du haut, les
 * contenus et les filets du pied s'alignent d'une affiche à l'autre, même quand un pied passe sur
 * deux lignes. Pas de `@container` ici : son confinement désactiverait la sous-grille.
 */
export const POSTER_SLOT = "row-span-3 grid grid-rows-subgrid gap-y-6";

// Une affiche de projet. Le titre court est en grand ; le titre complet de la fiche est dans `data-title`.
export function Poster({ project, index, heading: Heading = "h3", plain = false }: PosterProps) {
  const ink = plain ? PLAIN_INK : INKS[index % INKS.length];

  return (
    <Link
      href={`/projets/${project.slug}`}
      className={cn(
        // Sous-grille de l'élément de liste (`POSTER_SLOT`). Ni hauteur imposée ni
        // `overflow-hidden` : une affiche étroite grandit au lieu de couper son pied.
        "group/card relative row-span-3 grid grid-rows-subgrid gap-y-6 rounded-xl p-poster md:rounded-2xl",
        "motion-safe:transition-transform motion-safe:duration-550 motion-safe:ease-poster motion-safe:hover:-translate-y-3 motion-safe:hover:-rotate-[1.2deg] motion-safe:focus-visible:-translate-y-3 motion-safe:focus-visible:-rotate-[1.2deg]",
        ink.frame,
      )}
      data-title={frenchSpacing(project.title)}
      data-poster
    >
      {/* L'image suit la ligne du haut : dans une rangée, les images s'alignent. */}
      <div className="flex flex-col gap-6">
        <div className="type-label flex items-center justify-between gap-4">
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
      {/* Le contenu, centré dans sa ligne. Sans image, il est au moins carré : avec le haut, le
          pied et les marges, l'affiche garde à peu près son format 3:4, et grandit si le texte
          l'exige. Avec une image, l'affiche grandit au lieu d'écraser l'image. */}
      <div
        className={cn(
          "@container flex flex-col justify-center self-center",
          !project.cover && "aspect-square",
        )}
      >
        <Heading
          className={cn(
            "type-poster pt-[0.14em] text-center text-display-poster text-balance",
            ink.title,
          )}
          style={fitTitle(frenchSpacing(project.poster), "display-poster")}
        >
          {frenchSpacing(project.poster)}
        </Heading>
        {/* Dans le catalogue, l'affiche a la place du résumé entier ; sur l'accueil, il est coupé. */}
        <p
          className={cn(
            "mt-[1.6vh] text-body-sm",
            plain ? "text-soft" : project.cover ? "line-clamp-2" : "line-clamp-4",
          )}
        >
          {frenchSpacing(project.summary)}
        </p>
        {plain ? (
          // Les premiers outils de la fiche : la preuve, avant d'ouvrir le projet.
          // Un point sépare les outils : « ACTIVE DIRECTORY GPO » se lirait comme un seul nom.
          // Il termine la ligne quand la liste passe à la ligne, jamais il ne la commence.
          <ul
            aria-label="Outils"
            className="mt-[2.4vh] flex flex-wrap gap-x-[0.6em] gap-y-1.5 type-label text-muted-foreground"
          >
            {project.tags.slice(0, TOOLS_SHOWN).map((tag) => (
              <li key={tag} className="whitespace-nowrap not-last:after:ml-[0.6em] not-last:after:content-['·']">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {/* Pied : cadre et domaine à gauche, l'appel à droite, sur la même ligne de base. Sur une
          affiche étroite, le domaine passe sous le cadre ; le texte reste collé au filet, que la
          sous-grille aligne d'une affiche à l'autre. */}
      <div className="type-label flex items-baseline justify-between gap-4 self-start border-t border-current pt-3 md:pt-4">
        <span className="flex min-w-0 flex-wrap gap-x-[0.6em] gap-y-1">
          <span className="whitespace-nowrap after:ml-[0.6em] after:content-['·']">
            {CONTEXT_LABEL[project.context]}
          </span>
          <span className="whitespace-nowrap">{DOMAIN_LABEL[project.domain]}</span>
        </span>
        <ActionCue className="shrink-0 font-sans tracking-normal normal-case">{ENTRY_ACTION.projets}</ActionCue>
      </div>
    </Link>
  );
}
