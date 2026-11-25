import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";

// Les polices du site pour les images générées au build (partage, icônes). `next/og` ne lit
// pas le woff2 : ce sont des copies statiques en TTF, limitées au latin, tirées des polices
// variables de `src/app/fonts/`.
const FONTS = [
  { name: "Big Shoulders", file: "big-shoulders-black.ttf", weight: 900 },
  { name: "Hanken Grotesk", file: "hanken-grotesk-regular.ttf", weight: 400 },
  { name: "Geist Mono", file: "geist-mono-medium.ttf", weight: 500 },
] as const;

// Mises en cache comme le contenu : sans cela, la lecture des fichiers rendrait chaque image
// à la demande au lieu de la générer une fois au build.
export async function imageFonts() {
  "use cache";
  cacheLife("max");
  return Promise.all(
    FONTS.map(async ({ name, file, weight }) => ({
      name,
      weight,
      style: "normal" as const,
      data: Uint8Array.from(await readFile(join(process.cwd(), "src/app/fonts/og", file))).buffer,
    })),
  );
}
