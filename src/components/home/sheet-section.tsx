import { SHEET } from "@/lib/profile";

// Compétences : un tableau fixe, par familles.
export function SheetSection() {
  return (
    <section
      aria-labelledby="sheet-title"
      className="grid items-start gap-8 border-t border-border px-gutter pt-20 pb-12 md:grid-cols-[0.78fr_1.22fr] md:gap-[4vw] md:pt-[16vh] md:pb-[12vh]"
      data-reveal-group
    >
      <div>
        <p className="type-label mb-[1.6vh] text-primary">Compétences</p>
        <h2 id="sheet-title" className="type-poster text-display-lg" data-reveal="title">
          Fiche technique
        </h2>
        <p className="mt-[3vh] text-body text-soft md:max-w-[26vw]">
          Les environnements que je sais installer, administrer et dépanner.
        </p>
      </div>
      <dl>
        {SHEET.map(({ label, items, aside }) => (
          <div
            key={label}
            className="grid items-baseline gap-1.5 border-t border-border py-4.5 last:border-b md:grid-cols-[13vw_1fr] md:gap-[2vw] md:py-[2.3vh]"
            data-reveal="row"
          >
            <dt className="type-label text-muted-foreground">{label}</dt>
            <dd className="text-lead">
              {items}
              {aside ? <span className="font-normal text-muted-foreground"> · {aside}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
