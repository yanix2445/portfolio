import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BASE_OPEN_GRAPH, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Les trois polices de la maquette « Générique », servies depuis le site.
const display = localFont({
  src: "./fonts/big-shoulders.woff2",
  variable: "--font-big-shoulders",
  weight: "100 900",
  display: "swap",
});

const sans = localFont({
  src: "./fonts/hanken-grotesk.woff2",
  variable: "--font-hanken",
  weight: "100 900",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const DESCRIPTION =
  "Portfolio de Yanis Harrat, futur alternant technicien systèmes et réseaux (BTS SIO SISR) : projets infrastructure et réseau, veille technologique et CV.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Technicien systèmes et réseaux en alternance`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  openGraph: { ...BASE_OPEN_GRAPH, type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${sans.variable} ${mono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Premier arrêt au clavier : sauter l'en-tête. Invisible tant qu'il n'a pas le focus. */}
        <a
          href="#contenu"
          className="type-label sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-gutter focus:z-60 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground focus-visible:outline-background focus-visible:-outline-offset-4"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" tabIndex={-1} className="flex flex-1 flex-col pt-header focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
