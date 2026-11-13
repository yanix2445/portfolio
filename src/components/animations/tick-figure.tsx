"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 900;

/*
 * Chiffre qui défile une seule fois, de 0 à sa valeur, quand il entre à l'écran.
 * Le HTML serveur porte la valeur finale : sans JavaScript, en mouvement réduit
 * ou si le chiffre est déjà visible à l'hydratation, rien ne bouge.
 */
export function TickFigure({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let firstReport = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (firstReport) {
          firstReport = false;
          if (entry.isIntersecting) {
            observer.disconnect();
            return;
          }
          setDisplay(0);
          return;
        }
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplay(Math.round(eased * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="relative inline-block">
      {/* Réserve la largeur finale : le compteur ne décale rien autour de lui. */}
      <span aria-hidden className="invisible">
        {value}
      </span>
      <span aria-hidden className="absolute inset-y-0 right-0">
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
