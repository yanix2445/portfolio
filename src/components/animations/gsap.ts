"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Point d'entrée unique : les plugins ne sont enregistrés qu'une fois, côté client.
gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Les animations ne tournent que si le visiteur n'a pas demandé moins de mouvement. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

// Épinglage et défilement horizontal : il faut de la largeur et assez de hauteur pour le hero
// (un téléphone en paysage n'en a pas). Sinon, tout reste en colonne.
// En rem comme le `md:` de Tailwind : la mise en page et l'animation basculent au même endroit.
const ROOMY = "(min-width: 48rem) and (min-height: 35rem)";
export const WIDE = `${ROOMY} and ${MOTION_OK}`;
export const NARROW = `(not (${ROOMY})) and ${MOTION_OK}`;

/** Ease-out appuyé pour les entrées. */
export const EASE_ENTER = "expo.out";

export { gsap, ScrollTrigger, useGSAP };
