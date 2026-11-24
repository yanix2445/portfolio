import "./setup-content";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { sendContactMail, sendRejectionAlert } from "@/lib/resend";
import { CONTACT } from "@/lib/site";
import { verifyTurnstile } from "@/lib/turnstile";

const send = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

const FIELDS = { name: "Camille <b>", email: "camille@example.com", message: "Bonjour\n<script>" };

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  send.mockReset();
});

describe("vérification Turnstile", () => {
  it("refuse sans clé secrète ou sans jeton, sans appeler Cloudflare", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    expect(await verifyTurnstile("jeton")).toBe(false);
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    expect(await verifyTurnstile("")).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("suit la réponse de siteverify et traite une panne comme un refus", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    fetchMock.mockResolvedValueOnce(Response.json({ success: true }));
    expect(await verifyTurnstile("jeton")).toBe(true);
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ secret: "secret", response: "jeton" });

    fetchMock.mockResolvedValueOnce(Response.json({ success: false, "error-codes": ["timeout-or-duplicate"] }));
    expect(await verifyTurnstile("jeton")).toBe(false);

    fetchMock.mockRejectedValueOnce(new Error("réseau coupé"));
    expect(await verifyTurnstile("jeton")).toBe(false);
  });

  it("en production, refuse un jeton obtenu sur un autre site que le domaine", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    vi.stubEnv("VERCEL_ENV", "production");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    fetchMock.mockResolvedValueOnce(Response.json({ success: true, hostname: "yanis-harrat.com" }));
    expect(await verifyTurnstile("jeton")).toBe(true);
    fetchMock.mockResolvedValueOnce(Response.json({ success: true, hostname: "www.yanis-harrat.com" }));
    expect(await verifyTurnstile("jeton")).toBe(true);
    fetchMock.mockResolvedValueOnce(Response.json({ success: true, hostname: "localhost" }));
    expect(await verifyTurnstile("jeton")).toBe(false);
    fetchMock.mockResolvedValueOnce(Response.json({ success: true }));
    expect(await verifyTurnstile("jeton")).toBe(false);
  });
});

describe("envoi par Resend", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("n'envoie rien sans clé ou sans destinataire", async () => {
    expect(await sendContactMail(FIELDS)).toBe(false);
    expect(send).not.toHaveBeenCalled();
  });

  it("envoie la notification à Yanis, puis l'accusé de réception au visiteur", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "moi@example.com");
    send.mockResolvedValue({ data: { id: "1" }, error: null });

    expect(await sendContactMail(FIELDS)).toBe(true);
    expect(send).toHaveBeenCalledTimes(2);

    const [notification, confirmation] = send.mock.calls.map(([mail]) => mail);
    expect(notification).toMatchObject({ to: "moi@example.com", replyTo: FIELDS.email });
    // Le domaine vérifié chez Resend est le domaine racine, pas le sous-domaine `send.`.
    expect(notification.from).toBe("Portfolio <contact@yanis-harrat.com>");
    expect(notification.html).not.toContain("<script>");
    expect(notification.html).toContain("&lt;script&gt;");

    expect(confirmation).toMatchObject({ to: FIELDS.email, replyTo: CONTACT.email });
    expect(confirmation.from).toBe("Yanis Harrat <contact@yanis-harrat.com>");
    expect(confirmation.headers).toMatchObject({ "Auto-Submitted": "auto-generated" });
    // Les étiquettes permettent au webhook de reconnaître les mails du formulaire.
    expect(notification.tags).toEqual([{ name: "contact", value: "notification" }]);
    expect(confirmation.tags).toEqual([{ name: "contact", value: "confirmation" }]);
  });

  it("garde l'adresse seule si CONTACT_FROM_EMAIL contient un nom", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "moi@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "Autre <bonjour@yanis-harrat.com>");
    send.mockResolvedValue({ data: { id: "1" }, error: null });

    await sendContactMail(FIELDS);
    expect(send.mock.calls[0][0].from).toBe("Portfolio <bonjour@yanis-harrat.com>");
  });

  it("renvoie false si la notification échoue, sans envoyer l'accusé", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "moi@example.com");

    send.mockResolvedValueOnce({ data: null, error: { name: "validation_error", message: "domain not verified" } });
    expect(await sendContactMail(FIELDS)).toBe(false);
    send.mockRejectedValueOnce(new Error("réseau coupé"));
    expect(await sendContactMail(FIELDS)).toBe(false);
    expect(send).toHaveBeenCalledTimes(2);
  });

  it("réussit quand même si seul l'accusé de réception échoue", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "moi@example.com");

    send
      .mockResolvedValueOnce({ data: { id: "1" }, error: null })
      .mockResolvedValueOnce({ data: null, error: { name: "validation_error", message: "invalid to" } });
    expect(await sendContactMail(FIELDS)).toBe(true);

    send.mockResolvedValueOnce({ data: { id: "2" }, error: null }).mockRejectedValueOnce(new Error("panne"));
    expect(await sendContactMail(FIELDS)).toBe(true);
  });
});

describe("alerte de mail non remis", () => {
  const ALERT = { recipient: "camille@example.com", kind: "confirmation" as const, detail: "rejet", at: new Date() };

  it("part vers Yanis, sans l'étiquette du formulaire", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "moi@example.com");
    send.mockResolvedValue({ data: { id: "1" }, error: null });

    expect(await sendRejectionAlert(ALERT)).toBe(true);
    const mail = send.mock.calls[0][0];
    expect(mail.to).toBe("moi@example.com");
    expect(mail.tags).toBeUndefined();
  });

  it("renvoie false sans clé ou si Resend échoue", async () => {
    expect(await sendRejectionAlert(ALERT)).toBe(false);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "moi@example.com");
    send.mockRejectedValueOnce(new Error("panne"));
    expect(await sendRejectionAlert(ALERT)).toBe(false);
  });
});
