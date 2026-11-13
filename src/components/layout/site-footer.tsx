import Link from "next/link";

import { CONTACT, OWNER } from "@/lib/site";

const EXTERNAL_LINKS = [
  { href: CONTACT.github, label: "GitHub" },
  { href: CONTACT.linkedin, label: "LinkedIn" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground">
        <p>© {OWNER.fullName}</p>
        <ul className="flex flex-wrap items-center gap-4">
          <li>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-foreground">
              {CONTACT.email}
            </a>
          </li>
          <li>
            <Link href="/mentions-legales" className="hover:text-foreground">
              Mentions légales
            </Link>
          </li>
          {EXTERNAL_LINKS.map(({ href, label }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer me" className="hover:text-foreground">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
