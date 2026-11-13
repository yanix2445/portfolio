"use client";

import { m, useReducedMotion } from "motion/react";
import { useState, type FocusEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const LIFT = {
  rest: { transform: "translateY(0px)" },
  active: { transform: "translateY(-6px)" },
};

const STILL = {
  rest: { transform: "translateY(0px)" },
  active: { transform: "translateY(0px)" },
};

const GLOW = {
  rest: { opacity: 0 },
  active: { opacity: 1 },
};

// Micro-interaction réservée aux cartes cliquables : soulèvement et lueur ambre au survol ou au focus.
// Doit être rendue sous <MotionProvider>. Jamais posée sur un élément animé par GSAP :
// l'enveloppe révélée au scroll est son parent. En mouvement réduit, seule la lueur reste.
export function MotionCard({ children, className }: { children: ReactNode; className?: string }) {
  const [focused, setFocused] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  return (
    <m.div
      className={cn("relative flex w-full", className)}
      initial={false}
      animate={focused ? "active" : "rest"}
      whileHover="active"
      variants={reduceMotion ? STILL : LIFT}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
    >
      <m.span
        aria-hidden
        variants={GLOW}
        className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(120%_90%_at_50%_0%,color-mix(in_oklab,var(--brand)_18%,transparent),transparent_65%)] shadow-[0_0_0_1px_color-mix(in_oklab,var(--brand)_45%,transparent),0_24px_60px_-24px_color-mix(in_oklab,var(--brand)_45%,transparent)]"
      />
      {children}
    </m.div>
  );
}
