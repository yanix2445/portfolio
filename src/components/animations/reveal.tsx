"use client";

import { useRef, type ReactNode } from "react";

import { EASE_ENTER, MOTION_OK, gsap, useGSAP } from "@/components/animations/gsap";

const POSTER_TILT = [-5, 3, 6];

// Un réglage par type d'élément marqué `data-reveal`.
const PRESETS: Record<string, gsap.TweenVars> = {
  title: { yPercent: 40, opacity: 0, duration: 1.2 },
  poster: {
    y: 140,
    opacity: 0,
    rotate: (index: number) => POSTER_TILT[index % POSTER_TILT.length],
    duration: 1.3,
    stagger: 0.12,
  },
  row: { y: 34, opacity: 0, duration: 0.9, stagger: 0.07 },
  laurel: { scale: 0.82, opacity: 0, duration: 1.1, stagger: 0.1 },
  finale: { yPercent: 60, opacity: 0, duration: 1.3, stagger: 0.12 },
  button: { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 },
};

// Apparition, une seule fois, des éléments marqués dans chaque `data-reveal-group`.
// À la fin, les styles posés par l'animation sont retirés : le CSS (survol) reprend la main.
export function Reveal({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        for (const group of gsap.utils.toArray<HTMLElement>("[data-reveal-group]", scope.current)) {
          for (const [kind, preset] of Object.entries(PRESETS)) {
            const targets = group.querySelectorAll<HTMLElement>(`[data-reveal="${kind}"]`);
            if (targets.length === 0) continue;
            gsap.from(targets, {
              ...preset,
              ease: EASE_ENTER,
              clearProps: "all",
              scrollTrigger: { trigger: targets[0], start: "top 86%", once: true },
            });
          }
        }
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
