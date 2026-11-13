import Link from "next/link";

// URL des profils publics, à compléter avec les identifiants réels.
const EXTERNAL_LINKS = [
  { href: "https://github.com/", label: "GitHub" },
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground">
        <p>© Yanis Harrat</p>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/mentions-legales" className="hover:text-foreground">
              Mentions légales
            </Link>
          </li>
          {EXTERNAL_LINKS.map(({ href, label }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
