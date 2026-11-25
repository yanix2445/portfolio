"use client";

import { useEffect, useRef, type KeyboardEvent, type TextareaHTMLAttributes } from "react";

// Part de la largeur de la phrase gardée pour la ponctuation qui suit le blanc.
const PUNCTUATION_EM = 0.4;
// Le texte rapetisse jusqu'à 60 % de la taille de la phrase, puis passe à la ligne.
const MIN_SCALE = 0.6;
// Marge pour que la coupure des mots n'ajoute pas une ligne de trop.
const WRAP_SAFETY = 0.94;

// Un blanc de la phrase à compléter, lisible en entier quelle que soit la longueur saisie :
// il prend la largeur de ce qu'on y tape (au moins celle de son exemple), passe à la ligne de
// la phrase s'il ne tient plus, rapetisse un peu s'il dépasse la largeur de la phrase, puis
// revient à la ligne dans le blanc lui-même. C'est un `textarea` d'une ligne : un `input` ne
// peut pas passer à la ligne. Entrée n'y crée pas de retour à la ligne, un collage non plus.
// Un double invisible, à la même police, sert de mesure.
export function SentenceBlank({
  className,
  onKeyDown,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const field = useRef<HTMLTextAreaElement>(null);
  const mirror = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const blank = field.current;
    const measure = mirror.current;
    if (!blank || !measure) return;
    const sentence = blank.closest<HTMLElement>("[data-contact-sentence]");

    const widthOf = (text: string) => {
      measure.textContent = text;
      return measure.getBoundingClientRect().width;
    };

    const fit = () => {
      // Un collage peut apporter des retours à la ligne : le blanc n'en garde aucun.
      if (/[\r\n]/.test(blank.value)) blank.value = blank.value.replace(/\s*[\r\n]+\s*/g, " ");
      const base = parseFloat(getComputedStyle(measure).fontSize);
      const natural = Math.max(widthOf(blank.value), widthOf(blank.placeholder)) + base * 0.2;
      const available = (sentence?.clientWidth ?? natural) - base * PUNCTUATION_EM;
      // Le moins de lignes possible à 60 % au moins, puis la taille qui remplit ces lignes :
      // le texte ne laisse pas un ou deux caractères seuls sur la dernière ligne.
      const lines = Math.max(1, Math.ceil((natural * MIN_SCALE) / available));
      const scale = Math.min(1, ((available * lines) / natural) * WRAP_SAFETY);
      blank.style.width = `${Math.min(natural, available)}px`;
      blank.style.fontSize = scale < 1 ? `${base * scale}px` : "";
      blank.style.height = "auto";
      blank.style.height = `${blank.scrollHeight}px`;
    };

    fit();
    // Le brouillon de l'onglet remplit les champs juste après le montage, sans événement.
    const frame = requestAnimationFrame(fit);
    blank.addEventListener("input", fit);
    const resize = new ResizeObserver(fit);
    if (sentence) resize.observe(sentence);
    document.fonts?.ready.then(fit);
    return () => {
      cancelAnimationFrame(frame);
      blank.removeEventListener("input", fit);
      resize.disconnect();
    };
  }, []);

  function blockNewline(event: KeyboardEvent<HTMLTextAreaElement>) {
    onKeyDown?.(event);
    if (event.key === "Enter") event.preventDefault();
  }

  return (
    <>
      <textarea ref={field} rows={1} className={className} onKeyDown={blockNewline} {...props} />
      <span
        ref={mirror}
        aria-hidden
        className="pointer-events-none invisible absolute top-0 left-0 px-[0.1em] whitespace-pre normal-case"
      />
    </>
  );
}
