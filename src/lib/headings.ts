// Plan d'une fiche MDX, lu dans sa source : intertitres (`##`) et temps de lecture.
// Fonctions pures, partagées par le sommaire et par les `h2` rendus (`mdx-components.tsx`).

export type Heading = { id: string; text: string };

const WORDS_PER_MINUTE = 200;

/** Ancre d'un intertitre : minuscules, sans accents, mots reliés par des tirets. */
export function headingId(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Texte brut d'une ligne Markdown : sans liens, emphase ni code en ligne. */
function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

/** Corps de la fiche, sans le bloc `export const metadata` ni les blocs de code. */
function body(source: string): string {
  return source
    .replace(/^export const metadata = \{[\s\S]*?^\};?$/m, "")
    .replace(/^```[\s\S]*?^```$/gm, "");
}

export function extractHeadings(source: string): Heading[] {
  return [...body(source).matchAll(/^## (.+)$/gm)].map(([, raw]) => {
    const text = plainText(raw);
    return { id: headingId(text), text };
  });
}

export function readingMinutes(source: string): number {
  const words = body(source).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
