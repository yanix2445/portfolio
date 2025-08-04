import "./globals.css";
import NavBar from "@/components/navbar";
import { ThemeProvider } from "@/utils/theme-provider";
import { siteMetadata } from "@/lib/metadata";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";

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
          <ThemeProvider attribute="class" defaultTheme="dark " enableSystem>
            {/* Navigation Bar */}
            {/*<NavBar /*/}

            {/* Contenu principal */}
            {children}
          </ThemeProvider>
          {/* Footer */}
          <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-8 text-center gap-1">
              <p className="flex justify-center flex-col items-center text-sm text-muted-foreground ">
                <span>Portfolio en travaux, mais ça avance bien 🚀</span>
                <span className="text-primary font-medium gap-1">
                  {" "}
                  Merci pour ta patience !
                </span>
              </p>
            </div>
          </footer>
          <Toaster />
        </body>
    </html>
  );
}
