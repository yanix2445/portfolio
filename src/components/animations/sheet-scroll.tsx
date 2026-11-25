"use client";

import { useRef, type ReactNode } from "react";

import { WIDE, ScrollTrigger, gsap, useGSAP } from "@/components/animations/gsap";

// Grand écran : le titre de la fiche technique reste en place pendant que les compétences défilent,
// puis repart avec la section quand le bas de la liste le rattrape.
// Petit écran ou moins de mouvement : défilement naturel, une seule colonne.
export function SheetScroll({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = scope.current?.querySelector<HTMLElement>("section");
      const aside = section?.querySelector<HTMLElement>("[data-sheet-aside]");
      const list = section?.querySelector<HTMLElement>("[data-sheet-list]");
      if (!section || !aside || !list) return;

      // Ancré à la hauteur où il se trouve quand la section touche le haut de l'écran : aucun saut au départ.
      const top = () => parseFloat(getComputedStyle(section).paddingTop);

      gsap.matchMedia().add(WIDE, () => {
        ScrollTrigger.create({
          trigger: aside,
          start: () => `top ${top()}px`,
          endTrigger: list,
          // Libéré quand son bas touche celui de la liste : il quitte l'écran avec elle, sans chevauchement.
          end: () => `bottom ${top() + aside.offsetHeight}px`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
