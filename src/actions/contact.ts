"use server";

import {
  CONTACT_MESSAGES,
  TURNSTILE_FIELD,
  readContactFields,
  validateContact,
  type ContactResult,
} from "@/lib/contact";
import { sendContactMail } from "@/lib/resend";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * Reçoit le formulaire de contact. Dans l'ordre : revalider les champs, vérifier le jeton
 * Turnstile, envoyer le mail. Rien n'est stocké, rien n'est levé vers le client, et aucune
 * réponse brute de Turnstile ou de Resend ne sort d'ici.
 */
export async function sendContact(
  _previous: ContactResult | null,
  form: FormData,
): Promise<ContactResult> {
  const fields = readContactFields(form);

  try {
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
