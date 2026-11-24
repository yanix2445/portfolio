// Règles du formulaire de contact, sans dépendance serveur : la même validation tourne
// dans le navigateur (avant l'envoi) et dans la Server Action (toujours).

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  messageMin: 10,
  message: 5000,
} as const;

/** Motifs proposés ; le motif est facultatif. `?motif=alternance` le présélectionne. */
export const CONTACT_REASONS = [
  { value: "alternance", label: "Alternance" },
  { value: "autre", label: "Autre" },
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number]["value"];

export function parseReason(value: unknown): ContactReason | undefined {
  return CONTACT_REASONS.find((reason) => reason.value === value)?.value;
}

export function reasonLabel(reason: ContactReason): string {
  return CONTACT_REASONS.find(({ value }) => value === reason)?.label ?? reason;
}

export type ContactFields = { name: string; email: string; message: string; reason?: ContactReason };

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactResult =
  | { status: "success"; message: string }
  | { status: "error"; message: string; errors?: ContactErrors; fields?: ContactFields };

/** Nom du champ que le widget Turnstile ajoute lui-même au formulaire. */
export const TURNSTILE_FIELD = "cf-turnstile-response";

/**
 * Champ piège : invisible pour les visiteurs, rempli par les robots qui remplissent tout.
 * Son nom ne ressemble à rien que le remplissage automatique d'un navigateur reconnaîtrait.
 */
export const HONEYPOT_FIELD = "contact_hp";

/** Le message s'affiche sous le champ à partir de cette part de la limite. */
export const MESSAGE_COUNTER_FROM = 0.8;

export const CONTACT_MESSAGES = {
  success: "Message envoyé. Un e-mail de confirmation vous attend : je vous réponds sous 48 à 72 h.",
  invalid: "Certains champs sont à corriger.",
  challenge: "La vérification anti-spam n'a pas abouti. Réessayez dans un instant.",
  failure: "Le message n'a pas pu être envoyé. Réessayez plus tard, ou écrivez-moi par e-mail.",
} as const;

const REQUIRED_ENV = [
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
] as const;

/**
 * La clé de site Turnstile si le formulaire peut fonctionner de bout en bout, sinon `null`.
 * Il faut les quatre variables : un formulaire affiché sans clé d'envoi échouerait toujours.
 */
export function contactSiteKey(env: Record<string, string | undefined>): string | null {
  return REQUIRED_ENV.every((name) => env[name]) ? (env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? null) : null;
}

// Sans `?` (il ouvrirait des paramètres dans le lien `mailto:` de la notification) ni `<>"`
// (ils casseraient l'en-tête Reply-To). Une vraie adresse n'en a pas besoin.
const EMAIL = /^[^\s@?<>"]+@[^\s@?<>"]+\.[^\s@?<>"]+$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Lit les champs d'un formulaire. Le nom et l'e-mail tiennent sur une ligne. */
export function readContactFields(form: FormData): ContactFields {
  const reason = parseReason(form.get("reason"));
  return {
    ...(reason ? { reason } : {}),
    name: text(form.get("name")).replace(/\s+/g, " "),
    email: text(form.get("email")),
    // Un navigateur envoie les retours à la ligne en CRLF : on compte comme lui, en LF.
    message: text(form.get("message")).replace(/\r\n?/g, "\n"),
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
