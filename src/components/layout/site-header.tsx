import Link from "next/link";

export const CV_PATH = "/cv/yanis-harrat-cv.pdf";

const NAV_LINKS = [
  { href: "/projets", label: "Projets" },
  { href: "/veille", label: "Veille" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="focus-ring rounded-sm font-semibold tracking-tight">
          Yanis Harrat
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="flex items-center gap-4 text-sm">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="focus-ring rounded-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={CV_PATH}
                target="_blank"
                rel="noopener"
                className="focus-ring rounded-md border px-3 py-1.5 font-medium transition-colors duration-150 hover:border-brand/50 hover:bg-muted"
              >
                CV (PDF)
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
