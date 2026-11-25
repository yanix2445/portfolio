// Contenu des mentions légales : l'hébergeur, les prestataires et chaque traitement de
// données. Les faits viennent des pages officielles des services (vérifiées le 2026-11-25) ;
// toute nouvelle donnée collectée ou tout nouveau service doit être ajouté ici.

/** Date de la dernière mise à jour du texte, affichée en tête de page. */
export const LEGAL_UPDATED = "2026-11-25";

export const HOST = {
  name: "Vercel Inc.",
  address: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
  url: "https://vercel.com",
} as const;

/** Les services qui traitent des données pour le site, dans l'ordre où le visiteur les croise. */
export const PROVIDERS = [
  { role: "Hébergement et mesure d'audience", name: "Vercel Inc.", country: "États-Unis" },
  { role: "Envoi des e-mails", name: "Resend (Plus Five Five, Inc.)", country: "États-Unis" },
  { role: "Protection anti-spam", name: "Cloudflare, Inc.", country: "États-Unis" },
  { role: "Prise de rendez-vous", name: "Cal.com, Inc.", country: "États-Unis" },
] as const;

/** Durée de conservation des échanges, dans la boîte mail et dans l'agenda de Yanis. */
const EXCHANGE_RETENTION = "2 ans au plus après le dernier échange";

export type Treatment = {
  title: string;
  data: string;
  purpose: string;
  basis: string;
  retention: string;
  recipients: string;
};

export const TREATMENTS: readonly Treatment[] = [
  {
    title: "Formulaire de contact",
    data: "Nom, adresse e-mail, motif et message.",
    purpose: "Vous répondre. Un e-mail automatique vous confirme la réception ; il ne reprend ni votre nom ni votre message.",
    basis: "Intérêt légitime : répondre aux messages reçus (art. 6.1.f du RGPD).",
    retention: `30 jours chez Resend, qui achemine les e-mails. Dans la boîte mail de Yanis : ${EXCHANGE_RETENTION}.`,
    recipients: "Yanis HARRAT ; Resend, pour l'envoi.",
  },
  {
    title: "Réservation d'un appel",
    data: "Nom, adresse e-mail, créneau choisi et message éventuel, saisis dans la fenêtre Cal.com.",
    purpose: "Organiser l'appel de 15 minutes que vous demandez.",
    basis: "Votre demande de rendez-vous (art. 6.1.b du RGPD).",
    retention: `Dans l'agenda de Yanis : ${EXCHANGE_RETENTION}.`,
    recipients: "Yanis HARRAT ; Cal.com, qui gère la réservation.",
  },
  {
    title: "Protection anti-spam",
    data: "Signaux techniques du navigateur : adresse IP, empreinte de connexion, navigateur.",
    purpose: "Distinguer un humain d'un robot avant l'envoi du formulaire. Aucun profil n'est créé.",
    basis: "Intérêt légitime : protéger le formulaire contre le spam (art. 6.1.f du RGPD).",
    retention: "Fixée par Cloudflare, selon sa politique Turnstile.",
    recipients: "Cloudflare.",
  },
  {
    title: "Limite d'envois",
    data: "Adresse IP.",
    purpose: "Bloquer les envois en rafale : 5 messages au plus par tranche de 10 minutes.",
    basis: "Intérêt légitime : protéger le site contre les abus (art. 6.1.f du RGPD).",
    retention: "Le temps du compteur, 10 minutes.",
    recipients: "Vercel, pare-feu de l'hébergeur.",
  },
  {
    title: "Mesure d'audience",
    data: "Page vue, page de provenance, pays, type d'appareil, système et navigateur.",
    purpose: "Savoir quelles pages sont lues, en statistiques globales. Sans cookie ni identifiant qui vous suive d'un site à l'autre.",
    basis: "Intérêt légitime : mesurer la fréquentation du site (art. 6.1.f du RGPD).",
    retention: "La session de visite est effacée après 24 heures ; seules restent des statistiques globales.",
    recipients: "Vercel Analytics.",
  },
  {
    title: "Fonctionnement du site",
    data: "Adresse IP et page demandée, comme pour tout site web.",
    purpose: "Afficher les pages et diagnostiquer une panne.",
    basis: "Intérêt légitime : faire fonctionner le site (art. 6.1.f du RGPD).",
    retention: "Journaux techniques consultables par l'éditeur : 1 heure.",
    recipients: "Vercel, hébergeur.",
  },
];
