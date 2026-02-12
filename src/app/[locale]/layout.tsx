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
      default: isFr
        ? "Yanis Harrat | Étudiant & Apprenti Ingénieur (SISR / 42 Paris)"
        : "Yanis Harrat | Student & Apprentice Engineer (SISR / 42 Paris)",
      template: "%s | Yanis Harrat"
    },
    description: isFr
      ? "Découvrez mon parcours d'étudiant passionné en Systèmes & Réseaux et Logique Logicielle. Actuellement en BTS SIO SISR et à l'École 42 Paris, je construis mon expertise technique."
      : "Explore my journey as a passionate student in Systems & Networks and Software Logic. Currently at BTS SIO SISR and 42 Paris, building my technical expertise.",
    keywords: isFr
      ? ["Yanis Harrat", "Étudiant", "BTS SIO", "SISR", "École 42", "Paris", "Systèmes et Réseaux", "Logique Logicielle", "Alternance", "Portfolio"]
      : ["Yanis Harrat", "Student", "BTS SIO", "SISR", "Ecole 42", "Paris", "Systems and Networks", "Software Logic", "Apprenticeship", "Portfolio"],
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
        ? "Yanis Harrat | Étudiant & Apprenti Ingénieur"
        : "Yanis Harrat | Student & Apprentice Engineer",
      description: isFr
        ? "Parcours en Systèmes & Réseaux (BTS SIO) et Logique Logicielle (42 Paris)"
        : "Education in Systems & Networks (BTS SIO) and Software Logic (42 Paris)",
      url: "https://yanis-harrat.com",
      siteName: "Yanis Harrat Portfolio",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Yanis Harrat | Portfolio Étudiant",
      description: isFr
        ? "Étudiant passionné en Systèmes & Réseaux et Développement"
        : "Passionate Student in Systems & Networks and Development",
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
