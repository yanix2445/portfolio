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
        <Voice>mois</Voice> en salle comme chef de rang&nbsp;: le client, la pression, l&apos;équipe.
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

// Second moment composé de la page : la voix pixel passe à l'échelle display.
// Corps multiples de 11 px, la grille de dessin de Departure Mono.
export function FiguresSection() {
  return (
    <section aria-labelledby="figures-title" className="border-t border-rule">
      <div className="page-container py-24 sm:py-32 lg:py-40">
        <SectionTitle id="figures-title">Les chiffres, sans arrondir.</SectionTitle>
        <ul className="mt-14 grid gap-x-12 sm:mt-20 md:grid-cols-2">
          {FIGURES.map(({ value, statement, source }) => (
            <li key={source} className="border-t border-rule pt-8 pb-14 sm:pb-20">
              <p className="pixel text-[6.875rem] leading-[0.8] text-bone sm:text-[8.25rem] lg:text-[9.625rem]">
                <TickFigure value={value} />
              </p>
              <p className="mt-8 max-w-[28rem] text-xl/snug text-pretty text-bone sm:text-2xl/snug">{statement}</p>
              <p className="mt-3 text-sm text-ash">{source}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
