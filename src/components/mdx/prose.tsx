import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

// Corps d'un article MDX : intertitres en lettrage d'affiche, texte courant en grotesque,
// liens soulignés à l'accent. Les couleurs viennent du thème (`prose-theme`).
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "prose max-w-[68ch] prose-invert prose-theme text-body leading-[1.65]",
        "prose-h2:mt-[1.6em] prose-h2:mb-[0.5em] prose-h2:pt-[0.1em] prose-h2:font-display prose-h2:text-display-sm prose-h2:font-black prose-h2:tracking-[-0.005em] prose-h2:uppercase",
        "prose-h3:mt-[1.6em] prose-h3:mb-[0.4em] prose-h3:text-lead prose-h3:font-semibold",
        "prose-a:decoration-primary prose-a:decoration-1 prose-a:underline-offset-[0.2em] prose-a:transition-colors prose-a:hover:text-primary",
        "prose-strong:font-semibold",
        "prose-li:my-[0.35em] prose-li:marker:text-primary",
        "prose-code:rounded-sm prose-code:bg-secondary prose-code:px-[0.3em] prose-code:py-[0.1em] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        "[&>:first-child]:mt-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
