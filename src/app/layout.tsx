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
  "Portfolio de Yanis Harrat, étudiant en BTS SIO option SISR : projets infrastructure et réseau, veille technologique et CV.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Portfolio BTS SIO SISR`,
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
        <SiteHeader />
        <main className="flex flex-1 flex-col pt-(--header-h)">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
