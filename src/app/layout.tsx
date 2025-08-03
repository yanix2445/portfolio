import "./globals.css";
import NavBar from "@/components/navbar";
import { ThemeProvider } from "@/utils/theme-provider";
import { siteMetadata } from "@/lib/metadata";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = siteMetadata;
console.log("Métadonnées générées:", siteMetadata);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VQCGSGZRMX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-VQCGSGZRMX');
                `,
          }}
        />
      </head>
      <body>
        {/* Vercel Analytics */}
        <Analytics />
        {/* Vercel Speed Insights */}
        <SpeedInsights />
        {/* Style globale du theme */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Navigation Bar */}
          <NavBar />

          {/* Contenu principal */}
          {children}
        </ThemeProvider>

        {/* Footer ( pied de page ) */}
        <footer className="w-full py-12 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Yanis Harrat. Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
