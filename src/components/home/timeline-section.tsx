import { TimelineScroll } from "@/components/animations/timeline-scroll";
import { CONTAINER, SectionHeading } from "@/components/home/section-heading";
import { TIMELINE, TIMELINE_KIND_LABEL, type TimelineKind } from "@/lib/profile";
import { cn } from "@/lib/utils";

const KIND_STYLE: Record<TimelineKind, string> = {
  formation: "border-white/15 text-foreground/80",
  experience: "border-brand/40 bg-brand/10 text-brand",
  "soft-skills": "border-dashed border-brand/40 text-brand",
};

// Rendu par défaut : liste verticale (mobile) puis grille. Au-dessus de 768 px, sans
// préférence de mouvement réduit, TimelineScroll ajoute `data-orientation="horizontal"`
// à l'enveloppe (variante Tailwind `data-horizontal`).
export function TimelineSection() {
  return (
    <section aria-labelledby="timeline-title" className="overflow-x-clip border-y border-white/5 bg-white/[0.015]">
      <TimelineScroll className="group/timeline flex flex-col justify-center py-24 md:py-36 data-horizontal:min-h-svh md:data-horizontal:py-16">
        <div className={CONTAINER}>
          <SectionHeading
            id="timeline-title"
            index="03"
            title="Parcours"
            lead="De 2022 à 2026 : formations, support IT et relation client."
          />
        </div>

        <div className="mt-14 md:group-data-horizontal/timeline:mt-12">
          <div
            aria-hidden
            className="mb-8 hidden h-px bg-white/10 group-data-horizontal/timeline:block"
          >
            <div data-timeline-progress className="h-full origin-left scale-x-0 bg-linear-to-r from-brand-deep to-brand" />
          </div>

          <ol
            data-timeline-track
            className={cn(
              CONTAINER,
              "relative grid gap-4 md:grid-cols-2 lg:grid-cols-3",
              "group-data-horizontal/timeline:flex group-data-horizontal/timeline:w-max group-data-horizontal/timeline:max-w-none group-data-horizontal/timeline:gap-5",
              "group-data-horizontal/timeline:pr-[max(1rem,calc((100vw-64rem)/2+1rem))] group-data-horizontal/timeline:pl-[max(1rem,calc((100vw-64rem)/2+1rem))]",
            )}
          >
            {TIMELINE.map((step) => (
              <li
                key={`${step.start}-${step.title}`}
                data-reveal
                className={cn(
                  "glow-card flex flex-col p-6 group-data-horizontal/timeline:w-[26rem] group-data-horizontal/timeline:shrink-0",
                  step.kind === "soft-skills" && "border-dashed border-brand/30",
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -bottom-6 -z-10 text-[6.5rem] leading-none font-semibold tracking-tighter text-white/[0.035] select-none"
                >
                  {step.start.slice(0, 4)}
                </span>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-sm text-brand">{step.period}</p>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wider uppercase",
                      KIND_STYLE[step.kind],
                    )}
                  >
                    {TIMELINE_KIND_LABEL[step.kind]}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-balance">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.place}</p>
                <p className="mt-5 text-pretty text-foreground/80">{step.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </TimelineScroll>
    </section>
  );
}
