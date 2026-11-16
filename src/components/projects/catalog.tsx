"use client";

import { useState } from "react";

import { Poster } from "@/components/projects/poster";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DOMAIN_LABEL, presentDomains, type Project, type ProjectDomain } from "@/lib/projects";

type Filter = ProjectDomain | "all";

// Liste filtrable des projets. Le rendu serveur liste tout : sans JavaScript,
// les filtres ne masquent rien.
export function Catalog({ projects }: { projects: readonly Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const domains = presentDomains(projects);
  const visible = filter === "all" ? projects : projects.filter((project) => project.domain === filter);
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "Tous" },
    ...domains.map((domain) => ({ value: domain, label: DOMAIN_LABEL[domain] })),
  ];

  return (
    <>
      <div className="mt-10 mb-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-border pt-[2.4vh] md:mt-[7vh] md:mb-[4vh]">
        <ToggleGroup
          type="single"
          variant="outline"
          size="label"
          aria-label="Filtrer par domaine"
          className="flex-wrap"
          value={filter}
          // Un filtre reste toujours actif : recliquer sur le filtre courant ne le retire pas.
          onValueChange={(value) => value && setFilter(value as Filter)}
        >
          {filters.map(({ value, label }) => (
            <ToggleGroupItem key={value} value={value}>
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p aria-live="polite" className="type-label text-muted-foreground" data-catalog-count>
          {visible.length} {visible.length > 1 ? "projets" : "projet"}
        </p>
      </div>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-[1.6vw]">
        {visible.map((project) => (
          <li key={project.slug}>
            <Poster project={project} index={projects.indexOf(project)} heading="h2" />
          </li>
        ))}
      </ul>
    </>
  );
}
