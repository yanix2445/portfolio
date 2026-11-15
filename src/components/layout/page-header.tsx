import type { ReactNode } from "react";

type PageHeaderProps = {
  /** Identifiant du titre, pour `aria-labelledby` sur la section de la page. */
  id: string;
  title: string;
  /** Légende au-dessus du titre. */
  kicker?: string;
  children: ReactNode;
};

// En-tête des pages intérieures : titre en lettrage d'affiche et phrase d'introduction.
export function PageHeader({ id, title, kicker, children }: PageHeaderProps) {
  return (
    <header>
      {kicker ? <p className="type-label mb-[1.6vh] text-primary">{kicker}</p> : null}
      <h1 id={id} className="type-poster pt-[0.1em] text-display-xl">
        {title}
      </h1>
      <p className="mt-[3vh] max-w-[44ch] text-body text-soft">{children}</p>
    </header>
  );
}
