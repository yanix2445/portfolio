import { Badge } from "@/components/ui/badge";
import { ACTS } from "@/lib/profile";
import { cn } from "@/lib/utils";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"] as const;

// Un acte par expérience, dans l'ordre chronologique. En colonne par défaut :
// l'animation les met en rangée sur grand écran (variante `horizontal:`).
export function ActsSection() {
  return (
    <section
      aria-labelledby="acts-title"
      className="relative border-t border-border horizontal:h-screen horizontal:overflow-hidden"
      data-acts
    >
      <h2 id="acts-title" className="sr-only">
        Mon parcours
      </h2>
      <div
        className="flex flex-col horizontal:h-full horizontal:w-max horizontal:flex-row horizontal:will-change-transform"
        data-acts-track
      >
        {ACTS.map((act, index) => (
          <article
            key={act.place}
            className="relative grid items-end gap-5 border-b border-border px-gutter py-14 md:grid-cols-[0.85fr_1.15fr] md:gap-[4vw] md:py-[12vh] horizontal:h-full horizontal:flex-[0_0_100vw] horizontal:border-b-0 horizontal:pt-[15vh]"
            data-act
          >
            <div
              aria-hidden
              className={cn(
                "type-poster text-display-numeral horizontal:text-display-numeral-wide",
                act.current ? "text-primary" : "text-outline-accent",
              )}
              data-act-num
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <p className="type-label mb-[2vh] flex flex-wrap gap-x-[1.4em] text-primary" data-act-item>
                Acte {ROMAN[index]} · {act.period}{" "}
                <span className="text-muted-foreground">{act.note}</span>
              </p>
              <h3 className="type-poster pt-[0.14em] text-display-md" data-act-item>
                {act.place}
              </h3>
              <p className="mt-[2.2vh] text-subtitle" data-act-item>
                {act.role}
              </p>
              <p className="mt-[2.2vh] text-body text-soft md:max-w-[40vw]" data-act-item>
                {act.text}
              </p>
              <ul className="mt-[3vh] flex flex-wrap gap-2" data-act-item>
                {act.keywords.map((keyword) => (
                  <li key={keyword}>
                    <Badge variant="outline">{keyword}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <div
        aria-hidden
        className="type-label absolute inset-x-gutter bottom-[3.6vh] hidden items-center gap-[1.4vw] text-muted-foreground horizontal:flex"
      >
        <span data-acts-count>Acte 1 / {ACTS.length}</span>
        <div className="relative h-px flex-1 bg-border">
          <i className="absolute inset-x-0 -inset-y-px origin-left bg-primary" data-acts-progress />
        </div>
        <span>Mon parcours, dans l&apos;ordre</span>
      </div>
    </section>
  );
}
