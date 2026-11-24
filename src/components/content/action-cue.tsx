import type { ReactNode } from "react";

import type { Collection } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Libellé de l'appel qui mène à une entrée, selon sa collection. */
export const ENTRY_ACTION: Record<Collection, string> = {
  projets: "Voir la fiche",
  veille: "Lire l'article",
};

// Appel d'une carte ou d'une ligne cliquable : le libellé, puis une flèche qui avance quand la
// carte est survolée ou ciblée au clavier. Le lien parent porte `group/card`. La flèche est
// décorative : le lien n'est pas nommé par elle.
export function ActionCue({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-[0.35em] text-action whitespace-nowrap", className)}>
      {children}
      <span
        aria-hidden
        className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-poster group-hover/card:translate-x-1 group-focus-visible/card:translate-x-1"
      >
        →
      </span>
    </span>
  );
}
