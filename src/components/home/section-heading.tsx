import type { ReactNode } from "react";

/** Gouttière commune à l'accueil, alignée sur le header et le footer. */
export const CONTAINER = "mx-auto w-full max-w-5xl px-4";

export function SectionHeading({
  id,
  index,
  title,
  lead,
  action,
}: {
  id: string;
  index: string;
  title: string;
  lead?: string;
  action?: ReactNode;
}) {
  return (
    <div data-reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
      <div className="max-w-2xl">
        <p aria-hidden className="flex items-center gap-3 font-mono text-xs tracking-[0.15em] text-brand">
          {index}
          <span className="h-px w-12 bg-linear-to-r from-brand to-transparent" />
        </p>
        <h2
          id={id}
          className="mt-5 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.9] font-semibold tracking-[-0.045em] text-balance"
        >
          {title}
        </h2>
        {lead ? <p className="mt-5 max-w-lg text-lg text-pretty text-muted-foreground">{lead}</p> : null}
      </div>
      {action}
    </div>
  );
}
