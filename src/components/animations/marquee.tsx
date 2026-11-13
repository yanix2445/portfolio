"use client";

import { Pause, Play } from "lucide-react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

// Bande en défilement continu (animation CSS, hors du thread principal), en pause au survol,
// au focus ou via le bouton. Avec moins de mouvement : grille multi-lignes, copie masquée.
export function Marquee({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div className={cn("group/marquee", className)} data-paused={paused || undefined}>
      <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:mask-none">
        <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] group-data-paused/marquee:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none">
          <ul
            aria-label={label}
            className="flex shrink-0 gap-3 pr-3 motion-reduce:mx-auto motion-reduce:max-w-5xl motion-reduce:flex-wrap motion-reduce:px-4"
          >
            {children}
          </ul>
          {/* Copie pour boucler sans couture, ignorée des lecteurs d'écran. */}
          <ul aria-hidden className="flex shrink-0 gap-3 pr-3 motion-reduce:hidden">
            {children}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-6 flex w-full max-w-5xl justify-end px-4 motion-reduce:hidden">
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          {paused ? <Play aria-hidden className="size-3" /> : <Pause aria-hidden className="size-3" />}
          {paused ? "Reprendre le défilement" : "Mettre en pause le défilement"}
        </button>
      </div>
    </div>
  );
}
