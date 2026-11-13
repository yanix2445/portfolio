"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Point d'entrée unique : les plugins ne sont enregistrés qu'une fois, côté client.
gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Les animations ne tournent que si le visiteur n'a pas demandé moins de mouvement. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Ease-out appuyé pour les entrées. */
export const EASE_ENTER = "power4.out";

export { gsap, ScrollTrigger, useGSAP };
