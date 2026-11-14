"use client";

import { useState } from "react";

import { Poster } from "@/components/home/poster";
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
      <div className="gc-bar">
        <div role="group" aria-label="Filtrer par domaine" className="gc-filters">
          {filters.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className="gc-label gc-filter"
            >
              {label}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="gc-label gc-count" data-catalog-count>
          {visible.length} {visible.length > 1 ? "projets" : "projet"}
        </p>
      </div>
      <ul className="gc-grid">
        {visible.map((project) => (
          <li key={project.slug}>
            <Poster project={project} index={projects.indexOf(project)} />
          </li>
        ))}
      </ul>
    </>
  );
}
