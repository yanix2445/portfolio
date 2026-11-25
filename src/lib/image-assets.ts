import "server-only";

import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { cacheLife } from "next/cache";

// Ce que les images générées au build (partage, icônes) lisent sur le disque. Mis en cache
// comme le contenu : sans cela, la lecture des fichiers rendrait chaque image à la demande au
// lieu de la générer une fois au build.

// `next/og` ne lit pas le woff2 : ce sont des copies statiques en TTF, limitées au latin,
// tirées des polices variables de `src/app/fonts/`.
const FONTS = [
  { name: "Big Shoulders", file: "big-shoulders-black.ttf", weight: 900 },
  { name: "Hanken Grotesk", file: "hanken-grotesk-regular.ttf", weight: 400 },
  { name: "Geist Mono", file: "geist-mono-medium.ttf", weight: 500 },
] as const;

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

const IMAGE_TYPE: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

/**
 * Une image de `public/` (chemin public, `/images/…`) en data URL : `next/og` ne lit pas les
 * fichiers locaux. JPEG ou PNG seulement, les formats que `next/og` décode.
 */
export async function publicImage(src: string) {
  "use cache";
  cacheLife("max");
  const type = IMAGE_TYPE[extname(src).toLowerCase()];
  if (!type) throw new Error(`Image de partage : format non pris en charge (${src}), JPEG ou PNG.`);
  const data = await readFile(join(process.cwd(), "public", src));
  return `data:${type};base64,${data.toString("base64")}`;
}
