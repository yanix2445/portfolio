import "server-only";

import { Resend } from "resend";

import type { ContactFields } from "@/lib/contact";
import {
  confirmationEmail,
  notificationEmail,
  rejectionAlertEmail,
  type ContactMailKind,
} from "@/lib/contact-emails";
import { CONTACT, SITE_HOST, SITE_NAME } from "@/lib/site";

// Expéditeur sur le domaine vérifié chez Resend, qui est le domaine racine. Le sous-domaine
// `send.` ne sert qu'aux enregistrements DNS de Resend (SPF, retour des rebonds) : une adresse
// en `@send.…` serait refusée. `CONTACT_FROM_EMAIL` remplace cette adresse au besoin.
const DEFAULT_FROM_ADDRESS = `contact@${SITE_HOST}`;

/** Étiquette Resend des mails du formulaire : le webhook n'alerte que pour ceux-là. */
export const CONTACT_TAG = "contact";

function fromAddress(): string {
  const configured = process.env.CONTACT_FROM_EMAIL;
  if (!configured) return DEFAULT_FROM_ADDRESS;
  // La variable peut contenir « Nom <adresse> » : on n'en garde que l'adresse.
  return configured.match(/<([^>]+)>/)?.[1] ?? configured;
}

function tags(kind: ContactMailKind) {
  return [{ name: CONTACT_TAG, value: kind }];
}

/**
 * Envoie le message du formulaire à Yanis (réponse vers le visiteur), puis un accusé de
 * réception au visiteur (réponse vers Yanis). Seule la notification compte pour le résultat :
 * si l'accusé échoue (adresse refusée, quota), Yanis a quand même le message.
 * Renvoie `false` si la notification échoue, sans jamais lever.
 */
export async function sendContactMail(fields: ContactFields): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;

  const resend = new Resend(apiKey);
  const address = fromAddress();

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio <${address}>`,
      to,
      replyTo: fields.email,
      tags: tags("notification"),
      ...notificationEmail(fields, new Date()),
    });
    if (error) {
      console.error("contact: notification refusée par Resend", error.name);
      return false;
    }
  } catch {
    console.error("contact: notification impossible à envoyer");
    return false;
  }

  try {
    const { error } = await resend.emails.send({
      from: `${SITE_NAME} <${address}>`,
      to: fields.email,
      replyTo: CONTACT.email,
      // Mail automatique (RFC 3834) : les répondeurs d'absence ne doivent pas y répondre.
      headers: { "Auto-Submitted": "auto-generated", "X-Auto-Response-Suppress": "All" },
      tags: tags("confirmation"),
      ...confirmationEmail(fields),
    });
    if (error) console.error("contact: accusé de réception refusé par Resend", error.name);
  } catch {
    console.error("contact: accusé de réception impossible à envoyer");
  }

  return true;
}

/**
 * Prévient Yanis qu'un mail du formulaire n'a pas été remis. L'alerte ne porte pas
 * l'étiquette du formulaire : si elle échoue à son tour, elle ne déclenche pas d'alerte.
 * Renvoie `false` pour tout échec, sans jamais lever.
 */
export async function sendRejectionAlert(
  alert: Parameters<typeof rejectionAlertEmail>[0],
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: `Portfolio <${fromAddress()}>`,
      to,
      ...rejectionAlertEmail(alert),
    });
    return error === null;
  } catch {
    return false;
  }
}
