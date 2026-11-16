// Captures de référence du site, pour comparer le rendu avant et après une réécriture de styles.
// Usage : node tests/visual/capture.mjs <url de base> <dossier de sortie>
// HIDE=<sélecteur CSS> masque des éléments dont le changement est attendu (un bouton refait, par exemple).
import { mkdirSync, writeFileSync } from "node:fs";

import { chromium } from "@playwright/test";

const [base = "http://127.0.0.1:3100", out = "visual"] = process.argv.slice(2);
mkdirSync(out, { recursive: true });

const VIEWPORTS = { desktop: { width: 1440, height: 900 }, tablet: { width: 768, height: 1024 }, phone: { width: 375, height: 812 } };
const PAGES = { veille: "/veille", contact: "/contact", mentions: "/mentions-legales", introuvable: "/page-inconnue" };

// Quatre captures identiques à la suite : plus rien ne bouge (intro, défilement lissé, apparitions).
// La capture stable est renvoyée telle quelle, sans en reprendre une autre.
async function settle(page, target = page) {
  let previous = null;
  let stable = 0;
  for (let attempt = 0; attempt < 80; attempt++) {
    const current = await target.screenshot();
    stable = previous && current.equals(previous) ? stable + 1 : 0;
    if (stable === 3) return current;
    previous = current;
    await page.waitForTimeout(150);
  }
  throw new Error(`La page ne se stabilise pas : ${page.url()}`);
}

async function scrollToEnd(page) {
  for (let step = 0; step < 300; step++) {
    const atEnd = await page.evaluate(
      () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2,
    );
    if (atEnd) return;
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(40);
  }
}

async function open(page, path) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  // L'indication de défilement boucle sans fin : on la fige pour des captures comparables.
  await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; }" });
  if (process.env.HIDE) await page.addStyleTag({ content: `${process.env.HIDE} { visibility: hidden !important; }` });
  await page.evaluate(() => document.fonts.ready);
}

const browser = await chromium.launch();
for (const [device, viewport] of Object.entries(VIEWPORTS)) {
  const page = await browser.newPage({ viewport });
  const shot = async (name, target = page) => {
    writeFileSync(`${out}/${device}-${name}.png`, await settle(page, target));
  };

  await open(page, "/");
  await shot("accueil-00-premier-ecran");
  const pinned = await page.evaluate(() =>
    ["[data-hero]", "[data-acts]"].map((selector) => {
      const spacer = document.querySelector(selector)?.closest(".pin-spacer");
      if (!spacer) return null;
      const top = spacer.getBoundingClientRect().top + window.scrollY;
      return { top, length: spacer.offsetHeight - window.innerHeight };
    }),
  );
  for (const [index, name] of ["hero", "actes"].entries()) {
    const pin = pinned[index];
    if (!pin) continue;
    for (const fraction of [0.25, 0.5, 0.75, 1]) {
      await page.evaluate((y) => window.scrollTo(0, y), pin.top + Math.max(0, pin.length * fraction - 4));
      await shot(`accueil-${name}-${fraction * 100}`);
    }
  }
  // Une fois toute la page parcourue, chaque section est capturée en entier, sans l'en-tête fixe.
  await page.addStyleTag({ content: "header { visibility: hidden !important; }" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await scrollToEnd(page);
  await settle(page);
  const sections = page.locator("main section[aria-labelledby]");
  for (let index = 0; index < (await sections.count()); index++) {
    const section = sections.nth(index);
    const id = await section.getAttribute("aria-labelledby");
    if (pinned[0] && (id === "hero-title" || id === "acts-title")) continue;
    await section.scrollIntoViewIfNeeded();
    await shot(`accueil-section-${id}`, section);
  }
  await shot("pied-de-page", page.locator("footer"));

  await open(page, "/projets");
  await settle(page);
  await page.screenshot({ path: `${out}/${device}-projets.png`, fullPage: true });
  const project = await page.locator("[data-poster]").first().getAttribute("href");
  for (const [name, path] of Object.entries({ ...PAGES, fiche: project })) {
    await open(page, path);
    await settle(page);
    await page.screenshot({ path: `${out}/${device}-${name}.png`, fullPage: true });
  }
  await page.close();
}
await browser.close();
console.log(`Captures écrites dans ${out}`);
