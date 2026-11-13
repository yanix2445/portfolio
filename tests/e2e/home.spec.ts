import { expect, test, type Page } from "@playwright/test";

import { CERTIFICATIONS } from "../../src/lib/profile";
import { CONTACT, OWNER } from "../../src/lib/site";

const SECTION_IDS = [
  "hero-title",
  "demo-title",
  "figures-title",
  "skills-title",
  "path-title",
  "projects-title",
  "close-title",
];

const HEADLINE = new RegExp(`${OWNER.fullName}.*Opérationnel.*dès lundi`);

function sectionIds(page: Page) {
  return page
    .locator("main section[aria-labelledby]")
    .evaluateAll((sections) => sections.map((section) => section.getAttribute("aria-labelledby")));
}

// Erreurs console, hors Vercel Analytics dont le script n'est servi que sur Vercel.
function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !message.location().url.includes("/_vercel/")) {
      errors.push(message.text());
    }
  });
  return errors;
}

async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let top = 0; top < height; top += 400) {
    await page.mouse.wheel(0, 400);
  }
  await page.waitForTimeout(300);
}

function callLink(page: Page) {
  return page.getByRole("main").getByRole("link", { name: /^Appeler/ }).first();
}

function ticketStatuses(page: Page) {
  return page
    .locator("[data-ticket-queue] li[data-status]")
    .evaluateAll((rows) => rows.map((row) => `${row.textContent}`));
}

test.describe("accueil", () => {
  test("le premier écran montre le titre, l'appel, le CV et le haut de la file, sans erreur console", async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: HEADLINE })).toBeVisible();
    await expect(callLink(page)).toHaveAttribute("href", `tel:${CONTACT.phoneE164}`);
    await expect(callLink(page)).toBeInViewport();
    await expect(page.getByRole("main").getByRole("link", { name: "CV (PDF)" }).first()).toBeInViewport();
    await expect(page.locator("[data-ticket-queue]")).toBeInViewport();
    await expect(page.getByText("exemple", { exact: true })).toBeVisible();
    expect(await sectionIds(page)).toEqual(SECTION_IDS);

    await scrollThrough(page);
    expect(errors).toEqual([]);
  });

  test("la file traite des tickets, puis s'arrête au survol et au bouton pause", async ({ page }) => {
    await page.goto("/");
    const queue = page.locator("[data-ticket-queue]");
    await queue.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);

    await expect(queue).toHaveAttribute("data-state", "running");
    await expect(queue.getByText(/résolus? depuis votre arrivée/)).toBeVisible({ timeout: 10_000 });

    // Survol : la boucle s'arrête et la file ne bouge plus.
    await queue.hover();
    await expect(queue).toHaveAttribute("data-state", "paused");
    const frozen = await ticketStatuses(page);
    await page.waitForTimeout(3000);
    expect(await ticketStatuses(page)).toEqual(frozen);

    // Le bouton relance la démo malgré le survol, puis la met en pause durablement.
    await queue.getByRole("button", { name: /relancer la démo/ }).click();
    await expect(queue).toHaveAttribute("data-state", "running");
    await queue.getByRole("button", { name: /mettre la démo en pause/ }).click();
    await page.mouse.move(0, 0);
    await expect(queue).toHaveAttribute("data-state", "paused");
  });

  test("la file s'arrête quand le focus clavier y entre", async ({ page }) => {
    await page.goto("/");
    const queue = page.locator("[data-ticket-queue]");
    await queue.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await expect(queue).toHaveAttribute("data-state", "running");

    await queue.getByRole("button").focus();
    await expect(queue).toHaveAttribute("data-state", "paused");
  });

  test("le clavier atteint l'appel et le CV avec un focus visible", async ({ page }) => {
    await page.goto("/");
    const call = callLink(page);

    for (let step = 0; step < 15; step++) {
      await page.keyboard.press("Tab");
      if (await call.evaluate((element) => element === document.activeElement)) break;
    }

    await expect(call).toBeFocused();
    expect(await call.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe("solid");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("main").getByRole("link", { name: "CV (PDF)" }).first()).toBeFocused();
  });

  test("une navigation client aller-retour ne produit aucune erreur", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Navigation principale" });

    await nav.getByRole("link", { name: "Projets" }).click();
    await expect(page).toHaveURL("/projets");
    await page.getByRole("banner").getByRole("link", { name: OWNER.fullName, exact: true }).click();
    await expect(page).toHaveURL("/");
    await expect(page.locator("[data-ticket-queue]")).toBeVisible();
    await scrollThrough(page);
    expect(errors).toEqual([]);
  });
});

test.describe("accueil sans JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("le titre, la file d'exemple et les chiffres finaux sont dans le HTML", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: HEADLINE })).toBeVisible();
    await expect(page.locator("[data-ticket-queue] li[data-status]")).toHaveCount(5);
    await expect(page.locator("[data-ticket-queue] li[data-status='resolu']").first()).toBeVisible();
    await expect(page.getByRole("region", { name: /chiffres/ }).getByText(String(CERTIFICATIONS.length), { exact: true }).first()).toBeAttached();
    expect(await sectionIds(page)).toEqual(SECTION_IDS);
  });
});

test.describe("accueil avec moins de mouvement", () => {
  test.use({ reducedMotion: "reduce" });

  test("la page est statique et complète", async ({ page }) => {
    await page.goto("/");
    const queue = page.locator("[data-ticket-queue]");

    const animations = await page.locator("[data-rise], [data-pill]").evaluateAll((elements) =>
      elements.flatMap((element) => element.getAnimations()).length,
    );
    expect(animations).toBe(0);
    await expect(queue.getByText("Démo figée : mouvement réduit.")).toBeVisible();
    await expect(queue.getByRole("button")).toHaveCount(0);

    const frozen = await ticketStatuses(page);
    await queue.scrollIntoViewIfNeeded();
    await page.waitForTimeout(3000);
    expect(await ticketStatuses(page)).toEqual(frozen);

    await scrollThrough(page);
    for (const id of SECTION_IDS) {
      await expect(page.locator(`[aria-labelledby="${id}"]`)).toBeVisible();
    }
  });
});

for (const width of [320, 375]) {
  test.describe(`accueil à ${width} px`, () => {
    test.use({ viewport: { width, height: 812 } });

    test("aucun débordement horizontal, appel visible sans défiler", async ({ page }) => {
      await page.goto("/");
      await expect(callLink(page)).toBeInViewport();
      await scrollThrough(page);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}
