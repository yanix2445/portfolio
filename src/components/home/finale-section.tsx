import Link from "next/link";

import { BookCallLink } from "@/components/contact/book-call-link";
import { Button } from "@/components/ui/button";
import { CV_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";

// Une phrase, trois lignes d'affiche. La dernière, en orange, garde une marge haute :
// l'accent de « équipe » ne touche pas la ligne du dessus.
const LINES = [
  { text: "Mon prochain rôle" },
  { text: "se joue dans" },
  { text: "votre équipe.", accent: true },
] as const;

// La fin : l'appel à rejoindre une équipe. Même action principale que le premier écran
// (proposer une alternance), puis réserver un appel ou lire le CV.
export function FinaleSection() {
  return (
    <section
      aria-labelledby="finale-title"
      className="grid place-items-center border-t border-border px-gutter py-22 text-center md:min-h-svh md:py-[12vh]"
      data-reveal-group
    >
      <div>
        <h2
          id="finale-title"
          aria-label={LINES.map(({ text }) => text).join(" ")}
          className="type-poster text-display-finale"
        >
          {LINES.map((line) => (
            <span
              key={line.text}
              aria-hidden
              className={cn("block", "accent" in line && "mt-[0.13em] text-primary")}
              data-reveal="finale"
            >
              {line.text}
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-[4vh] max-w-[46ch] text-lead text-pretty text-soft" data-reveal="finale">
          Deux ans d&apos;alternance, 3 jours par semaine dans votre équipe, à partir de septembre
          2027. Je réponds sous 48 à 72 h.
        </p>
        <div className="mt-[5vh] flex flex-wrap justify-center gap-2.5 md:gap-[1vw]">
          {/* Ouvre le formulaire avec le motif « Alternance » déjà choisi. L'e-mail reste
              dans le pied de page. */}
          <Button asChild size="xl" data-reveal="button">
            <Link href="/contact?motif=alternance">Proposer une alternance</Link>
          </Button>
          <Button asChild variant="outline" size="xl" data-reveal="button">
            <BookCallLink />
          </Button>
          <Button asChild variant="outline" size="xl" data-reveal="button">
            <a href={CV_PATH} target="_blank" rel="noopener">
              CV
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
