import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { MotionCard } from "@/components/animations/motion-card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { CONTAINER, SectionHeading } from "@/components/home/section-heading";
import { formatDate, getEntries } from "@/lib/content";
import { cn } from "@/lib/utils";

const LATEST_COUNT = 3;

export async function ProjectsSection() {
  const projects = (await getEntries("projets")).slice(0, LATEST_COUNT);

  return (
    <section aria-labelledby="projects-title" className={cn(CONTAINER, "py-24 md:py-36")}>
      <ScrollReveal>
        <SectionHeading
          id="projects-title"
          index="04"
          title="Projets récents"
          lead="Réalisations professionnelles menées en formation et en stage."
          action={
            <Link
              href="/projets"
              className="focus-ring group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium transition-colors duration-150 ease-out hover:border-brand/50"
            >
              Tous les projets
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5"
              />
            </Link>
          }
        />

        {projects.length === 0 ? (
          <p className="mt-14 text-muted-foreground">Aucun projet publié pour le moment.</p>
        ) : (
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {projects.map(({ slug, metadata }, index) => (
              <li key={slug} data-reveal className="flex">
                <MotionCard>
                  <Link
                    href={`/projets/${slug}`}
                    className="focus-ring glow-card group flex w-full flex-col p-6"
                  >
                    <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                      <span aria-hidden className="text-brand">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
                    </div>
                    <h3 className="mt-10 text-2xl font-semibold tracking-tight text-balance">
                      {metadata.title}
                    </h3>
                    <p className="mt-3 text-pretty text-muted-foreground">{metadata.summary}</p>
                    <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                      <ul className="flex flex-wrap gap-1.5">
                        {metadata.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[11px] text-foreground/75"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 shrink-0 text-brand transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      />
                    </div>
                  </Link>
                </MotionCard>
              </li>
            ))}
          </ul>
        )}
      </ScrollReveal>
    </section>
  );
}
