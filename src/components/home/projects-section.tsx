import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SectionTitle, Voice } from "@/components/home/home-ui";
import { formatDate, getEntries } from "@/lib/content";

const LATEST_COUNT = 3;

export async function ProjectsSection() {
  const projects = (await getEntries("projets")).slice(0, LATEST_COUNT);

  return (
    <section aria-labelledby="projects-title" className="border-t border-rule">
      <div className="page-container py-24 sm:py-32 lg:py-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle id="projects-title">
            Projets <Voice>récents.</Voice>
          </SectionTitle>
          <Link
            href="/projets"
            className="group inline-flex items-center gap-2 rounded-sm py-1 text-base text-bone underline decoration-rule-strong underline-offset-[0.3em] transition-colors duration-150 hover:decoration-bone"
          >
            Tous les projets
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="mt-14 text-lg text-ash">Les fiches projets arrivent.</p>
        ) : (
          <ul className="mt-14 border-t border-rule sm:mt-20">
            {projects.map(({ slug, metadata }) => (
              <li key={slug}>
                <Link
                  href={`/projets/${slug}`}
                  className="group grid gap-x-12 gap-y-3 border-b border-rule py-8 transition-colors duration-150 hover:bg-raised/60 sm:grid-cols-[11rem_1fr] lg:grid-cols-12"
                >
                  <time dateTime={metadata.date} className="text-sm text-ash sm:pt-2 lg:col-span-2">
                    {formatDate(metadata.date)}
                  </time>
                  <h3 className="text-2xl/tight font-[680] tracking-[-0.02em] text-balance text-bone [font-stretch:88%] sm:text-[1.75rem]/tight lg:col-span-5">
                    {metadata.title}
                  </h3>
                  <div className="sm:col-start-2 lg:col-span-4 lg:col-start-auto lg:pt-1.5">
                    <p className="text-base/relaxed text-pretty text-ash">{metadata.summary}</p>
                    <p className="mt-3 text-sm text-ash">{metadata.tags.join(" · ")}</p>
                  </div>
                  <ArrowUpRight
                    aria-hidden
                    className="hidden size-6 justify-self-end text-ash transition-[color,translate] duration-200 ease-out group-hover:text-bone motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 lg:col-span-1 lg:mt-1 lg:block"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
