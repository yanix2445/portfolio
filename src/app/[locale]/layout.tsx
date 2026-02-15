import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
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
      default: isFr
        ? "Yanis Harrat | Étudiant en Systèmes & Réseaux (BTS SIO SISR)"
        : "Yanis Harrat | IT Student | Systems & Networks (BTS SIO SISR)",
      template: "%s | Yanis Harrat"
    },
    description: isFr
      ? "Explorez le portfolio de Yanis Harrat, étudiant passionné en Systèmes & Réseaux (BTS SIO SISR). Spécialisé en infrastructures informatiques et cybersécurité."
      : "Explore the portfolio of Yanis Harrat, an IT student specialized in Systems & Networks (BTS SIO SISR). Focusing on IT infrastructure and cybersecurity.",
    keywords: isFr
      ? ["Yanis Harrat", "Étudiant", "BTS SIO", "SISR", "Systèmes et Réseaux", "Informatique", "Cybersécurité", "Infrastructures", "Alternance", "Portfolio"]
      : ["Yanis Harrat", "IT Student", "BTS SIO", "SISR", "Systems and Networks", "Computing", "Cybersecurity", "Infrastructure", "Apprenticeship", "Portfolio"],
    metadataBase: new URL("https://yanis-harrat.com"),
    alternates: {
      canonical: "/",
      languages: {
        'fr': '/fr',
        'en': '/en',
      },
    },
    openGraph: {
      title: isFr
        ? "Yanis Harrat | Étudiant en Systèmes & Réseaux"
        : "Yanis Harrat | IT Student | Systems & Networks",
      description: isFr
        ? "Étudiant en BTS SIO SISR spécialisé en infrastructures et réseaux."
        : "IT Student at BTS SIO SISR specialized in infrastructure and networks.",
      url: "https://yanis-harrat.com",
      siteName: "Yanis Harrat Portfolio",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Yanis Harrat | Portfolio Étudiant",
      description: isFr
        ? "Étudiant en BTS SIO SISR - Systèmes & Réseaux"
        : "IT Student at BTS SIO SISR - Systems & Networks",
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
        <Analytics />
      </body>
    </html>
  );
}
