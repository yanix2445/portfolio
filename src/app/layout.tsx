import "./globals.css";
import NavBar from "@/components/navbar";
import { ThemeProvider } from "@/utils/theme-provider";
import { siteMetadata } from "@/lib/metadata";


export const metadata = siteMetadata;
console.log('Métadonnées générées:', siteMetadata);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
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
