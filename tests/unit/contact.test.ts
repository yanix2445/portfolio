import "./setup-content";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { sendContact } from "@/actions/contact";
import {
  CONTACT_LIMITS,
  CONTACT_MESSAGES,
  HONEYPOT_FIELD,
  TURNSTILE_FIELD,
  contactSiteKey,
  readContactFields,
  validateContact,
} from "@/lib/contact";
import { sendContactMail } from "@/lib/resend";
import { verifyTurnstile } from "@/lib/turnstile";

vi.mock("@/lib/turnstile", () => ({ verifyTurnstile: vi.fn() }));
vi.mock("@/lib/resend", () => ({ sendContactMail: vi.fn() }));

const VALID = {
  name: "Camille Martin",
  email: "camille@example.com",
  message: "Bonjour, nous cherchons un alternant.",
};

function form(fields: Record<string, string>, token = "jeton") {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  if (token) data.set(TURNSTILE_FIELD, token);
  return data;
}

beforeEach(() => {
  vi.mocked(verifyTurnstile).mockReset().mockResolvedValue(true);
  vi.mocked(sendContactMail).mockReset().mockResolvedValue(true);
});

describe("validation du formulaire de contact", () => {
  it("accepte un nom, un e-mail et un message valides", () => {
    expect(validateContact(VALID)).toEqual({});
  });

  it("signale chaque champ vide", () => {
    expect(Object.keys(validateContact({ name: "", email: "", message: "" }))).toEqual([
      "name",
      "email",
      "message",
    ]);
  });

  it("refuse un e-mail mal formé, un message trop court ou trop long", () => {
    expect(validateContact({ ...VALID, email: "camille@example" })).toHaveProperty("email");
    expect(validateContact({ ...VALID, message: "Trop court" })).toEqual({});
    expect(validateContact({ ...VALID, message: "Court" })).toHaveProperty("message");
    expect(
      validateContact({ ...VALID, message: "a".repeat(CONTACT_LIMITS.message + 1) }),
    ).toHaveProperty("message");
  });
});

describe("affichage du formulaire de contact", () => {
  const ENV = {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: "site",
    TURNSTILE_SECRET_KEY: "secret",
    RESEND_API_KEY: "re_test",
    CONTACT_TO_EMAIL: "moi@example.com",
  };

  it("donne la clé de site quand Turnstile et Resend sont configurés", () => {
    expect(contactSiteKey(ENV)).toBe("site");
  });

  it("ne propose pas le formulaire s'il manque une seule variable", () => {
    for (const missing of Object.keys(ENV)) {
      expect(contactSiteKey({ ...ENV, [missing]: undefined }), missing).toBeNull();
      expect(contactSiteKey({ ...ENV, [missing]: "" }), missing).toBeNull();
    }
    expect(contactSiteKey({})).toBeNull();
  });
});

describe("lecture des champs du formulaire", () => {
  it("garde un motif connu et ignore les autres", () => {
    expect(readContactFields(form({ ...VALID, reason: "stage" })).reason).toBe("stage");
    expect(readContactFields(form({ ...VALID, reason: "pirate" }))).not.toHaveProperty("reason");
    expect(readContactFields(form(VALID))).not.toHaveProperty("reason");
  });

  it("compte les retours à la ligne comme le navigateur, CRLF ou non", () => {
    const data = new FormData();
    data.set("message", "Bonjour,\r\nà bientôt\rCamille");

    expect(readContactFields(data).message).toBe("Bonjour,\nà bientôt\nCamille");
  });
});

describe("action du formulaire de contact", () => {
  it("envoie le mail quand les champs et le jeton sont valides", async () => {
    const result = await sendContact(null, form(VALID));

    expect(result).toEqual({ status: "success", message: CONTACT_MESSAGES.success });
    expect(verifyTurnstile).toHaveBeenCalledWith("jeton");
    expect(sendContactMail).toHaveBeenCalledWith(VALID);
  });

  it("nettoie les champs avant de les envoyer", async () => {
    await sendContact(
      null,
      form({ name: "  Camille \n Martin ", email: " camille@example.com ", message: `  ${VALID.message}  ` }),
    );

    expect(sendContactMail).toHaveBeenCalledWith(VALID);
  });

  it("fait croire à un robot pris au champ piège que le message est parti", async () => {
    const result = await sendContact(null, form({ ...VALID, [HONEYPOT_FIELD]: "https://spam.example" }));

    expect(result).toEqual({ status: "success", message: CONTACT_MESSAGES.success });
    expect(verifyTurnstile).not.toHaveBeenCalled();
    expect(sendContactMail).not.toHaveBeenCalled();
  });

  it("transmet le motif choisi", async () => {
    await sendContact(null, form({ ...VALID, reason: "alternance" }));
    expect(sendContactMail).toHaveBeenCalledWith({ ...VALID, reason: "alternance" });
  });

  it("s'arrête à un champ invalide, sans appeler Turnstile ni Resend", async () => {
    const result = await sendContact(null, form({ ...VALID, email: "pas-un-email" }));

    expect(result).toMatchObject({
      status: "error",
      message: CONTACT_MESSAGES.invalid,
      errors: { email: expect.any(String) },
      fields: { name: VALID.name },
    });
    expect(verifyTurnstile).not.toHaveBeenCalled();
    expect(sendContactMail).not.toHaveBeenCalled();
  });

  it("n'envoie aucun mail si Turnstile refuse le jeton ou s'il manque", async () => {
    vi.mocked(verifyTurnstile).mockResolvedValue(false);

    expect(await sendContact(null, form(VALID))).toMatchObject({
      status: "error",
      message: CONTACT_MESSAGES.challenge,
    });
    expect(await sendContact(null, form(VALID, ""))).toMatchObject({ status: "error" });
    expect(sendContactMail).not.toHaveBeenCalled();
  });

  it("renvoie une erreur générique si l'envoi échoue, en gardant la saisie", async () => {
    vi.mocked(sendContactMail).mockResolvedValue(false);

    expect(await sendContact(null, form(VALID))).toEqual({
      status: "error",
      message: CONTACT_MESSAGES.failure,
      fields: VALID,
    });
  });

  it("ne lève pas non plus si l'appel n'est pas un formulaire", async () => {
    const result = await sendContact(null, null as unknown as FormData);

    expect(result).toMatchObject({ status: "error", message: CONTACT_MESSAGES.failure });
  });

  it("ne lève jamais, même si un service plante", async () => {
    vi.mocked(verifyTurnstile).mockRejectedValue(new Error("réseau coupé"));

    const result = await sendContact(null, form(VALID));

    expect(result).toMatchObject({ status: "error", message: CONTACT_MESSAGES.failure });
    expect(JSON.stringify(result)).not.toContain("réseau coupé");
  });
});
