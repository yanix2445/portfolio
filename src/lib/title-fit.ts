import type { CSSProperties } from "react";

// Les titres en grandes lettres ne coupent jamais un mot : quand le mot le plus long ne tient
// pas sur une ligne, c'est la taille du titre qui diminue. La largeur d'un mot se calcule avec
// les chasses de Big Shoulders en graisse 900 (millièmes de cadratin), mesurées dans le navigateur.
// prettier-ignore
const ADVANCES: Record<string, number> = {
  "0": 526, "1": 289, "2": 505, "3": 509, "4": 534, "5": 526, "6": 518, "7": 490, "8": 520, "9": 518,
  A: 512, B: 502, C: 515, D: 519, E: 442, F: 434, G: 520, H: 523, I: 249, J: 484, K: 523, L: 410,
  M: 839, N: 615, O: 526, P: 504, Q: 526, R: 505, S: 506, T: 436, U: 525, V: 522, W: 862, X: 482,
  Y: 464, Z: 432, À: 512, Â: 512, Ä: 512, Ç: 515, É: 442, È: 442, Ê: 442, Ë: 442, Î: 249, Ï: 249,
  Ô: 526, Ö: 526, Ù: 525, Û: 525, Ü: 525, Ÿ: 464, Æ: 735, Œ: 729, "&": 638, "[": 375, "]": 375,
  "(": 311, ")": 292, "'": 214, "’": 270, "?": 517, "!": 269, ":": 269, ";": 279, ",": 270,
  ".": 250, "-": 465, "‑": 465, "/": 429, "+": 555, "#": 755, "@": 743, '"': 422, "«": 416,
  "»": 388,
};

/** Chasse d'un caractère inconnu de la table : large, pour ne jamais sous-estimer. */
const FALLBACK = 640;

/** Marge pour l'approche, le crénage et l'arrondi du navigateur. */
const SAFETY = 1.04;

/** Largeur, en cadratins, du mot le plus long d'un titre affiché en capitales. */
export function longestWordEm(title: string): number {
  return Math.max(
    ...title
      .toLocaleUpperCase("fr")
      .split(/[\s ]+/)
      .map((word) => [...word].reduce((sum, char) => sum + (ADVANCES[char] ?? FALLBACK), 0) / 1000),
  );
}

type DisplaySize = "display-poster" | "display-title";

/**
 * Taille d'un titre : celle du token, réduite si besoin pour que le mot le plus long tienne
 * dans la largeur du conteneur. Le parent du titre doit être un conteneur (`@container`).
 */
export function fitTitle(title: string, size: DisplaySize): CSSProperties {
  const em = longestWordEm(title) * SAFETY;
  return { fontSize: `min(var(--fs-${size}), calc(100cqi / ${em.toFixed(3)}))` };
}
