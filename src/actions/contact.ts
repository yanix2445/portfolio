"use server";

import {
  CONTACT_MESSAGES,
  HONEYPOT_FIELD,
  TURNSTILE_FIELD,
  readContactFields,
  validateContact,
  type ContactFields,
  type ContactResult,
} from "@/lib/contact";
import { sendContactMail } from "@/lib/resend";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * Reçoit le formulaire de contact. Dans l'ordre : écarter les robots pris au champ piège,
 * revalider les champs, vérifier le jeton Turnstile, envoyer les mails. Rien n'est stocké, rien n'est levé vers le client, et aucune
 * réponse brute de Turnstile ou de Resend ne sort d'ici.
 */
export async function sendContact(
  _previous: ContactResult | null,
  form: FormData,
): Promise<ContactResult> {
  let fields: ContactFields | undefined;

  try {
    // Champ piège rempli : un robot. On lui répond comme à un humain, sans rien envoyer.
    if (form.get(HONEYPOT_FIELD)) {
      return { status: "success", message: CONTACT_MESSAGES.success };
    }

    fields = readContactFields(form);
    const errors = validateContact(fields);
    if (Object.keys(errors).length > 0) {
      return { status: "error", message: CONTACT_MESSAGES.invalid, errors, fields };
    }

    const token = form.get(TURNSTILE_FIELD);
    if (!(await verifyTurnstile(typeof token === "string" ? token : ""))) {
      return { status: "error", message: CONTACT_MESSAGES.challenge, fields };
    }

    if (!(await sendContactMail(fields))) {
      return { status: "error", message: CONTACT_MESSAGES.failure, fields };
    }

    return { status: "success", message: CONTACT_MESSAGES.success };
  } catch {
    return { status: "error", message: CONTACT_MESSAGES.failure, fields };
  }
}
