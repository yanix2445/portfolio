import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HeroIntro } from "@/components/animations/hero-intro";
import { CONTAINER } from "@/components/home/section-heading";
import { HERO } from "@/lib/profile";
import { CV_PATH, OWNER } from "@/lib/site";
import { cn } from "@/lib/utils";

const PORTRAIT_ALT = `Portrait de ${OWNER.fullName}, souriant, en veste sombre devant des lumières ambrées.`;

// Chaque lettre est un span animable ; le nom accessible reste porté par le H1 (aria-label).
function SplitWord({ word, className }: { word: string; className?: string }) {
  return (
    <span aria-hidden className="block overflow-hidden pb-[0.06em] whitespace-nowrap">
      {Array.from(word).map((letter, index) => (
        <span key={index} data-hero-letter className={cn("inline-block", className)}>
          {letter}
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative isolate overflow-hidden border-b border-white/5"
    >
      <HeroIntro>
        {/* Trame réseau et halo ambré, purement décoratifs. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]"
        />
        <div
          aria-hidden
          data-hero-glow
          className="absolute top-[-20%] right-[-25%] -z-10 aspect-square w-[min(60rem,140vw)] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand)_28%,transparent),transparent)]"
        />

        <div
          className={cn(
            CONTAINER,
            "grid items-center gap-14 pt-14 pb-20 md:pt-20 md:pb-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10",
          )}
        >
          <div data-hero-copy>
            <p data-hero-reveal className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 tracking-wide text-brand">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                  <span className="relative size-2 rounded-full bg-brand" />
                </span>
                {HERO.status}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1.5 tracking-wide text-muted-foreground">
                {HERO.rhythm}
              </span>
            </p>

            <h1
              id="hero-title"
              aria-label={OWNER.fullName}
              className="mt-8 text-[clamp(3.75rem,21vw,8.5rem)] leading-[0.82] font-semibold tracking-[-0.055em]"
            >
              <SplitWord word={OWNER.firstName} />{" "}
              <SplitWord
                word={OWNER.lastName}
                className="bg-linear-to-b from-[oklch(0.93_0.08_85)] via-brand to-brand-deep bg-clip-text text-transparent"
              />
            </h1>

            <p data-hero-reveal className="mt-8 text-xl font-medium text-balance md:text-2xl">
              {HERO.role}
              <span className="text-muted-foreground"> · {HERO.diploma}</span>
            </p>
            <p data-hero-reveal className="mt-4 max-w-xl text-pretty text-muted-foreground">
              {HERO.intro}
            </p>

            <div data-hero-reveal className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/projets"
                className="focus-ring group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 font-medium text-brand-foreground transition-[transform,background-color] duration-150 ease-out hover:bg-brand/90 motion-safe:active:scale-[0.97]"
              >
                Voir les projets
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={CV_PATH}
                target="_blank"
                rel="noopener"
                className="focus-ring inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 font-medium transition-[transform,border-color,background-color] duration-150 ease-out hover:border-brand/50 hover:bg-white/[0.07] motion-safe:active:scale-[0.97]"
              >
                <Download aria-hidden className="size-4" />
                Télécharger le CV
              </a>
            </div>
          </div>

          <div data-hero-photo className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand)_35%,transparent),transparent)]"
            />
            {/* Bordure lumineuse : dégradé ambre sur 1 px. */}
            <div className="rounded-[2.1rem] bg-linear-to-b from-brand/60 via-white/10 to-white/5 p-px">
              <div className="relative aspect-[1122/1402] overflow-hidden rounded-[2rem] bg-card">
                <div data-hero-parallax className="absolute inset-0 scale-110">
                  <Image
                    src="/images/yanis-harrat.png"
                    alt={PORTRAIT_ALT}
                    fill
                    preload
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 304px"
                    className="object-cover"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-background/85 via-transparent to-transparent"
                />
                <p className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 font-mono text-[11px] tracking-[0.2em] text-foreground/85 uppercase">
                  <span>{HERO.location}</span>
                  <span className="text-brand">{HERO.diploma}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </HeroIntro>
    </section>
  );
}
