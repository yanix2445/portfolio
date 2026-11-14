import { CONTACT, CV_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";

import s from "./home.styles";

// La fin : l'appel à rejoindre une équipe, avec les trois moyens de contact.
export function FinaleSection() {
  return (
    <section aria-labelledby="finale-title" className={s.end} data-reveal-group>
      <div>
        <p className={cn(s.label, s.sectionLabel)}>Prochain rôle</p>
        <h2 id="finale-title" aria-label="Dans votre équipe." className={cn(s.poster, s.endTitle)}>
          <span aria-hidden data-reveal="finale">
            Dans votre
          </span>
          <span aria-hidden className={s.endOutline} data-reveal="finale">
            équipe.
          </span>
        </h2>
        <div className={s.btns}>
          <a href={`tel:${CONTACT.phoneE164}`} className={cn(s.btn, s.btnHot)} data-reveal="button">
            Appeler · {CONTACT.phone}
          </a>
          <a href={`mailto:${CONTACT.email}`} className={cn(s.btn, s.btnGhost)} data-reveal="button">
            Écrire un e-mail
          </a>
          <a
            href={CV_PATH}
            target="_blank"
            rel="noopener"
            className={cn(s.btn, s.btnGhost)}
            data-reveal="button"
          >
            CV (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
