import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BASE_OPEN_GRAPH, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Trois voix auto-hébergées (OFL 1.1, licences dans public/fonts/).
// Grotesque serrée pour les titres et le texte courant.
const archivo = localFont({
  src: "../../public/fonts/archivo-variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

// Serif italique pour les mots humains.
const bodoni = localFont({
  src: "../../public/fonts/bodoni-moda-italic-variable.woff2",
  variable: "--font-bodoni",
  weight: "400 900",
  style: "italic",
  display: "swap",
  // Pas de préchargement : la bande passante du premier rendu va au texte courant (LCP).
  preload: false,
});

// Police pixel, réservée aux chiffres et aux identifiants de tickets.
const departure = localFont({
  src: "../../public/fonts/departure-mono.woff2",
  variable: "--font-departure",
  weight: "400",
  display: "swap",
  preload: false,
});

const DESCRIPTION =
  "Yanis HARRAT, technicien systèmes & réseaux en alternance (BTS SIO SISR, 3 j / 2 j) : helpdesk N1/N2 en production, Active Directory, Microsoft 365. Projets, veille et CV.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Technicien systèmes & réseaux en alternance`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  openGraph: { ...BASE_OPEN_GRAPH, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#121114",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${archivo.variable} ${bodoni.variable} ${departure.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenu"
          className="sr-only z-50 rounded-md bg-tungsten px-4 py-2 font-medium text-tungsten-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
