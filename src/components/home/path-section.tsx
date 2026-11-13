import { SectionTitle } from "@/components/home/home-ui";
import { TIMELINE, TIMELINE_KIND_LABEL } from "@/lib/profile";

// Parcours en table à filets, du plus récent au plus ancien.
export function PathSection() {
  const steps = [...TIMELINE].sort((a, b) => b.start.localeCompare(a.start));

  return (
    <section aria-labelledby="path-title" className="border-t border-rule">
      <div className="page-container py-24 sm:py-32 lg:py-40">
        <SectionTitle id="path-title">
          Le parcours, du plus récent.
        </SectionTitle>

        <ol className="mt-14 border-t border-rule sm:mt-20">
          {steps.map(({ start, period, title, place, summary, kind }) => (
            <li
              key={start}
              className="grid gap-x-12 gap-y-2 border-b border-rule py-7 sm:grid-cols-[11rem_1fr] lg:grid-cols-12"
            >
              <p className="text-sm text-ash tabular-nums sm:pt-1.5 lg:col-span-2">
                {period}
                <span className="mt-1 block text-ash">{TIMELINE_KIND_LABEL[kind]}</span>
              </p>
              <div className="lg:col-span-5">
                <h3 className="text-xl/snug font-semibold tracking-[-0.01em] text-bone sm:text-2xl/snug">{title}</h3>
                <p className="mt-1.5 font-serif text-xl/snug font-medium text-bone/85 italic">{place}</p>
              </div>
              <p className="text-base/relaxed text-ash sm:col-start-2 lg:col-span-5 lg:col-start-auto lg:pt-1">
                {summary}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
