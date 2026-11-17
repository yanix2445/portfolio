import "./setup-content";

import { createHmac } from "node:crypto";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/resend-webhook/route";
import { sendRejectionAlert } from "@/lib/resend";

vi.mock("@/lib/resend", () => ({ CONTACT_TAG: "contact", sendRejectionAlert: vi.fn() }));

// Secret au format Standard Webhooks, celui de Resend : « whsec_ » puis la clé en base64.
const KEY = Buffer.from("cle-de-test-du-webhook-resend-32o");
const SECRET = `whsec_${KEY.toString("base64")}`;

function signed(event: unknown, secret = KEY) {
  const payload = JSON.stringify(event);
  const id = "msg_test";
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHmac("sha256", secret).update(`${id}.${timestamp}.${payload}`).digest("base64");
  return new Request("https://example.com/api/resend-webhook", {
    method: "POST",
    headers: { "svix-id": id, "svix-timestamp": timestamp, "svix-signature": `v1,${signature}` },
    body: payload,
  });
}

function bounce(tags?: Record<string, string>) {
  return {
    type: "email.bounced",
    created_at: "2026-11-16T22:55:00.000Z",
    data: {
      created_at: "2026-11-16T22:54:00.000Z",
      email_id: "e1",
      message_id: "m1",
      from: "Yanis Harrat <contact@yanis-harrat.com>",
      to: ["camile@exmple.com"],
      subject: "Message bien reçu",
      tags,
      bounce: { message: "mailbox unknown", subType: "General", type: "Permanent" },
    },
  };
}

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("RESEND_WEBHOOK_SECRET", SECRET);
  vi.mocked(sendRejectionAlert).mockReset().mockResolvedValue(true);
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("webhook Resend", () => {
  it("n'existe pas tant que le secret n'est pas configuré", async () => {
    vi.stubEnv("RESEND_WEBHOOK_SECRET", "");
    expect((await POST(signed(bounce({ contact: "confirmation" })))).status).toBe(404);
  });

  it("refuse une requête mal signée, sans alerter", async () => {
    const response = await POST(signed(bounce({ contact: "confirmation" }), Buffer.from("autre-cle")));
    expect(response.status).toBe(400);
    expect(sendRejectionAlert).not.toHaveBeenCalled();
  });

  it("alerte quand l'accusé de réception est rejeté", async () => {
    const response = await POST(signed(bounce({ contact: "confirmation" })));

    expect(response.status).toBe(200);
    expect(sendRejectionAlert).toHaveBeenCalledWith({
      recipient: "camile@exmple.com",
      kind: "confirmation",
      detail: "rejeté par le serveur du destinataire (mailbox unknown)",
      at: new Date("2026-11-16T22:55:00.000Z"),
    });
  });

  it("ignore les mails qui ne viennent pas du formulaire et les autres événements", async () => {
    expect((await POST(signed(bounce()))).status).toBe(200);
    expect((await POST(signed({ ...bounce({ contact: "confirmation" }), type: "email.delivered" }))).status).toBe(200);
    expect(sendRejectionAlert).not.toHaveBeenCalled();
  });

  it("répond 200 même si l'alerte échoue, pour éviter les renvois en boucle", async () => {
    vi.mocked(sendRejectionAlert).mockResolvedValue(false);
    expect((await POST(signed(bounce({ contact: "notification" })))).status).toBe(200);
  });
});
