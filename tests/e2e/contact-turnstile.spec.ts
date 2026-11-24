import { expect, test } from "@playwright/test";

// Ici le widget Turnstile se charge vraiment (clé de site de test, réseau requis), pour
// exercer l'attente du jeton. La clé secrète de test refuse toujours le jeton : le serveur
// répond, mais aucun message n'est envoyé.
test.describe("formulaire de contact avec le widget anti-spam", () => {
  test("envoyé avant l'arrivée du jeton, il part dès que le jeton arrive", async ({ page }) => {
    let actionCalls = 0;
    page.on("request", (request) => {
      if (request.method() === "POST" && request.headers()["next-action"]) actionCalls += 1;
    });

    await page.goto("/contact");
    await page.getByRole("textbox", { name: "Nom" }).fill("Camille Martin");
    await page.getByRole("textbox", { name: "E-mail" }).fill("camille@example.com");
    await page.getByRole("textbox", { name: "Message" }).fill("Bonjour, nous cherchons un alternant.");

    // Un premier jeton prouve que le widget est chargé.
    const token = page.locator("input[name='cf-turnstile-response']");
    await expect(token).not.toHaveValue("", { timeout: 20_000 });

    // Le jeton est retiré juste avant l'envoi : le formulaire doit attendre le suivant.
    await page.evaluate(() => {
      (window as unknown as { turnstile: { reset: () => void } }).turnstile.reset();
      document.querySelector<HTMLButtonElement>("button[type='submit']")?.click();
    });

    // Le serveur a répondu (il refuse le jeton de test) : l'envoi est bien parti, une seule fois.
    await expect(page.locator("[data-contact-result='error']")).toHaveText(
      /La vérification anti-spam n'a pas abouti/,
      { timeout: 25_000 },
    );
    expect(actionCalls).toBe(1);
  });
});
