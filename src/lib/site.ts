export const SITE_URL = "https://yanis-harrat.com";
export const SITE_HOST = new URL(SITE_URL).host;
export const SITE_NAME = "Yanis Harrat";

// Next fusionne openGraph de façon superficielle : chaque page qui définit le sien
// repart de cette base. Pas de description ici, pour qu'elle ne fuie pas sur les autres pages.
export const BASE_OPEN_GRAPH = {
  locale: "fr_FR",
  siteName: SITE_NAME,
} as const;
