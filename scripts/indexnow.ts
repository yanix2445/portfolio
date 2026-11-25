// Prévient Bing (et les autres moteurs IndexNow) des pages changées par un déploiement de
// production, au lieu d'attendre leur prochain passage. Lancé par `.github/workflows/indexnow.yml`
// quand Vercel signale la production prête : `node scripts/indexnow.ts <sha>`.
//
// Les pages à signaler se déduisent des fichiers changés par le commit (le merge d'une PR) :
// une fiche MDX signale sa page et sa liste, un fichier du site signale tout le sitemap, la
// documentation et les tests ne signalent rien. Seules les adresses du sitemap en ligne partent.

import { execFileSync } from "node:child_process";
import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const SITE_URL = "https://yanis-harrat.com";
/** Clé publique par conception : servie à la racine du site, dans `public/<clé>.txt`. */
export const INDEXNOW_KEY = "982eabcdc8e1c5efe82e287b2b481f6a";
const ENDPOINT = "https://api.indexnow.org/indexnow";

/** Fichiers sans effet sur les pages servies. */
const IGNORED = [/^aidd_docs\//, /^tests\//, /^\.github\//, /^\.claude\//, /^scripts\//, /\.md$/];
const ENTRY = /^src\/content\/(projets|veille)\/([^/]+)\.mdx$/;

/** Les adresses du sitemap à signaler, d'après les fichiers changés. */
export function urlsToSubmit(changedFiles: readonly string[], sitemapUrls: readonly string[]): string[] {
  const live = new Set(sitemapUrls);
  const picked = new Set<string>();

  for (const file of changedFiles) {
    if (IGNORED.some((pattern) => pattern.test(file))) continue;

    const entry = ENTRY.exec(file);
    if (entry) {
      const [, collection, slug] = entry;
      picked.add(`${SITE_URL}/${collection}/${slug}`);
      picked.add(`${SITE_URL}/${collection}`);
      // L'accueil affiche les projets à la une.
      if (collection === "projets") picked.add(SITE_URL);
      continue;
    }

    if (file.startsWith("public/cv/")) {
      picked.add(`${SITE_URL}/cv/yanis-harrat-cv.pdf`);
      continue;
    }

    // Tout autre fichier (composants, styles, configuration, dépendances) peut changer
    // chaque page : on signale tout le sitemap.
    return [...live];
  }

  return [...picked].filter((url) => live.has(url));
}

/** Les adresses `<loc>` d'un sitemap XML. */
export function sitemapLocations(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url.trim());
}

async function main(sha: string) {
  const changedFiles = execFileSync("git", ["diff", "--name-only", `${sha}^1`, sha], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean);
  const sitemap = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!sitemap.ok) throw new Error(`Sitemap illisible : HTTP ${sitemap.status}`);

  const urlList = urlsToSubmit(changedFiles, sitemapLocations(await sitemap.text()));
  if (urlList.length === 0) {
    console.log("Aucune page servie n'a changé : rien à signaler.");
    return;
  }

  // `INDEXNOW_DRY_RUN=1` : affiche la liste sans rien envoyer (essai en local).
  if (process.env.INDEXNOW_DRY_RUN) {
    console.log(`Essai, rien n'est envoyé. ${urlList.length} page(s) :\n  ${urlList.join("\n  ")}`);
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });
  // 200 : reçu ; 202 : reçu, clé en cours de vérification.
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow a refusé l'envoi : HTTP ${response.status} ${await response.text()}`);
  }
  console.log(`IndexNow : ${urlList.length} page(s) signalée(s) (HTTP ${response.status}).`);
  for (const url of urlList) console.log(`  ${url}`);
}

const isCli = process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const sha = process.argv[2];
  if (!sha) throw new Error("Usage : node scripts/indexnow.ts <sha>");
  await main(sha);
}
