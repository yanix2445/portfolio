"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { useState, type FocusEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const LIFT = {
  rest: { transform: "translateY(0px)" },
  active: { transform: "translateY(-6px)" },
};

const GLOW = {
  rest: { opacity: 0 },
  active: { opacity: 1 },
};

// Micro-interaction : la carte se soulève et s'éclaire d'ambre au survol (souris) ou au focus.
// Jamais posée sur un élément animé par GSAP : l'enveloppe révélée au scroll est son parent.
export function MotionCard({ children, className }: { children: ReactNode; className?: string }) {
  const [focused, setFocused] = useState(false);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.25, ease: EASE_OUT }}>
      <LazyMotion features={domAnimation} strict>
        <m.div
          className={cn("relative flex w-full", className)}
          initial={false}
          animate={focused ? "active" : "rest"}
          whileHover="active"
          variants={LIFT}
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
      </LazyMotion>
    </MotionConfig>
  );
}
