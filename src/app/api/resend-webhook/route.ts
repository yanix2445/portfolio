import { Resend, type WebhookEventPayload } from "resend";

import type { ContactMailKind } from "@/lib/contact-emails";
import { CONTACT_TAG, sendRejectionAlert } from "@/lib/resend";

// Événements Resend qui signifient qu'un mail n'arrivera pas. Le webhook reçoit les
// événements de tout le compte : seuls les mails étiquetés par le formulaire déclenchent
// une alerte.
const REJECTIONS = ["email.bounced", "email.failed", "email.suppressed", "email.complained"] as const;

type Rejection = Extract<WebhookEventPayload, { type: (typeof REJECTIONS)[number] }>;

function isRejection(event: WebhookEventPayload): event is Rejection {
  return (REJECTIONS as readonly string[]).includes(event.type);
}

function detailOf(event: Rejection): string {
  switch (event.type) {
    case "email.bounced":
      return `rejeté par le serveur du destinataire (${event.data.bounce.message})`;
    case "email.failed":
      return `échec d'envoi (${event.data.failed.reason})`;
    case "email.suppressed":
      return `adresse bloquée par Resend après un rejet ou un signalement (${event.data.suppressed.message})`;
    case "email.complained":
      return "signalé comme spam par le destinataire";
  }
}

/**
 * Webhook Resend : vérifie la signature, puis alerte Yanis par mail quand un mail du
 * formulaire n'a pas été remis. Répond 200 à tout événement signé, même ignoré, pour que
 * Resend ne le renvoie pas ; 400 à une requête non signée.
 */
export async function POST(request: Request): Promise<Response> {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  const apiKey = process.env.RESEND_API_KEY;
  if (!secret || !apiKey) return new Response(null, { status: 404 });

  // La signature porte sur le corps brut : il faut le lire en texte, pas en JSON.
  const payload = await request.text();
  let event: WebhookEventPayload;
  try {
    event = new Resend(apiKey).webhooks.verify({
      payload,
      headers: {
        id: request.headers.get("svix-id") ?? "",
        timestamp: request.headers.get("svix-timestamp") ?? "",
        signature: request.headers.get("svix-signature") ?? "",
      },
      webhookSecret: secret,
    });
  } catch {
    return new Response(null, { status: 400 });
  }

  if (!isRejection(event)) return new Response(null, { status: 200 });
  const kind = event.data.tags?.[CONTACT_TAG] as ContactMailKind | undefined;
  if (kind !== "notification" && kind !== "confirmation") return new Response(null, { status: 200 });

  const sent = await sendRejectionAlert({
    recipient: event.data.to.join(", "),
    kind,
    detail: detailOf(event),
    at: new Date(event.created_at),
  });
  if (!sent) console.error("contact: alerte de mail non remis impossible à envoyer", event.type, kind);

  // L'alerte est un confort : son échec ne doit pas faire renvoyer l'événement en boucle.
  return new Response(null, { status: 200 });
}
