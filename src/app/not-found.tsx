import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable",
};

// Même composition qu'un acte de l'accueil : le numéro en contour, le texte à côté.
export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="grid flex-1 content-center items-end gap-6 px-gutter py-16 md:grid-cols-[0.85fr_1.15fr] md:gap-[4vw] md:py-[10vh]"
    >
      <p aria-hidden className="type-poster type-outline-accent text-display-numeral">
        404
      </p>
      <div>
        <h1 id="not-found-title" className="type-poster pt-[0.1em] text-display-fit">
          Page introuvable
        </h1>
        <p className="mt-[3vh] max-w-[44ch] text-body text-soft">
          La page demandée n&apos;existe pas ou a été déplacée.
        </p>
        <Button asChild variant="outline" size="xl" className="mt-[5vh]">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </section>
  );
}
