// Les deux mails du formulaire de contact, sans dépendance serveur : la notification pour
// Yanis et l'accusé de réception pour le visiteur. HTML en tableaux et styles en ligne, la
// seule forme que tous les clients mail rendent. Couleurs reprises de `globals.css`, polices
// système (aucune police web : elle ferait appeler un serveur tiers à l'ouverture du mail).

import { reasonLabel, type ContactFields } from "@/lib/contact";
import { CONTACT, OWNER, SITE_HOST, SITE_URL } from "@/lib/site";

/** Délai de réponse promis au visiteur. */
export const REPLY_DELAY = { label: "48 à 72 heures", short: "48 à 72 h", maxHours: 72 } as const;

export type Email = { subject: string; html: string; text: string };

export const COLOR = {
  background: "#0b0a09",
  card: "#151310",
  foreground: "#f2ebdd",
  soft: "#cfc6b6",
  muted: "#9a9082",
  primary: "#ff5b2e",
  primaryForeground: "#170a04",
  border: "#3d3a35",
} as const;

const FONT = {
  display: "Impact, Haettenschweiler, 'Arial Narrow Bold', 'Helvetica Neue', Arial, sans-serif",
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  mono: "'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
} as const;

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Date lisible à l'heure de Paris : « lundi 16 novembre 2026 à 23 h 55 ». */
export function formatParisDate(date: Date): string {
  const day = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const [hours, minutes] = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(date)
    .split(":");
  return `${day} à ${hours} h ${minutes}`;
}

/** Espaces insécables : « 48 à 72 heures » ou un numéro de téléphone ne se coupent pas. */
function nbsp(text: string): string {
  return text.replaceAll(" ", "&nbsp;");
}

function label(text: string, color: string = COLOR.muted): string {
  return `<p style="margin:0 0 8px;font-family:${FONT.mono};font-size:11px;line-height:16px;letter-spacing:3px;text-transform:uppercase;color:${color};">${text}</p>`;
}

function paragraph(html: string, color: string = COLOR.soft): string {
  return `<p style="margin:0 0 16px;font-family:${FONT.sans};font-size:16px;line-height:26px;color:${color};">${html}</p>`;
}

