import { expect, test } from "@playwright/test";

// Le build de test porte les quatre variables du formulaire : il est rendu.
// Le script de Cloudflare est bloqué dans le navigateur, et la clé secrète de test refuse
// toujours le jeton : aucun test ne peut envoyer de message, avec ou sans réseau.
// L'envoi lui-même est couvert par les tests unitaires.
test.beforeEach(async ({ page }) => {
  await page.route("https://challenges.cloudflare.com/**", (route) => route.abort());
});

test.describe("formulaire de contact", () => {
  test("propose trois champs étiquetés, un bouton d'envoi et le lien RGPD", async ({ page }) => {
    await page.goto("/contact");
    const main = page.getByRole("main");

    await expect(main.getByRole("textbox", { name: "Nom" })).toBeVisible();
    await expect(main.getByRole("textbox", { name: "E-mail" })).toBeVisible();
    await expect(main.getByRole("textbox", { name: "Message" })).toBeVisible();
    await expect(main.getByRole("button", { name: "Envoyer le message" })).toBeEnabled();
    await expect(main.getByRole("link", { name: /Mentions légales/ })).toHaveAttribute(
      "href",
      "/mentions-legales",
    );
  });

  test("signale les champs invalides, les relie à leur erreur et y place le focus", async ({ page }) => {
    await page.goto("/contact");
    const name = page.getByRole("textbox", { name: "Nom" });
    const email = page.getByRole("textbox", { name: "E-mail" });
    const message = page.getByRole("textbox", { name: "Message" });

    await email.fill("pas-un-email");
    await message.fill("Bonjour, nous cherchons un alternant.");
    await page.getByRole("button", { name: "Envoyer le message" }).click();

    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(name).toBeFocused();
    await expect(name).toHaveAccessibleDescription("Indiquez votre nom.");
    await expect(email).toHaveAttribute("aria-invalid", "true");
    await expect(message).toHaveAttribute("aria-invalid", "false");
    // La saisie est conservée.
    await expect(email).toHaveValue("pas-un-email");
  });

  test("ne part pas tant que la vérification anti-spam n'a pas abouti", async ({ page }) => {
    await page.goto("/contact");

    await page.getByRole("textbox", { name: "Nom" }).fill("Camille Martin");
    await page.getByRole("textbox", { name: "E-mail" }).fill("camille@example.com");
    await page.getByRole("textbox", { name: "Message" }).fill("Bonjour, nous cherchons un alternant.");
    await page.getByRole("button", { name: "Envoyer le message" }).click();

    await expect(page.getByText("La vérification anti-spam n'a pas abouti")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Nom" })).toHaveValue("Camille Martin");
  });

  test("affiche le refus du serveur, garde la saisie et rend la main", async ({ page }) => {
    await page.goto("/contact");
    const name = page.getByRole("textbox", { name: "Nom" });
    const submit = page.getByRole("button", { name: "Envoyer le message" });

    await name.fill("Camille Martin");
    await page.getByRole("textbox", { name: "E-mail" }).fill("camille@example.com");
    await page.getByRole("textbox", { name: "Message" }).fill("Bonjour,\nnous cherchons un alternant.");
    // Le widget est bloqué : on pose le champ qu'il aurait ajouté, avec un jeton que le serveur refusera.
    await page.locator("form").evaluate((form) => {
      const token = document.createElement("input");
      token.type = "hidden";
      token.name = "cf-turnstile-response";
      token.value = "jeton-factice";
      form.append(token);
    });
    await submit.click();

    // Le serveur a répondu : message persistant sous le bouton, en plus du toast.
    await expect(page.locator("[data-contact-result='error']")).toHaveText(
      /La vérification anti-spam n'a pas abouti/,
    );
    // React remet le formulaire à zéro après l'action : la saisie doit être revenue.
    await expect(name).toHaveValue("Camille Martin");
    await expect(page.getByRole("textbox", { name: "Message" })).toHaveValue(
      "Bonjour,\nnous cherchons un alternant.",
    );
    await expect(submit).not.toHaveAttribute("aria-disabled", "true");
    await expect(submit).toBeFocused();
  });

  test("se parcourt au clavier, avec un focus visible", async ({ page }) => {
    await page.goto("/contact");
    const name = page.getByRole("textbox", { name: "Nom" });

    await name.focus();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("textbox", { name: "E-mail" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("textbox", { name: "Message" })).toBeFocused();
    const ring = await page
      .getByRole("textbox", { name: "Message" })
      .evaluate((element) => getComputedStyle(element).boxShadow);
    expect(ring).not.toBe("none");
  });
});

test.describe("contact sur le plus petit téléphone", () => {
  test.use({ viewport: { width: 320, height: 568 } });

  test("le cadre du widget anti-spam n'élargit pas la page", async ({ page }) => {
    await page.goto("/contact");
    // Le widget réel fait au moins 300 px : on simule sa largeur dans son cadre.
    await page.locator("form .overflow-x-auto").evaluate((frame) => {
      const widget = document.createElement("div");
      widget.style.width = "300px";
      widget.style.height = "65px";
      frame.append(widget);
    });

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
    ).toBe(false);
  });
});

test.describe("contact sur mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("le formulaire et les coordonnées tiennent sans défilement horizontal", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.getByRole("textbox", { name: "Message" })).toBeVisible();
    await expect(page.locator("[data-contact-channels]")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
    ).toBe(false);
  });
});
