import Image from "next/image";
import type { CSSProperties } from "react";

import { HELPDESK, HELPDESK_MONTHS_WORD } from "@/components/home/facts";
import { CallAction, CvAction, Voice } from "@/components/home/home-ui";
import { HERO } from "@/lib/profile";
import { OWNER } from "@/lib/site";
import pastille from "../../../public/images/yanis-harrat-pastille.webp";

const rise = (index: number) => ({ "--rise-index": index }) as CSSProperties;

// « 3 j », « 2 j » : le chiffre ne se sépare jamais de son unité.
const nonBreaking = (text: string) => text.replace(/(\d) /g, "$1\u00a0");

/*
 * Premier écran : la personne est le titre.
 * Le H1 est complet dans le HTML ; l'entrée (lignes qui montent, pastille qui s'ouvre)
 * est en CSS, coupée en mouvement réduit (voir globals.css).
 */
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="page-container flex flex-col pt-10 pb-14 sm:min-h-[calc(100svh-3.5rem-6.5rem)] sm:justify-center sm:pt-[max(2rem,6svh)] sm:pb-[max(2.5rem,6svh)]"
    >
      <h1
        id="hero-title"
        className="text-[clamp(2.75rem,min(14vw,18.5svh),10.5rem)] leading-[0.9] font-[760] tracking-[-0.04em] text-bone [font-stretch:80%]"
      >
        <span className="sr-only">{OWNER.fullName}, </span>
        <span className="block overflow-hidden pb-[0.06em]">
          <span data-rise style={rise(0)} className="block">
            Opérationnel
          </span>
        </span>
        <span className="-mt-[0.06em] block overflow-hidden pt-[0.04em] pb-[0.12em]">
          <span data-rise style={rise(1)} className="block whitespace-nowrap">
            <span
              data-pill
              className="relative mr-[0.16em] inline-block h-[0.72em] w-[1.6em] overflow-hidden rounded-full bg-raised align-baseline"
            >
              <Image
                src={pastille}
                alt=""
                fill
                preload
                sizes="(min-width: 1024px) 220px, 34vw"
                className="object-cover object-[52%_40%]"
              />
            </span>
            <Voice>dès lundi.</Voice>
          </span>
        </span>
      </h1>

      <div className="mt-8 max-w-[52rem] sm:mt-[max(1.5rem,4.5svh)]">
        <p className="text-lg/snug text-bone sm:text-xl/snug">
          <span className="font-semibold">{HERO.role}</span> en alternance
          <span aria-hidden className="hidden text-ash sm:inline">
            {" "}
            ·{" "}
          </span>
          <span className="block text-ash sm:inline">
            {HERO.diploma} · {nonBreaking(HERO.rhythm)}
          </span>
        </p>
        <p className="mt-3 max-w-[46rem] text-base/relaxed text-ash sm:text-lg/relaxed">
          {HELPDESK_MONTHS_WORD} mois de helpdesk N1/N2 en production chez{" "}
          {HELPDESK.place}&nbsp;: tickets sous SLA, incidents Windows et Microsoft 365, comptes Active Directory.
        </p>
      </div>

      <div className="mt-9 flex flex-col gap-3 sm:mt-[max(1.75rem,4.5svh)] sm:flex-row sm:items-center">
        <CallAction />
        <CvAction />
      </div>
    </section>
  );
}
