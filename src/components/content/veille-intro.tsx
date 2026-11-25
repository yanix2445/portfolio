import { VEILLE } from "@/lib/veille";
import { frenchSpacing } from "@/lib/typography";

// En-tête de `/veille`, compact comme celui de la page Contact : le titre à gauche, le sujet et
// l'objectif à droite sur la même ligne (l'un sous l'autre sur téléphone). Sous un filet, la
// problématique en grand sur toute la largeur, puis la position. Aucune animation.
export function VeilleIntro() {
  const { intro, question, position } = VEILLE;

  return (
    <>
      <header className="md:grid md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-[6vw]">
        <h1 id="veille-title" className="type-poster pt-[0.1em] text-display-xl">
          Veille
        </h1>
        <p className="mt-[3vh] max-w-[46ch] text-body text-soft md:mt-0 md:pb-[1vw]">
          {frenchSpacing(intro)}
        </p>
      </header>

      <section
        aria-label="Présentation de la veille"
        className="mt-10 border-t border-border pt-8 md:mt-[7vh] md:pt-[6vh]"
        data-veille-intro
      >
        {/* La question que la veille instruit : le moment fort de l'en-tête. */}
        <blockquote className="max-w-[38ch] text-synopsis text-balance">
          <p>« {frenchSpacing(question)} »</p>
        </blockquote>
        <p className="mt-6 max-w-[60ch] text-lead md:mt-[4vh]">
          {position.ai} <span className="text-primary">{position.admin}</span>
        </p>
      </section>
    </>
  );
}
