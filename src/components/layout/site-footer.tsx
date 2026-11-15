import Link from "next/link";

import { CONTACT, OWNER } from "@/lib/site";

const EXTERNAL_LINKS = [
  { href: CONTACT.github, label: "GitHub" },
  { href: CONTACT.linkedin, label: "LinkedIn" },
] as const;

const LINK = "rounded-sm transition-colors duration-200 hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="type-label border-t border-border text-muted-foreground">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 px-gutter py-7">
        <p>© {OWNER.fullName}</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <li>
            <a href={`mailto:${CONTACT.email}`} className={LINK}>
              {CONTACT.email}
            </a>
          </li>
          <li>
            <Link href="/mentions-legales" className={LINK}>
              Mentions légales
            </Link>
          </li>
          {EXTERNAL_LINKS.map(({ href, label }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer me" className={LINK}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
