import type { ReactNode } from "react";

import { TickFigure } from "@/components/animations/tick-figure";
import {
  CERTIFICATION_COUNT,
  CERTIFICATION_ISSUERS,
  HELPDESK,
  HELPDESK_MONTHS,
  IUT,
  PISCINE,
  SERVICE,
  SERVICE_MONTHS,
} from "@/components/home/facts";
import { SectionTitle, Voice } from "@/components/home/home-ui";

type Figure = {
  value: number;
  statement: ReactNode;
  source: string;
};

const FIGURES: readonly Figure[] = [
  {
    value: HELPDESK_MONTHS,
    statement: (
      <>
        <Voice>mois</Voice> de helpdesk N1/N2 en production, tickets sous SLA.
      </>
    ),
    source: `${HELPDESK.place} · ${HELPDESK.period}`,
  },
  {
    value: SERVICE_MONTHS,
    statement: (
      <>
        <Voice>mois</Voice> en salle comme chef de rang : le client, la pression, l&apos;équipe.
      </>
    ),
    source: `${SERVICE.place} · ${SERVICE.period}`,
  },
  {
    value: 42,
    statement: (
      <>
        Comme l&apos;École <Voice>dont j&apos;ai fait la piscine.</Voice> Depuis, j&apos;automatise en Python,
        JavaScript et n8n.
      </>
    ),
    source: `${PISCINE.place} · ${PISCINE.period}, puis ${IUT.place} · ${IUT.period}`,
  },
  {
    value: CERTIFICATION_COUNT,
    statement: (
      <>
        <Voice>certifications</Voice>, du support IT à l&apos;usage des outils d&apos;IA.
      </>
    ),
    source: CERTIFICATION_ISSUERS,
  },
];

export function FiguresSection() {
  return (
    <section aria-labelledby="figures-title" className="border-t border-rule">
      <div className="page-container grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:gap-x-12 lg:py-40">
        <SectionTitle id="figures-title" className="lg:col-span-4">
          Les chiffres, <Voice>sans arrondir.</Voice>
        </SectionTitle>
        <ul className="border-t border-rule lg:col-span-8">
          {FIGURES.map(({ value, statement, source }) => (
            <li
              key={source}
              className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-5 border-b border-rule py-7 sm:grid-cols-[9rem_1fr] sm:gap-x-8 sm:py-9"
            >
              <p className="pixel text-[3.4375rem] leading-none text-bone sm:text-[5.5rem]">
                <TickFigure value={value} />
              </p>
              <div>
                <p className="text-xl/snug text-pretty text-bone sm:text-2xl/snug">{statement}</p>
                <p className="mt-2 text-sm text-ash">{source}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
