"use client";

import { useEffect, useRef, useState } from "react";

import { EASE_ENTER, MOTION_OK, gsap, useGSAP } from "@/components/animations/gsap";
import { POSTER_SLOT, Poster } from "@/components/projects/poster";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  CONTEXT_LABEL,
  DOMAIN_LABEL,
  STATUS_LABEL,
  STATUS_MEANING,
  presentContexts,
  presentDomains,
  presentStatuses,
  type Project,
  type ProjectContext,
  type ProjectDomain,
} from "@/lib/projects";

const ALL = "all";

type Filters = { context: ProjectContext | typeof ALL; domain: ProjectDomain | typeof ALL };

const NO_FILTER: Filters = { context: ALL, domain: ALL };

// Les filtres sont gardés dans l'adresse (`?cadre=formation&domaine=reseau`) : une sélection se
// partage par lien. La page reste prérendue : l'adresse est lue après l'hydratation.
const PARAM = { context: "cadre", domain: "domaine" } as const;

function readFilters(contexts: readonly string[], domains: readonly string[]): Filters {
  const params = new URLSearchParams(window.location.search);
  const context = params.get(PARAM.context) ?? "";
  const domain = params.get(PARAM.domain) ?? "";
  return {
    context: contexts.includes(context) ? (context as ProjectContext) : ALL,
    domain: domains.includes(domain) ? (domain as ProjectDomain) : ALL,
  };
}

function writeFilters(filters: Filters) {
  const url = new URL(window.location.href);
  for (const key of ["context", "domain"] as const) {
    if (filters[key] === ALL) url.searchParams.delete(PARAM[key]);
    else url.searchParams.set(PARAM[key], filters[key]);
  }
  window.history.replaceState(window.history.state, "", url);
}

// Un groupe de filtres à choix unique, précédé de son nom (deux « Tous » côte à côte seraient
// ambigus). Il n'apparaît que s'il départage au moins deux valeurs.
function FilterGroup<Value extends string>({
  name,
  label,
  value,
  options,
  onChange,
}: {
  name: string;
  label: string;
  value: Value | typeof ALL;
  options: { value: Value; label: string }[];
  onChange: (value: Value | typeof ALL) => void;
}) {
  if (options.length < 2) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span aria-hidden className="type-label text-muted-foreground">
        {name}
      </span>
      <ToggleGroup
        type="single"
        variant="outline"
        size="label"
        aria-label={label}
        className="flex-wrap"
        value={value}
        // Un filtre reste toujours actif : recliquer sur le filtre courant ne le retire pas.
        onValueChange={(next) => next && onChange(next as Value | typeof ALL)}
      >
        <ToggleGroupItem value={ALL}>Tous</ToggleGroupItem>
        {options.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

// Liste filtrable des projets, par cadre (entreprise, formation, personnel) et par domaine.
// Les filtres se combinent. Le rendu serveur liste tout : sans JavaScript, rien n'est masqué.
export function Catalog({ projects }: { projects: readonly Project[] }) {
  const [filters, setFilters] = useState<Filters>(NO_FILTER);
  const grid = useRef<HTMLDivElement>(null);
  const contexts = presentContexts(projects);
  const domains = presentDomains(projects);
  const statuses = presentStatuses(projects);
  const visible = projects.filter(
    (project) =>
      (filters.context === ALL || project.context === filters.context) &&
      (filters.domain === ALL || project.domain === filters.domain),
  );

  useEffect(() => {
    // Après l'hydratation : le rendu serveur ne connaît pas l'adresse.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- l'adresse n'existe qu'au navigateur
    setFilters(readFilters(contexts, domains));
    // Les listes viennent des projets, fixes pendant la vie de la page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(next: Partial<Filters>) {
    const merged = { ...filters, ...next };
    setFilters(merged);
    writeFilters(merged);
  }

  // Les affiches arrivent en léger décalé, au chargement puis à chaque filtre : on voit ce qui a
  // changé. Court (moins d'une demi-seconde) et jamais avec la réduction des animations.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from("[data-poster]", {
          y: 24,
          opacity: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: EASE_ENTER,
          clearProps: "transform,opacity",
        });
      });
    },
    { scope: grid, dependencies: [filters.context, filters.domain], revertOnUpdate: true },
  );

  return (
    <>
      <div className="mt-10 mb-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-border pt-[2.4vh] md:mt-[7vh] md:mb-[4vh]">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <FilterGroup
            name="Cadre"
            label="Filtrer par cadre"
            value={filters.context}
            options={contexts.map((context) => ({ value: context, label: CONTEXT_LABEL[context] }))}
            onChange={(context) => update({ context })}
          />
          <FilterGroup
            name="Domaine"
            label="Filtrer par domaine"
            value={filters.domain}
            options={domains.map((domain) => ({ value: domain, label: DOMAIN_LABEL[domain] }))}
            onChange={(domain) => update({ domain })}
          />
        </div>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 type-label text-muted-foreground">
          {/* Les statuts empruntent au cinéma : leur sens, en clair, une fois pour toutes. */}
          <dl className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Statuts">
            {statuses.map((status) => (
              <div key={status} className="flex gap-[0.6em]">
                <dt className="text-foreground">{STATUS_LABEL[status]}</dt>
                <dd>{STATUS_MEANING[status]}</dd>
              </div>
            ))}
          </dl>
          <p aria-live="polite" data-catalog-count>
            {visible.length === 0
              ? "Aucun projet"
              : `${visible.length} ${visible.length > 1 ? "projets" : "projet"}`}
          </p>
        </div>
      </div>
      <div ref={grid}>
        {visible.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-[1.6vw] min-[110rem]:grid-cols-4">
            {visible.map((project) => (
              <li key={project.slug} className={POSTER_SLOT}>
                <Poster project={project} index={projects.indexOf(project)} heading="h2" plain />
              </li>
            ))}
          </ul>
        ) : (
          // Deux filtres combinés peuvent ne rien laisser : on le dit, et on propose d'en sortir.
          <div className="flex flex-col items-start gap-5 border-y border-border py-12 md:py-[8vh]">
            <p className="text-lead text-soft">Aucun projet ne correspond à ces deux filtres.</p>
            <Button variant="outline" size="label" onClick={() => update(NO_FILTER)}>
              Voir tous les projets
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
