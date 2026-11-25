import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isDev = process.env.NODE_ENV === "development";
// Les previews Vercel chargent la barre d'outils Vercel depuis vercel.live.
const isPreview = process.env.VERCEL_ENV === "preview";

const TURNSTILE = "https://challenges.cloudflare.com";
// Réservation d'un appel : le script de l'embed et le calendrier dans sa fenêtre.
const CAL = "https://app.cal.com";
const VERCEL_LIVE = isPreview ? " https://vercel.live" : "";
// Mode Live d'Impeccable : en développement seulement.
const __impeccableLiveDev = isDev ? " http://localhost:8400" : "";

// Politique de sécurité du contenu, sans nonce : un nonce imposerait le rendu dynamique, et le
// site est prérendu. `'unsafe-inline'` reste donc nécessaire pour les scripts de Next (et le
// JSON-LD) et pour les styles posés par GSAP ; la politique limite surtout les origines.
// Vercel Analytics est servi par le site lui-même (`/_vercel/insights`).
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""} ${TURNSTILE} ${CAL}${VERCEL_LIVE}${__impeccableLiveDev}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${VERCEL_LIVE}`,
  "font-src 'self'",
  `connect-src 'self'${VERCEL_LIVE}${__impeccableLiveDev}`,
  `frame-src ${TURNSTILE} ${CAL}${VERCEL_LIVE}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  // Pour les navigateurs qui ignorent `frame-ancestors`.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

// Sous Turbopack, les plugins remark/rehype se déclarent sous forme de strings.
const withMDX = createMDX({});

export default withMDX(nextConfig);
