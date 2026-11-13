"use client";

import { useRef, type ReactNode } from "react";

import { EASE_ENTER, MOTION_OK, gsap, useGSAP } from "@/components/animations/gsap";

const DESKTOP = `(min-width: 768px) and ${MOTION_OK}`;
const MOBILE = `(max-width: 767px) and ${MOTION_OK}`;

// Desktop : la section est épinglée et le parcours défile horizontalement au scroll.
// Mobile : simple révélation verticale. Moins de mouvement : grille statique, rien d'épinglé.
export function TimelineScroll({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      const track = root?.querySelector<HTMLElement>("[data-timeline-track]");
      if (!root || !track) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      const cards = items.filter((item) => track.contains(item));
      const others = items.filter((item) => !track.contains(item));
      const mm = gsap.matchMedia();

      mm.add(MOBILE, () => {
        for (const item of items) {
          gsap.from(item, {
            opacity: 0,
            y: 48,
            duration: 1,
            ease: EASE_ENTER,
            scrollTrigger: { trigger: item, start: "top 90%", once: true },
          });
        }
      });

      mm.add(DESKTOP, () => {
        // Bascule la mise en page en rangée horizontale avant de mesurer
        // (variante Tailwind `data-horizontal` de shadcn : [data-orientation="horizontal"]).
        root.dataset.orientation = "horizontal";
        const distance = () => Math.max(0, track.scrollWidth - root.clientWidth);
        const pinned = {
          trigger: root,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        };

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { ...pinned, pin: true, anticipatePin: 1 },
        });
        gsap.fromTo(
          "[data-timeline-progress]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: pinned },
        );

        for (const item of others) {
          gsap.from(item, {
            opacity: 0,
            y: 48,
            duration: 1,
            ease: EASE_ENTER,
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          });
        }
        // Chaque étape se pose quand elle entre par la droite.
        for (const card of cards) {
          gsap.from(card, {
            opacity: 0.2,
            yPercent: 14,
            rotate: 2,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: slide,
              start: "left 95%",
              end: "left 65%",
              scrub: true,
            },
          });
        }

        return () => {
          delete root.dataset.orientation;
        };
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
