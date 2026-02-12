import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  return {
    title: {
      default: "Yanis Mohamed-Amine Harrat | Portfolio | " + (isFr ? "Systèmes & Réseaux" : "Systems & Networks"),
      template: "%s | Yanis Mohamed-Amine Harrat"
    },
    description: isFr
      ? "Yanis Mohamed-Amine Harrat - Portfolio professionnel présentant une expertise en Systèmes & Réseaux (BTS SIO SISR) et Logique Logicielle (École 42 Paris)."
      : "Yanis Mohamed-Amine Harrat - Professional portfolio showcasing expertise in Systems & Networks (BTS SIO SISR) and Software Logic (Ecole 42 Paris).",
    metadataBase: new URL("https://yanis-harrat.com"),
    alternates: {
      canonical: "/",
      languages: {
        'fr': '/fr',
        'en': '/en',
      },
    },
    openGraph: {
      title: "Yanis Mohamed-Amine Harrat | Portfolio",
      description: isFr
        ? "Spécialiste Systèmes & Réseaux | Ingénieur Logique Logicielle"
        : "Systems & Networks Specialist | Software Logic Engineer",
      url: "https://yanis-harrat.com",
      siteName: "Yanis Mohamed-Amine Harrat Portfolio",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Yanis Mohamed-Amine Harrat | Portfolio",
      description: isFr
        ? "Spécialiste Systèmes & Réseaux | Ingénieur Logique Logicielle"
        : "Systems & Networks Specialist | Software Logic Engineer",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
