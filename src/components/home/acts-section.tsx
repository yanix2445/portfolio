import { ACTS } from "@/lib/profile";
import { cn } from "@/lib/utils";

import s from "./home.styles";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"] as const;

// Un acte par expérience, dans l'ordre chronologique. En colonne par défaut :
// l'animation les met en rangée sur grand écran.
export function ActsSection() {
  return (
    <section aria-labelledby="acts-title" className={s.acts} data-acts>
      <h2 id="acts-title" className="sr-only">
        Mon parcours
      </h2>
      <div className={s.track} data-acts-track>
        {ACTS.map((act, index) => (
          <article key={act.place} className={cn(s.act, act.current && s.now)} data-act>
            <div aria-hidden className={cn(s.poster, s.num)} data-act-num>
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <p className={cn(s.label, s.tag)} data-act-item>
                Acte {ROMAN[index]} · {act.period} <span>{act.note}</span>
              </p>
              <h3 className={cn(s.poster, s.place)} data-act-item>
                {act.place}
              </h3>
              <p className={s.role} data-act-item>
                {act.role}
              </p>
              <p className={s.txt} data-act-item>
                {act.text}
              </p>
              <ul className={cn(s.label, s.chips)} data-act-item>
                {act.keywords.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <div aria-hidden className={cn(s.label, s.reel)}>
        <span data-acts-count>Acte 1 / {ACTS.length}</span>
        <div className={s.bar}>
          <i data-acts-progress />
        </div>
        <span>Mon parcours, dans l&apos;ordre</span>
      </div>
    </section>
  );
}
