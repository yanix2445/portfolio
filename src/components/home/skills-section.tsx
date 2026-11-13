import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { CONTAINER, SectionHeading } from "@/components/home/section-heading";
import { SKILL_GROUPS } from "@/lib/profile";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-title" className={cn(CONTAINER, "py-24 md:py-36")}>
      <ScrollReveal>
        <SectionHeading
          id="skills-title"
          index="01"
          title="Compétences"
          lead="Six domaines, du poste de travail à l'infrastructure réseau."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => (
            <li key={group.title} data-reveal className="flex">
              <div className="glow-card w-full p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight">{group.title}</h3>
                  <span aria-hidden className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-sm text-foreground/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}
