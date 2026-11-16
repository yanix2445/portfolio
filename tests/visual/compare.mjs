// Compare deux jeux de captures et liste les images qui diffèrent.
// Usage : node tests/visual/compare.mjs <référence> <candidat> [part de pixels tolérée, en %]
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { chromium } from "@playwright/test";

const [reference, candidate, tolerance = "0.02"] = process.argv.slice(2);
if (!reference || !candidate) throw new Error("Usage : compare.mjs <référence> <candidat> [tolérance %]");

const names = readdirSync(reference).filter((file) => file.endsWith(".png")).sort();
const browser = await chromium.launch();
const page = await browser.newPage();

// Le navigateur décode les deux images et compte les pixels qui s'écartent nettement.
async function diff(name) {
  let other;
  try {
    other = readFileSync(join(candidate, name)).toString("base64");
  } catch {
    return { name, missing: true };
  }
  const first = readFileSync(join(reference, name)).toString("base64");
  return page.evaluate(
    async ([name, a, b]) => {
      const load = async (data) => {
        const image = new Image();
        image.src = `data:image/png;base64,${data}`;
        await image.decode();
        const canvas = new OffscreenCanvas(image.width, image.height);
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height);
      };
      const [left, right] = await Promise.all([load(a), load(b)]);
      if (left.width !== right.width || left.height !== right.height) {
        return { name, size: `${left.width}×${left.height} → ${right.width}×${right.height}` };
      }
      let changed = 0;
      for (let index = 0; index < left.data.length; index += 4) {
        const delta =
          Math.abs(left.data[index] - right.data[index]) +
          Math.abs(left.data[index + 1] - right.data[index + 1]) +
          Math.abs(left.data[index + 2] - right.data[index + 2]);
        if (delta > 24) changed++;
      }
      return { name, changed: (100 * changed) / (left.width * left.height) };
    },
    [name, first, other],
  );
}

const results = [];
for (const name of names) results.push(await diff(name));
await browser.close();

// Pendant le défilement horizontal, le numéro en contour glisse au sous-pixel : son filet
// ne retombe jamais exactement sur les mêmes pixels d'une capture à l'autre.
const NOISY = [{ pattern: /-accueil-actes-\d+\.png$/, tolerance: 0.8 }];
const allowed = (name) =>
  NOISY.find(({ pattern }) => pattern.test(name))?.tolerance ?? Number(tolerance);

const failures = results.filter(
  (result) => result.missing || result.size || result.changed > allowed(result.name),
);
for (const failure of failures) {
  const reason = failure.missing ? "absente" : (failure.size ?? `${failure.changed.toFixed(3)} % de pixels`);
  console.log(`✘ ${failure.name} : ${reason}`);
}
console.log(`${names.length - failures.length} / ${names.length} captures identiques (tolérance ${tolerance} %)`);
process.exit(failures.length ? 1 : 0);
