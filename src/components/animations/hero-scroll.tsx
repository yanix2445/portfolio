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

      // Les états de départ sont posés d'un coup, puis chaque élément rejoint sa place :
      // rien ne reste affiché pour disparaître ensuite.
      mm.add(MOTION_OK, () => {
        if (performance.now() > INTRO_MAX_DELAY_MS) return;
        gsap.set("[data-hero-photo]", { scale: 1.12, opacity: 0 });
        gsap.set("[data-hero-line]", { yPercent: 108 });
        gsap.set("[data-hero-kicker]", { opacity: 0, y: 14 });
        gsap.set("[data-hero-slate]", { opacity: 0, y: 14 });
        gsap.set("[data-hero-cue]", { opacity: 0 });
        // Court : la phrase et les appels à l'action sont là avant une seconde. Les liens
        // restent cliquables pendant l'entrée (seules l'opacité et la position bougent).
        gsap
          .timeline({ defaults: { ease: EASE_ENTER } })
          .to("[data-hero-photo]", { scale: 1, opacity: 1, duration: 1.6, ease: "power3.out" }, 0)
          .to("[data-hero-line]", { yPercent: 0, duration: 1.1, stagger: 0.1 }, 0.1)
          .to("[data-hero-kicker]", { opacity: 1, y: 0, duration: 0.7 }, 0.35)
          .to("[data-hero-slate]", { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }, 0.45)
          .to("[data-hero-cue]", { opacity: 1, duration: 0.8 }, 0.9);
      });

      // Grand écran : la photo se range en affiche à droite, le nom rétrécit, le synopsis arrive.
      mm.add(WIDE, () => {
        const ease = "power2.inOut";
        const hero = scope.current?.querySelector<HTMLElement>("[data-hero]");
        const photo = scope.current?.querySelector<HTMLElement>("[data-hero-photo]");
        const flow = scope.current?.querySelector<HTMLElement>("[data-hero-synopsis-flow]");
        const band = scope.current?.querySelector<HTMLElement>("[data-hero-band]");
        if (!hero || !photo || !flow || !band) return;
        // Le cadre final de la photo s'arrête au-dessus du bandeau des appels à l'action,
        // même sur un écran bas où 17vh ne suffiraient pas.
        const frameTop = () => 0.13 * innerHeight;
        const frameBottom = () =>
          Math.max(0.17 * innerHeight, hero.offsetHeight - band.offsetTop + 0.02 * innerHeight);
        // Les couleurs et le rayon viennent du thème : rien n'est écrit en dur ici.
        const theme = getComputedStyle(document.documentElement);
        const rem = parseFloat(theme.fontSize);
        // Même rayon que les affiches de projet (`rounded-2xl`, soit 1,8 × `--radius`).
        const frameRadius = parseFloat(theme.getPropertyValue("--radius")) * 1.8 * rem;
        gsap.set("[data-hero-synopsis]", { display: "block", opacity: 0 });
        // La copie du flux quitte l'écran mais reste lue par les lecteurs d'écran.
        flow.classList.add("sr-only");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "[data-hero]",
              start: "top top",
              end: "+=170%",
              pin: true,
              scrub: 0.7,
              // Les cotes de la photo sont recalculées à chaque redimensionnement.
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            "[data-hero-plate]",
            { clipPath: "inset(0vh 0vw 0vh 0vw round 0px)" },
            {
              clipPath: () => `inset(13vh 3.4vw ${frameBottom()}px 60vw round ${frameRadius}px)`,
              ease,
              duration: 1,
            },
            0,
          )
          // Le haut de la photo se cale sur le haut du cadre : la tête reste entière,
          // c'est le buste qui est rogné.
          .fromTo(
            "[data-hero-photo]",
            // Départ : le cadre CSS de la photo, relu à chaque redimensionnement.
            {
              width: () => 0.66 * hero.clientWidth,
              height: () => hero.offsetHeight,
              top: 0,
              right: 0,
              objectPosition: () =>
                `50% ${getComputedStyle(hero).getPropertyValue("--portrait-y").trim()}`,
            },
            {
              width: "36.6vw",
              right: "3.4vw",
              top: "13vh",
              height: () => hero.offsetHeight - frameTop() - frameBottom(),
              objectPosition: "50% 0%",
              ease,
              duration: 1,
            },
            0,
          )
          .to("[data-hero-shade]", { opacity: 0, ease, duration: 0.8 }, 0)
          .to("[data-hero-title]", { scale: 0.44, ease, duration: 1 }, 0)
          .to("[data-hero-fill]", { color: theme.getPropertyValue("--foreground").trim(), duration: 0.5 }, 0.5)
          // `filter` et non `opacity` : l'intro anime déjà l'opacité de ces deux éléments,
          // et elle peut encore être en cours au premier défilement.
          .fromTo(
            "[data-hero-kicker], [data-hero-cue]",
            { filter: "opacity(1)" },
            { filter: "opacity(0)", duration: 0.25, immediateRender: false },
            0,
          )
          .fromTo(
            "[data-hero-synopsis]",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.45 },
            0.55,
          )
          .to({}, { duration: 0.35 });

        // En repassant sur petit écran, la photo retrouve exactement son cadre CSS.
        return () => {
          flow.classList.remove("sr-only");
          for (const property of ["width", "height", "top", "right", "object-position"]) {
            photo.style.removeProperty(property);
          }
        };
      });

      // Les polices changent les hauteurs : on recalcule les repères une fois chargées.
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
