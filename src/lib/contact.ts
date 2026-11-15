// Règles du formulaire de contact, sans dépendance serveur : la même validation tourne
// dans le navigateur (avant l'envoi) et dans la Server Action (toujours).

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  messageMin: 10,
  message: 5000,
} as const;

export type ContactFields = { name: string; email: string; message: string };

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactResult =
  | { status: "success"; message: string }
  | { status: "error"; message: string; errors?: ContactErrors; fields?: ContactFields };

/** Nom du champ que le widget Turnstile ajoute lui-même au formulaire. */
export const TURNSTILE_FIELD = "cf-turnstile-response";

export const CONTACT_MESSAGES = {
  success: "Message envoyé. Je vous réponds dès que possible.",
  invalid: "Certains champs sont à corriger.",
  challenge: "La vérification anti-spam n'a pas abouti. Réessayez dans un instant.",
  failure: "Le message n'a pas pu être envoyé. Réessayez plus tard, ou écrivez-moi par e-mail.",
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Lit les trois champs d'un formulaire. Le nom et l'e-mail tiennent sur une ligne. */
export function readContactFields(form: FormData): ContactFields {
  return {
    name: text(form.get("name")).replace(/\s+/g, " "),
    email: text(form.get("email")),
    message: text(form.get("message")),
  };
}

/** Une erreur par champ invalide ; un objet vide si tout est bon. */
export function validateContact({ name, email, message }: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  if (!name) errors.name = "Indiquez votre nom.";
  else if (name.length > CONTACT_LIMITS.name) {
    errors.name = `Le nom ne peut pas dépasser ${CONTACT_LIMITS.name} caractères.`;
  }

  if (!email) errors.email = "Indiquez votre adresse e-mail.";
  else if (email.length > CONTACT_LIMITS.email || !EMAIL.test(email)) {
    errors.email = "Cette adresse e-mail ne semble pas valide.";
  }

  if (!message) errors.message = "Écrivez votre message.";
  else if (message.length < CONTACT_LIMITS.messageMin) {
    errors.message = `Le message doit faire au moins ${CONTACT_LIMITS.messageMin} caractères.`;
  } else if (message.length > CONTACT_LIMITS.message) {
    errors.message = `Le message ne peut pas dépasser ${CONTACT_LIMITS.message} caractères.`;
  }

  return errors;
}
