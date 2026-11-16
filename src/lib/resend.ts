import "server-only";

import { Resend } from "resend";

import type { ContactFields } from "@/lib/contact";
import { SITE_HOST } from "@/lib/site";

// Expéditeur sur le domaine vérifié chez Resend, qui est le domaine racine. Le sous-domaine
// `send.` ne sert qu'aux enregistrements DNS de Resend (SPF, retour des rebonds) : une adresse
// en `@send.…` serait refusée. `CONTACT_FROM_EMAIL` remplace cette valeur au besoin.
const DEFAULT_FROM = `Portfolio <contact@${SITE_HOST}>`;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * Envoie le message du formulaire à Yanis, avec l'adresse du visiteur en réponse.
 * Mail texte et HTML simple. Renvoie `false` pour tout échec, sans jamais lever.
 */
export async function sendContactMail({ name, email, message }: ContactFields): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
      to,
      replyTo: email,
      subject: `Portfolio · message de ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
      html: `<p style="white-space:pre-wrap">${escapeHtml(message)}</p><p>— ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
    });
    return error === null;
  } catch {
    return false;
  }
}
