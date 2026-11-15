"use client";

import { useRef, type ReactNode } from "react";

import { EASE_ENTER, NARROW, WIDE, gsap, useGSAP } from "@/components/animations/gsap";

// Grand écran : la section est épinglée et les actes défilent à l'horizontale.
// Petit écran : les actes restent en colonne et apparaissent un à un.
// Moins de mouvement : rien ne tourne, les actes restent en colonne.
export function ActsScroll({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current?.querySelector<HTMLElement>("[data-acts]");
      const track = root?.querySelector<HTMLElement>("[data-acts-track]");
      if (!root || !track) return;

      const acts = gsap.utils.toArray<HTMLElement>("[data-act]", root);
      const count = root.querySelector<HTMLElement>("[data-acts-count]");
      const progress = root.querySelector<HTMLElement>("[data-acts-progress]");
      const mm = gsap.matchMedia();

      mm.add(WIDE, () => {
        // La mise en rangée est posée avant toute mesure.
        root.dataset.orientation = "horizontal";
        if (progress) gsap.set(progress, { scaleX: 0 });
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress) gsap.set(progress, { scaleX: self.progress });
              if (count) {
                const current = 1 + Math.round(self.progress * (acts.length - 1));
                count.textContent = `Acte ${current} / ${acts.length}`;
              }
            },
          },
        });

        for (const [index, act] of acts.entries()) {
          gsap.fromTo(
            act.querySelector("[data-act-num]"),
            { xPercent: 24 },
            {
              xPercent: -24,
              ease: "none",
              scrollTrigger: {
                trigger: act,
                containerAnimation: slide,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
          gsap.from(act.querySelectorAll("[data-act-item]"), {
            y: 44,
            opacity: 0,
            duration: 0.9,
            ease: EASE_ENTER,
            stagger: 0.06,
            // Le premier acte est déjà à l'écran quand la section arrive :
            // il se révèle au défilement vertical, les suivants au défilement horizontal.
            scrollTrigger:
              index === 0
                ? { trigger: root, start: "top 55%", toggleActions: "play none none reverse" }
                : {
                    trigger: act,
                    containerAnimation: slide,
                    start: "left 62%",
                    toggleActions: "play none none reverse",
                  },
          });
        }

        return () => {
          delete root.dataset.orientation;
        };
      });

      mm.add(NARROW, () => {
        for (const act of acts) {
          gsap.from(act.querySelectorAll("[data-act-num], [data-act-item]"), {
            y: 36,
            opacity: 0,
            duration: 0.9,
            ease: EASE_ENTER,
            stagger: 0.06,
            scrollTrigger: { trigger: act, start: "top 84%", once: true },
          });
        }
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
