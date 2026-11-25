import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { INDEXNOW_KEY, SITE_URL, sitemapLocations, urlsToSubmit } from "../../scripts/indexnow";

const SITEMAP = [
  SITE_URL,
  `${SITE_URL}/projets`,
  `${SITE_URL}/veille`,
  `${SITE_URL}/contact`,
  `${SITE_URL}/projets/homelab`,
  `${SITE_URL}/veille/article`,
  `${SITE_URL}/cv/yanis-harrat-cv.pdf`,
];

describe("IndexNow", () => {
  it("signale une fiche de veille, sa liste, et rien d'autre", () => {
    expect(urlsToSubmit(["src/content/veille/article.mdx"], SITEMAP)).toEqual([
      `${SITE_URL}/veille/article`,
      `${SITE_URL}/veille`,
    ]);
  });

  it("signale aussi l'accueil pour une fiche projet, qui peut y être à la une", () => {
    expect(urlsToSubmit(["src/content/projets/homelab.mdx"], SITEMAP)).toEqual([
      `${SITE_URL}/projets/homelab`,
      `${SITE_URL}/projets`,
      SITE_URL,
    ]);
  });

  it("signale tout le sitemap quand un fichier du site change", () => {
    expect(urlsToSubmit(["src/app/globals.css", "tests/unit/x.test.ts"], SITEMAP)).toEqual(SITEMAP);
  });

  it("ne signale rien pour la documentation, les tests ou la CI", () => {
    expect(
      urlsToSubmit(["aidd_docs/memory/testing.md", "tests/e2e/site.spec.ts", ".github/workflows/ci.yml"], SITEMAP),
    ).toEqual([]);
  });

  it("n'envoie pas une fiche supprimée, absente du sitemap en ligne", () => {
    expect(urlsToSubmit(["src/content/veille/supprimee.mdx"], SITEMAP)).toEqual([`${SITE_URL}/veille`]);
  });

  it("lit les adresses d'un sitemap", () => {
    const xml = `<urlset><url><loc>${SITE_URL}</loc></url><url><loc>${SITE_URL}/projets</loc></url></urlset>`;
    expect(sitemapLocations(xml)).toEqual([SITE_URL, `${SITE_URL}/projets`]);
  });

  it("sert la clé à la racine du site, comme l'exige IndexNow", () => {
    const file = path.join(import.meta.dirname, "../../public", `${INDEXNOW_KEY}.txt`);
    expect(readFileSync(file, "utf8")).toBe(INDEXNOW_KEY);
  });
});
