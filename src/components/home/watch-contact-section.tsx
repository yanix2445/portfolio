import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

import { MotionCard } from "@/components/animations/motion-card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { CONTAINER, SectionHeading } from "@/components/home/section-heading";
import { formatDate, getEntries } from "@/lib/content";
import { HERO } from "@/lib/profile";
import { CONTACT } from "@/lib/site";
import { cn } from "@/lib/utils";

export async function WatchContactSection() {
  const [latestArticle] = await getEntries("veille");

  return (
    <section aria-labelledby="watch-contact-title" className={cn(CONTAINER, "pt-24 pb-24 md:pt-36")}>
      <ScrollReveal>
        <SectionHeading
          id="watch-contact-title"
          index="05"
          title="Veille & contact"
          action={
            <Link
              href="/veille"
              className="focus-ring group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium transition-colors duration-150 ease-out hover:border-brand/50"
            >
              Toute la veille
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5"
              />
            </Link>
          }
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          {latestArticle ? (
            <div data-reveal className="flex">
              <MotionCard>
                <Link
                  href={`/veille/${latestArticle.slug}`}
                  className="focus-ring glow-card group flex flex-col p-6 md:p-8"
                >
                  <p className="font-mono text-xs tracking-[0.2em] text-brand uppercase">Dernier article de veille</p>
                  <h3 className="mt-8 text-2xl font-semibold tracking-tight text-balance">
                    {latestArticle.metadata.title}
                  </h3>
                  <p className="mt-3 text-pretty text-muted-foreground">{latestArticle.metadata.summary}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-10 text-sm text-muted-foreground">
                    <time dateTime={latestArticle.metadata.date}>{formatDate(latestArticle.metadata.date)}</time>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-brand transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    />
                  </div>
                </Link>
              </MotionCard>
            </div>
          ) : (
            <div className="glow-card p-6 text-muted-foreground md:p-8">
              Aucun article de veille publié pour le moment.
            </div>
          )}

          <div data-reveal className="grain relative isolate overflow-hidden rounded-[2rem] border border-brand/25 bg-[radial-gradient(120%_120%_at_100%_0%,color-mix(in_oklab,var(--brand)_32%,transparent),transparent_55%),linear-gradient(to_bottom,rgb(255_255_255/0.04),transparent)] p-8 md:p-12">
            <h3 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] font-semibold tracking-[-0.045em] text-balance">
              Parlons de votre{" "}
              <span className="bg-linear-to-b from-[oklch(0.93_0.08_85)] via-brand to-brand-deep bg-clip-text text-transparent">
                alternance.
              </span>
            </h3>
            <p className="mt-6 max-w-md text-pretty text-foreground/80">
              Vous cherchez un {HERO.role.toLowerCase()} en alternance ({HERO.rhythm})&nbsp;? Écrivez-moi.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="focus-ring group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 font-medium text-brand-foreground transition-[transform,background-color] duration-150 ease-out hover:bg-brand/90 motion-safe:active:scale-[0.97]"
              >
                Me contacter
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={`mailto:${CONTACT.email}`}
                className="focus-ring inline-flex h-12 max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium transition-colors duration-150 ease-out hover:border-brand/50"
              >
                <Mail aria-hidden className="size-4 shrink-0" />
                <span className="truncate">{CONTACT.email}</span>
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
