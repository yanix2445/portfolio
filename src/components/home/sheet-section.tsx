import { SHEET } from "@/lib/profile";
import { cn } from "@/lib/utils";

import s from "./home.styles";

// Compétences : un tableau fixe, par familles.
export function SheetSection() {
  return (
    <section aria-labelledby="sheet-title" className={s.sheet} data-reveal-group>
      <div>
        <p className={cn(s.label, s.sectionLabel)}>Compétences</p>
        <h2 id="sheet-title" className={cn(s.poster, s.sheetTitle)} data-reveal="title">
          Fiche technique
        </h2>
        <p className={cn(s.lead, s.sheetLead)}>
          Les environnements que je sais installer, administrer et dépanner.
        </p>
      </div>
      <dl>
        {SHEET.map(({ label, items, aside }) => (
          <div key={label} className={s.row} data-reveal="row">
            <dt className={s.label}>{label}</dt>
            <dd>
              {items}
              {aside ? <span> · {aside}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
