import Link from "next/link";

import { CONTACT, OWNER } from "@/lib/site";

const LINK = "rounded-sm text-ash transition-colors duration-150 hover:text-bone";

const EXTERNAL_LINKS = [
  { href: CONTACT.linkedin, label: "LinkedIn" },
  { href: CONTACT.github, label: "GitHub" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="page-container flex flex-col gap-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ash">
          {OWNER.fullName} · <span className="font-serif text-[1.0625rem] italic">Paris</span>
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <li>
            <a href={`mailto:${CONTACT.email}`} className={LINK}>
              {CONTACT.email}
            </a>
          </li>
          {EXTERNAL_LINKS.map(({ href, label }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer me" className={LINK}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/mentions-legales" className={LINK}>
              Mentions légales
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
