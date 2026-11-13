"use client";

import { useRef, type ReactNode } from "react";

import { EASE_ENTER, MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/components/animations/gsap";

// Révèle en cascade les éléments `[data-reveal]` de son contenu, une seule fois, au scroll.
// Sans JS ou avec moins de mouvement, rien n'est masqué.
export function ScrollReveal({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope.current);
        gsap.set(items, { opacity: 0, y: 56 });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: contextSafe!((batch: Element[]) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: EASE_ENTER, stagger: 0.07 }),
          ),
        });
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
