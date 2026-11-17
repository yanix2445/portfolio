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

export const OWNER = {
  firstName: "Yanis",
  lastName: "HARRAT",
  fullName: "Yanis HARRAT",
  jobTitle: "Technicien systèmes et réseaux, BTS SIO SISR en alternance",
} as const;

export const CONTACT = {
  email: "yanis@yanis-harrat.com",
  phone: "07 68 18 79 34",
  // Format E.164 pour les liens tel: et le balisage schema.org.
  phoneE164: "+33768187934",
  linkedin: "https://www.linkedin.com/in/yanis-harrat/",
  github: "https://github.com/yanix2445",
} as const;
