export const SITE_URL = "https://yanis-harrat.com";
export const SITE_HOST = new URL(SITE_URL).host;
export const SITE_NAME = "Yanis Harrat";
export const CV_PATH = "/cv/yanis-harrat-cv.pdf";

// Next fusionne openGraph de façon superficielle : chaque page qui définit le sien
// repart de cette base. Pas de description ici, pour qu'elle ne fuie pas sur les autres pages.
export const BASE_OPEN_GRAPH = {
  locale: "fr_FR",
  siteName: SITE_NAME,
} as const;

// L'image de partage du site (`src/app/opengraph-image.tsx`). Une page qui définit son propre
// openGraph perd celle du layout : elle la redonne explicitement, faute d'image à elle.
export const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Yanis Harrat, technicien systèmes et réseaux : alternance de deux ans à Paris à partir de septembre 2027",
} as const;

export const OWNER = {
  firstName: "Yanis",
  lastName: "HARRAT",
  fullName: "Yanis HARRAT",
  jobTitle: "Technicien systèmes et réseaux, BTS SIO SISR en alternance",
} as const;

// Pas de numéro de téléphone sur le site (choix de Yanis, 2026-11-25) : on réserve un appel.
export const CONTACT = {
  email: "yanis@yanis-harrat.com",
  linkedin: "https://www.linkedin.com/in/yanis-harrat/",
  github: "https://github.com/yanix2445",
} as const;

/** Réservation d'un appel de 15 minutes sur Cal.com, ouverte dans une fenêtre par l'embed officiel. */
export const BOOKING = {
  label: "Réserver un appel",
  url: "https://cal.com/yanis-harrat/rdv-15min",
  calLink: "yanis-harrat/rdv-15min",
  namespace: "rdv-15min",
} as const;
