import "./globals.css";
// import NavBar from "@/components/navbar";
import { ThemeProvider } from "@/utils/theme-provider";
import { siteMetadata } from "@/lib/metadata";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import FloatingDots from "@/components/floatingDots";
import Script from "next/script";
import Footer from "@/components/footer";

// Métadonnées globales pour Next.js
export const metadata = siteMetadata;


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      
      {/* Script Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-VQCGSGZRMX"
        strategy="afterInteractive"
      />

      {/* Initialisation de Google Analytics */}
      <Script
        id="google-analytics-inline"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VQCGSGZRMX');
            `,
        }}
      />

      <body>
        {/* Effets visuels d'arrière-plan */}
        <FloatingDots />

        {/* Analytics Vercel */}
        <Analytics />

        {/* Performance Vercel */}
        <SpeedInsights />

        {/* Thème global (dark, light, system) */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>

          {/* Navigation principale */}
          {/* <NavBar /> */}

          {/* Contenu de la page */}
          {children}

          {/* Pied de page */}
          <Footer />

          {/* Notifications toast */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}