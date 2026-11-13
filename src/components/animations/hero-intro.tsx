"use client";

import { useRef, type ReactNode } from "react";

import { EASE_ENTER, MOTION_OK, gsap, useGSAP } from "@/components/animations/gsap";

// Le contenu est rendu visible côté serveur : l'intro ne fait que le rejouer à l'hydratation,
// en transform et opacity, et jamais sur la boîte du H1 lui-même.
export function HeroIntro({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: EASE_ENTER } })
          .from("[data-hero-letter]", { yPercent: 105, duration: 1.1, stagger: 0.04 })
          .from("[data-hero-photo]", { y: 48, scale: 0.94, opacity: 0, duration: 1.3 }, 0.1)
          .from("[data-hero-reveal]", { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.3);

        // Profondeur au scroll : la photo glisse dans son cadre, le halo et le texte dérivent.
        const scrub = { trigger: scope.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-parallax]", { yPercent: 8, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-glow]", { yPercent: 25, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-copy]", { y: -80, ease: "none", scrollTrigger: scrub });
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
