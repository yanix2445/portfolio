import Image from "next/image";
import Link from "next/link";

import { BookCallLink } from "@/components/contact/book-call-link";
import { Button } from "@/components/ui/button";
import { OPENING } from "@/lib/profile";
import { CV_PATH, OWNER, PORTRAIT } from "@/lib/site";
import { cn } from "@/lib/utils";

function Synopsis({ className }: { className: string }) {
  return (
    <p className={className}>
      {OPENING.synopsis} <em className="text-primary not-italic">{OPENING.synopsisAccent}</em>
    </p>
  );
}

// Premier écran : le portrait plein cadre, le nom en lettres d'affiche, ce que cherche Yanis
// et les appels à l'action.
// Le synopsis est rendu deux fois : la copie lue suit le hero dans le flux,
// la copie décorative est posée dans le hero par l'animation (grand écran).
export function HeroSection() {
  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="relative -mt-header px-gutter pb-10 md:h-svh md:min-h-136 md:overflow-hidden md:px-0 md:pb-0 md:[--hero-band:calc(2.6vw+1.1vw+3rem+2.4vh+var(--spacing-control-xl))] lg:[--hero-band:calc(2.6vw+1.1vw+var(--spacing-control-xl))]"
        data-hero
      >
        {/* Le cadre coupe le zoom d'entrée de la photo : il ne doit pas élargir la page. */}
        <div
          className="relative -mx-gutter h-[56svh] min-h-88 overflow-hidden md:absolute md:inset-0 md:mx-0 md:h-auto md:min-h-0"
          data-hero-plate
        >
          <Image
            src={PORTRAIT.src}
            alt={`Portrait de ${OWNER.fullName}`}
            width={PORTRAIT.width}
            height={PORTRAIT.height}
            preload
            sizes="(min-width: 768px) 66vw, 100vw"
            className="absolute top-0 right-0 h-full w-full max-w-none origin-[60%_30%] object-cover object-[50%_var(--portrait-y)] md:w-[66%]"
            data-hero-photo
          />
          {/* Voiles : le bas se fond dans la page, et sur grand écran la gauche porte le nom. */}
          <div className="absolute inset-0" data-hero-shade>
            <div className="absolute inset-0 bg-linear-to-t/srgb from-background from-3% to-transparent to-42% md:from-2% md:to-34%" />
            <div className="absolute inset-0 bg-linear-to-r/srgb from-background from-33% via-background/60 via-50% to-transparent to-72% max-md:hidden" />
          </div>
        </div>

        <div
          className="relative -mt-[24vw] origin-bottom-left md:absolute md:bottom-[calc(var(--hero-band)+2.4vh)] md:left-[3.1vw] md:mt-0"
          data-hero-title
        >
          <h1 id="hero-title" aria-label={OWNER.fullName} className="type-poster text-display-name">
            {[OWNER.firstName, OWNER.lastName].map((word, index) => (
              <span
                key={word}
                aria-hidden
                className={cn("block overflow-hidden pt-[0.04em] pb-[0.035em]", index === 0 && "type-outline")}
              >
                <span className="block" data-hero-line data-hero-fill={index === 0 ? "" : undefined}>
                  {word}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Ce que cherche Yanis, en une phrase : lisible dès le premier écran, au-dessus du nom
            sur grand écran, juste dessous sur téléphone. La pastille dit qu'il est disponible. */}
        <p
          className="mt-5 flex max-w-[34ch] items-baseline gap-[0.7em] text-lead text-pretty md:absolute md:top-[14vh] md:left-gutter md:mt-0 md:max-w-[min(40vw,34ch)]"
          data-hero-kicker
        >
          <i
            aria-hidden
            className="size-[0.55em] shrink-0 -translate-y-[0.05em] rounded-full bg-primary ring-[0.3em] ring-primary/20"
          />
          {OPENING.statement}
        </p>

        <div
          aria-hidden
          className="absolute top-[23vh] left-gutter hidden w-[46vw]"
          data-hero-synopsis
        >
          <Synopsis className="text-synopsis-pinned" />
        </div>

        <div
          aria-hidden
          className="type-label absolute top-1/2 right-gutter flex items-center gap-[1.2em] text-muted-foreground [writing-mode:vertical-rl] after:h-[7vh] after:w-px after:bg-linear-to-b/srgb after:from-foreground after:to-transparent max-md:hidden motion-safe:after:animate-cue"
          data-hero-cue
        >
          Défiler
        </div>

        {/* Bandeau du bas : les faits utiles au recruteur, puis les appels à l'action. Sa hauteur
            (`--hero-band`) place le nom juste au-dessus ; sur téléphone, les appels passent en premier. */}
        <div
          className="mt-7 flex flex-col gap-7 md:absolute md:inset-x-gutter md:bottom-[2.6vw] md:mt-0 md:gap-[2.4vh] lg:flex-row lg:gap-0"
          data-hero-band
        >
          <dl className="type-label grid grid-cols-2 border-t border-border md:grid-cols-3 lg:flex-1">
            {OPENING.slate.map(({ label, value }) => (
              <div
                key={label}
                className="py-3.5 pr-3 max-md:even:border-l max-md:even:pl-3.5 max-md:nth-[n+3]:col-span-2 max-md:nth-[n+3]:border-t md:pt-[1.1vw] md:pr-[1.4vw] md:pb-0 md:not-first:border-l md:not-first:pl-[1.4vw]"
                data-hero-slate
              >
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="mt-[0.5em] font-sans text-meta tracking-normal normal-case">{value}</dd>
              </div>
            ))}
          </dl>
          <div
            className="flex flex-wrap gap-2.5 max-md:order-first md:gap-[0.8vw] lg:border-t lg:border-l lg:border-border lg:pt-[1.1vw] lg:pl-[1.4vw]"
            data-hero-slate
          >
            {/* Le formulaire s'ouvre avec le motif « Alternance » déjà choisi. */}
            <Button asChild size="xl" className="max-md:basis-full">
              <Link href="/contact?motif=alternance">Proposer une alternance</Link>
            </Button>
            {/* Sur grand écran, « Réserver un appel » est déjà dans l'en-tête. */}
            <Button asChild variant="outline" size="xl" className="flex-1 md:hidden">
              <BookCallLink />
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href={CV_PATH} target="_blank" rel="noopener">
                CV
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* L'enveloppe ne porte aucun style : l'animation peut la replier (`sr-only`) sans conflit. */}
      <div data-hero-synopsis-flow>
        <div className="border-t border-border px-gutter py-16 md:py-[12vh]">
          <Synopsis className="text-synopsis md:max-w-[60vw]" />
        </div>
      </div>
    </>
  );
}
