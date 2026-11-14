"use client";

import { useRef, type ReactNode } from "react";

import { EASE_ENTER, MOTION_OK, ScrollTrigger, WIDE, gsap, useGSAP } from "@/components/animations/gsap";

// Au-delà de ce délai, le nom est déjà lu : on ne le fait pas disparaître pour le rejouer.
const INTRO_MAX_DELAY_MS = 1500;

// Ouverture de l'accueil. Le contenu est visible dès le rendu serveur :
// tous les états de départ sont posés ici, jamais en CSS.
export function HeroScroll({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        if (performance.now() > INTRO_MAX_DELAY_MS) return;
        gsap
          .timeline({ defaults: { ease: EASE_ENTER } })
          .from("[data-hero-photo]", { scale: 1.22, opacity: 0, duration: 2.2, ease: "power3.out" }, 0)
          .from("[data-hero-line]", { yPercent: 108, duration: 1.5, stagger: 0.12 }, 0.25)
          .from("[data-hero-kicker]", { opacity: 0, x: -20, duration: 1 }, 0.9)
          .from("[data-hero-slate]", { opacity: 0, y: 18, duration: 0.9, stagger: 0.07 }, 1)
          .from("[data-hero-cue]", { opacity: 0, duration: 1 }, 1.2);
      });

      // Grand écran : la photo se range en affiche à droite, le nom rétrécit, le synopsis arrive.
      mm.add(WIDE, () => {
        const ease = "power2.inOut";
        gsap.set("[data-hero-synopsis]", { display: "block", opacity: 0 });
        gsap.set("[data-hero-synopsis-flow]", { display: "none" });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "[data-hero]",
              start: "top top",
              end: "+=170%",
              pin: true,
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            "[data-hero-plate]",
            { clipPath: "inset(0vh 0vw 0vh 0vw round 0vw)" },
            { clipPath: "inset(13vh 3.4vw 17vh 60vw round 1.1vw)", ease, duration: 1 },
            0,
          )
          // Le haut de la photo se cale sur le haut du cadre : la tête reste entière,
          // c'est le buste qui est rogné.
          .to(
            "[data-hero-photo]",
            {
              width: "36.6vw",
              right: "3.4vw",
              top: "13vh",
              height: "70vh",
              objectPosition: "50% 0%",
              ease,
              duration: 1,
            },
            0,
          )
          .to("[data-hero-shade]", { opacity: 0, ease, duration: 0.8 }, 0)
          .to("[data-hero-title]", { scale: 0.44, ease, duration: 1 }, 0)
          .to("[data-hero-fill]", { color: "#f2ebdd", duration: 0.5 }, 0.5)
          .to("[data-hero-kicker], [data-hero-cue]", { autoAlpha: 0, duration: 0.25 }, 0)
          .fromTo(
            "[data-hero-synopsis]",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.45 },
            0.55,
          )
          .to({}, { duration: 0.35 });
      });

      // Les polices changent les hauteurs : on recalcule les repères une fois chargées.
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
