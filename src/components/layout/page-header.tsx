import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  /** Identifiant du titre, pour `aria-labelledby` sur la section de la page. */
  id: string;
  title: string;
  /** Légende au-dessus du titre. */
  kicker?: string;
  /**
   * Page qui doit tenir en un écran : titre borné par la hauteur et, sur grand écran,
   * introduction à côté du titre plutôt que dessous. Sur téléphone, l'introduction n'est
   * lue que par les lecteurs d'écran : la place manque.
   */
  compact?: boolean;
  children: ReactNode;
};

// En-tête des pages intérieures : titre en lettrage d'affiche et phrase d'introduction.
export function PageHeader({ id, title, kicker, compact = false, children }: PageHeaderProps) {
  return (
    <header
      className={cn(compact && "md:grid md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-[6vw]")}
    >
      <div>
        {kicker ? <p className="type-label mb-[1.6vh] text-primary">{kicker}</p> : null}
        <h1
          id={id}
          className={cn("type-poster pt-[0.1em]", compact ? "text-display-fit" : "text-display-xl")}
        >
          {title}
        </h1>
      </div>
      <p className={cn("mt-[3vh] max-w-[44ch] text-body text-soft", compact && "max-md:sr-only md:mt-0")}>
        {children}
      </p>
    </header>
  );
}