function button(href: string, text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 0;"><tr>
<td bgcolor="${COLOR.primary}" style="border-radius:12px;background:${COLOR.primary};">
<a href="${href}" style="display:inline-block;padding:16px 28px;font-family:${FONT.sans};font-size:16px;line-height:20px;font-weight:700;color:${COLOR.primaryForeground};text-decoration:none;border-radius:12px;">${text}</a>
</td></tr></table>`;
}

function link(href: string, text: string): string {
  return `<a href="${href}" style="color:${COLOR.foreground};text-decoration:underline;">${text}</a>`;
}

/** Une ligne « légende · valeur » de la fiche, comme la fiche technique du site. */
function factRow(name: string, valueHtml: string): string {
  return `<tr>
<td valign="top" style="padding:12px 0;border-top:1px solid ${COLOR.border};width:150px;font-family:${FONT.mono};font-size:11px;line-height:22px;letter-spacing:3px;text-transform:uppercase;color:${COLOR.muted};">${name}</td>
<td valign="top" style="padding:12px 0;border-top:1px solid ${COLOR.border};font-family:${FONT.sans};font-size:16px;line-height:22px;color:${COLOR.foreground};word-break:break-word;">${valueHtml}</td>
</tr>`;
}

function layout({ title, preheader, body }: { title: string; preheader: string; body: string }): string {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${COLOR.background};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.background}" style="background:${COLOR.background};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
<tr><td style="padding:0 0 24px;font-family:${FONT.mono};font-size:12px;line-height:16px;letter-spacing:4px;text-transform:uppercase;color:${COLOR.foreground};">${escapeHtml(OWNER.fullName)}</td></tr>
<tr><td bgcolor="${COLOR.card}" style="background:${COLOR.card};border:1px solid ${COLOR.border};border-radius:18px;padding:36px 32px;">
${body}
</td></tr>
<tr><td style="padding:24px 4px 0;font-family:${FONT.mono};font-size:11px;line-height:18px;letter-spacing:2px;text-transform:uppercase;color:${COLOR.muted};">
<a href="${SITE_URL}" style="color:${COLOR.muted};text-decoration:none;">${SITE_HOST}</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function poster(lines: string[]): string {
  return `<h1 style="margin:0 0 24px;font-family:${FONT.display};font-size:52px;line-height:52px;font-weight:900;letter-spacing:0.5px;text-transform:uppercase;color:${COLOR.foreground};">${lines
    .map((line, index) =>
      index === lines.length - 1 ? `<span style="color:${COLOR.primary};">${line}</span>` : line,
    )
    .join("<br>")}</h1>`;
}

/**
 * Le mail que reçoit Yanis : qui écrit, son message, un bouton pour répondre et l'heure
 * limite promise au visiteur. « Répondre » dans le client mail vise aussi le visiteur.
 */
export function notificationEmail({ name, email, message, reason }: ContactFields, receivedAt: Date): Email {
  const deadline = formatParisDate(new Date(receivedAt.getTime() + REPLY_DELAY.maxHours * 3_600_000));
  const received = formatParisDate(receivedAt);
  const replySubject = encodeURIComponent("Re: votre message sur " + SITE_HOST);
  const replyHref = escapeHtml(`mailto:${email}?subject=${replySubject}`);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);

  const body = [
    label("Formulaire de contact", COLOR.primary),
    poster(["Nouveau", "message."]),
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
${factRow("Nom", safeName)}
${reason ? factRow("Motif", `<span style="color:${COLOR.primary};">${reasonLabel(reason)}</span>`) : ""}
${factRow("E-mail", `<a href="mailto:${safeEmail}" style="color:${COLOR.foreground};">${safeEmail}</a>`)}
${factRow("Reçu le", escapeHtml(received))}
${factRow("Répondre avant", `<span style="color:${COLOR.primary};">${escapeHtml(deadline)}</span>`)}
</table>`,
    label("Message"),
    `<div style="margin:0 0 28px;padding:20px;border-left:3px solid ${COLOR.primary};background:${COLOR.background};border-radius:0 12px 12px 0;font-family:${FONT.sans};font-size:16px;line-height:26px;color:${COLOR.foreground};word-break:break-word;">${escapeHtml(message).replaceAll("\n", "<br>")}</div>`,
    button(replyHref, `Répondre à ${safeName}`),
    `<p style="margin:20px 0 0;font-family:${FONT.sans};font-size:14px;line-height:22px;color:${COLOR.muted};">Un accusé de réception automatique lui annonce une réponse sous ${nbsp(REPLY_DELAY.label)}. Vous pouvez aussi répondre directement à ce mail.</p>`,
  ].join("\n");

  return {
    subject: `${reason ? `[${reasonLabel(reason)}] ` : ""}Nouveau message de ${name} · portfolio`,
    html: layout({
      title: `Nouveau message de ${safeName}`,
      preheader: `${safeName} vous a écrit. Réponse promise avant le ${escapeHtml(deadline)}.`,
      body,
    }),
    text: [
      `NOUVEAU MESSAGE DEPUIS ${SITE_HOST.toUpperCase()}`,
      "",
      `Nom : ${name}`,
      ...(reason ? [`Motif : ${reasonLabel(reason)}`] : []),
      `E-mail : ${email}`,
      `Reçu le : ${received}`,
      `Répondre avant : ${deadline}`,
      "",
      "Message :",
      message,
      "",
      `Répondez simplement à ce mail : la réponse part vers ${email}.`,
      `Un accusé de réception automatique lui annonce une réponse sous ${REPLY_DELAY.label}.`,
    ].join("\n"),
  };
}

/**
 * L'accusé de réception envoyé au visiteur. Il ne recopie rien de la saisie, ni le message
 * ni le nom : il part vers l'adresse saisie, quelle qu'elle soit, et le formulaire permettrait
 * sinon d'envoyer un texte choisi à n'importe qui depuis le domaine du site. Une réponse à ce
 * mail arrive chez Yanis.
 */
