"use client";

import { useEffect, useState } from "react";

import type { Heading } from "@/lib/headings";

/** Ligne de lecture : un intertitre passé au-dessus de 35 % de l'écran devient la séquence en cours. */
const READING_LINE = 0.35;

// Sommaire d'une fiche : les intertitres numérotés comme des séquences. La séquence en cours
// passe à l'accent ; sans JavaScript, le sommaire reste une simple liste d'ancres.
export function SequenceNav({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = headings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    let frame = 0;

    const update = () => {
      frame = 0;
      const root = document.documentElement;
      // En bas de page, le dernier intertitre peut ne jamais atteindre la ligne de lecture.
      if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) {
        setActive(targets.at(-1)?.id ?? null);
        return;
      }
      const line = window.innerHeight * READING_LINE;
      const passed = targets.filter((element) => element.getBoundingClientRect().top <= line);
      setActive(passed.at(-1)?.id ?? null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [headings]);

  return (
    <nav aria-labelledby="sequences-title">
      <p id="sequences-title" className="type-label text-muted-foreground">
        Séquences
      </p>
      {/* Au-dessus du texte (tablette), la liste tient sur deux colonnes ; à côté du texte, une seule. */}
      <ol className="mt-5 border-b border-border md:mt-[2.6vh] md:columns-2 md:gap-x-[4vw] lg:columns-1">
        {headings.map(({ id, text }, index) => (
          <li key={id} className="break-inside-avoid border-t border-border">
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className="group/sequence grid grid-cols-[2.75rem_1fr] items-baseline gap-3 py-3 text-body-sm text-soft transition-colors hover:text-foreground aria-[current=location]:text-primary md:py-[1.5vh]"
            >
              <span className="type-label text-muted-foreground transition-colors group-aria-[current=location]/sequence:text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
