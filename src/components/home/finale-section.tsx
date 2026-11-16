import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CONTACT, CV_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";

// Une phrase, trois lignes d'affiche. La dernière, en orange, garde une marge haute :
// l'accent de « équipe » ne touche pas la ligne du dessus.
const LINES = [
  { text: "Mon prochain rôle" },
  { text: "se joue dans" },
  { text: "votre équipe.", accent: true },
] as const;

// La fin : l'appel à rejoindre une équipe : appeler, proposer une alternance, lire le CV.
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
        <div className="mt-[6vh] flex flex-wrap justify-center gap-2.5 md:gap-[1vw]">
          <Button asChild size="xl" data-reveal="button">
            <a href={`tel:${CONTACT.phoneE164}`}>Appeler · {CONTACT.phone}</a>
          </Button>
          {/* Ouvre le formulaire avec le motif « Alternance » déjà choisi. L'e-mail reste
              dans le pied de page. */}
          <Button asChild variant="outline" size="xl" data-reveal="button">
            <Link href="/contact?motif=alternance">Proposer une alternance</Link>
          </Button>
          <Button asChild variant="outline" size="xl" data-reveal="button">
            <a href={CV_PATH} target="_blank" rel="noopener">
              CV (PDF)
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