export function confirmationEmail(): Email {
  const body = [
    label("Message reçu", COLOR.primary),
    poster(["Bien reçu,", "je reviens", "vers vous."]),
    paragraph("Bonjour,", COLOR.foreground),
    paragraph(
      `Merci pour votre message envoyé depuis mon portfolio. Je l'ai bien reçu et je vous réponds <strong style="color:${COLOR.foreground};">sous ${nbsp(REPLY_DELAY.label)} maximum</strong>, à cette adresse <span style="white-space:nowrap;">e-mail</span>.`,
    ),
    paragraph(
      `Besoin d'aller plus vite&nbsp;? Appelez-moi au ${link(`tel:${CONTACT.phoneE164}`, nbsp(CONTACT.phone))}, ou répondez simplement à ce mail.`,
    ),
    paragraph(`À très vite,<br><span style="color:${COLOR.foreground};">${escapeHtml(OWNER.firstName)}</span>`),
    button(SITE_URL, "Revoir le portfolio"),
    `<p style="margin:28px 0 0;padding:16px 0 0;border-top:1px solid ${COLOR.border};font-family:${FONT.sans};font-size:13px;line-height:20px;color:${COLOR.muted};">Ce mail automatique confirme l'envoi du formulaire de contact de ${link(SITE_URL, SITE_HOST)}. Si vous n'en êtes pas à l'origine, ignorez-le&nbsp;: vous ne recevrez rien d'autre.</p>`,
  ].join("\n");

  return {
    subject: `Message bien reçu · ${OWNER.firstName} vous répond sous ${REPLY_DELAY.short}`,
    html: layout({
      title: "Message bien reçu",
      preheader: `Je vous réponds sous ${REPLY_DELAY.label} maximum.`,
      body,
    }),
    text: [
      "Bonjour,",
      "",
      `Merci pour votre message envoyé depuis mon portfolio. Je l'ai bien reçu et je vous réponds sous ${REPLY_DELAY.label} maximum, à cette adresse e-mail.`,
      "",
      `Besoin d'aller plus vite ? Appelez-moi au ${CONTACT.phone}, ou répondez simplement à ce mail.`,
      "",
      "À très vite,",
      OWNER.firstName,
      "",
      "—",
      `Ce mail automatique confirme l'envoi du formulaire de contact de ${SITE_HOST}. Si vous n'en êtes pas à l'origine, ignorez-le : vous ne recevrez rien d'autre.`,
    ].join("\n"),
  };
}

/** Les deux mails d'un message, repérés par une étiquette Resend que reprend le webhook. */
export type ContactMailKind = "notification" | "confirmation";

/**
 * L'alerte envoyée à Yanis quand Resend signale qu'un mail du formulaire n'est pas arrivé.
 * Le cas utile : l'accusé de réception rejeté, signe d'une adresse mal saisie, à laquelle
 * une réponse n'arriverait pas non plus.
 */
export function rejectionAlertEmail({
  recipient,
  kind,
  detail,
  at,
}: {
  recipient: string;
  kind: ContactMailKind;
  detail: string;
  at: Date;
}): Email {
  const safeRecipient = escapeHtml(recipient);
  const what =
    kind === "confirmation"
      ? "L'accusé de réception du formulaire de contact n'a pas pu être remis."
      : "Une notification du formulaire de contact n'a pas pu être remise.";
  const advice =
    kind === "confirmation"
      ? "L'adresse saisie par le visiteur est sans doute fausse : une réponse n'arriverait pas non plus. Vérifiez l'adresse dans la notification correspondante, ou cherchez un autre moyen de le joindre."
      : "Vérifiez la variable CONTACT_TO_EMAIL dans Vercel et l'état de cette boîte : les messages du formulaire risquent de ne pas vous parvenir.";
  const when = formatParisDate(at);

  const body = [
    label("Alerte · formulaire de contact", COLOR.primary),
    poster(["Mail", "non remis."]),
    paragraph(what, COLOR.foreground),
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
${factRow("Adresse", safeRecipient)}
${factRow("Raison", escapeHtml(detail))}
${factRow("Le", escapeHtml(when))}
</table>`,
    paragraph(advice),
  ].join("\n");

  return {
    subject: `Alerte · mail non remis à ${recipient}`,
    html: layout({ title: "Mail non remis", preheader: escapeHtml(what), body }),
    text: [what, "", `Adresse : ${recipient}`, `Raison : ${detail}`, `Le : ${when}`, "", advice].join("\n"),
  };
}
