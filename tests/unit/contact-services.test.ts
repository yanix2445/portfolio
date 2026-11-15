import "./setup-content";

import { afterEach, describe, expect, it, vi } from "vitest";

import { sendContactMail } from "@/lib/resend";
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
});

describe("envoi par Resend", () => {
  it("n'envoie rien sans clé ou sans destinataire", async () => {
    expect(await sendContactMail(FIELDS)).toBe(false);
    expect(send).not.toHaveBeenCalled();
  });

  it("envoie au destinataire configuré, réponse vers le visiteur, HTML échappé", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "moi@example.com");
    send.mockResolvedValue({ data: { id: "1" }, error: null });

    expect(await sendContactMail(FIELDS)).toBe(true);
    const mail = send.mock.calls[0][0];
    expect(mail).toMatchObject({ to: "moi@example.com", replyTo: FIELDS.email });
    // Le domaine vérifié chez Resend est le domaine racine, pas le sous-domaine `send.`.
    expect(mail.from).toBe("Portfolio <contact@yanis-harrat.com>");
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain("&lt;script&gt;");
  });

  it("renvoie false si Resend répond en erreur ou plante", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "moi@example.com");

    send.mockResolvedValueOnce({ data: null, error: { message: "domain not verified" } });
    expect(await sendContactMail(FIELDS)).toBe(false);
    send.mockRejectedValueOnce(new Error("réseau coupé"));
    expect(await sendContactMail(FIELDS)).toBe(false);
  });
});
