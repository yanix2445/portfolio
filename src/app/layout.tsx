import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yanis Harrat | Portfolio | Systems & Networks",
  description: "Yanis Harrat - Professional portfolio showcasing expertise in Systems & Networks (BTS SIO SISR) and Software Logic (Ecole 42 Paris).",
  metadataBase: new URL("https://yanis-harrat.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yanis Harrat | Portfolio",
    description: "Systems & Networks Specialist | Software Logic Engineer",
    url: "https://yanis-harrat.com",
    siteName: "Yanis Harrat Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yanis Harrat | Portfolio",
    description: "Systems & Networks Specialist | Software Logic Engineer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
