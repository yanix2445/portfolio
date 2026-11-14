import Image from "next/image";

import { OPENING } from "@/lib/profile";
import { CONTACT, CV_PATH, OWNER } from "@/lib/site";
import { cn } from "@/lib/utils";

import s from "./home.styles";

function Synopsis() {
  return (
    <p className={s.synopsis}>
      {OPENING.synopsis} <em>{OPENING.synopsisAccent}</em>
    </p>
  );
}

// Premier écran : le portrait plein cadre et le nom en lettres d'affiche.
// Le synopsis est rendu deux fois : la copie lue suit le hero dans le flux,
// la copie décorative est posée dans le hero par l'animation (grand écran).
export function HeroSection() {
  return (
    <>
      <section aria-labelledby="hero-title" className={s.open} data-hero>
        <div className={s.plate} data-hero-plate>
          <Image
            src="/images/yanis-harrat.png"
            alt={`Portrait de ${OWNER.fullName}`}
            width={1122}
            height={1402}
            priority
            sizes="(min-width: 768px) 66vw, 100vw"
            className={s.photo}
            data-hero-photo
          />
          <div className={s.shade} data-hero-shade />
        </div>

        <div className={s.title} data-hero-title>
          <h1 id="hero-title" aria-label={OWNER.fullName} className={cn(s.poster, s.name)}>
            <span aria-hidden className={cn(s.line, s.outline)}>
              <span data-hero-line data-hero-fill>
                {OWNER.firstName}
              </span>
            </span>
            <span aria-hidden className={s.line}>
              <span data-hero-line>{OWNER.lastName}</span>
            </span>
          </h1>
        </div>

        <p className={cn(s.label, s.kicker)} data-hero-kicker>
          <i aria-hidden className={s.dot} />
          {OPENING.kicker}
        </p>

        <div aria-hidden className={s.synopsisPinned} data-hero-synopsis>
          <Synopsis />
        </div>

        <div aria-hidden className={cn(s.label, s.cue)} data-hero-cue>
          Défiler
        </div>

        <dl className={cn(s.label, s.slate)}>
          {OPENING.slate.map(({ label, value }) => (
            <div key={label} data-hero-slate>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className={s.mobileActions}>
          <a href={`tel:${CONTACT.phoneE164}`} className={cn(s.btn, s.btnHot)}>
            Appeler
          </a>
          <a href={CV_PATH} target="_blank" rel="noopener" className={cn(s.btn, s.btnGhost)}>
            CV (PDF)
          </a>
        </div>
      </section>

      <div className={s.synopsisFlow} data-hero-synopsis-flow>
        <Synopsis />
      </div>
    </>
  );
}
