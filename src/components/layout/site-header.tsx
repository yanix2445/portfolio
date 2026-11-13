import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";

import { OWNER } from "@/lib/site";

export const CV_PATH = "/cv/yanis-harrat-cv.pdf";

const NAV_LINKS = [
  { href: "/projets", label: "Projets" },
  { href: "/veille", label: "Veille" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="page-container flex min-h-14 flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2 sm:gap-x-6">
        <Link
          href="/"
          className="-mx-1 rounded-sm px-1 py-1 text-sm font-semibold tracking-[-0.01em] whitespace-nowrap text-bone sm:text-[0.9375rem]"
        >
          {OWNER.firstName} <span className="[font-stretch:88%]">{OWNER.lastName}</span>
        </Link>
        <nav aria-label="Navigation principale" className="-mr-1.5 sm:mr-0">
          <ul className="flex items-center text-[0.8125rem] sm:gap-x-2 sm:text-sm">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-sm px-1.5 py-2 text-ash transition-colors duration-150 hover:text-bone sm:px-2"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="ml-1.5 sm:ml-3">
              <a
                href={CV_PATH}
                target="_blank"
                rel="noopener"
                aria-label="CV (PDF)"
                className="flex items-center gap-1.5 rounded-md border border-rule-strong px-2.5 py-1.5 font-medium text-bone transition-colors duration-150 hover:border-bone/60 sm:px-3"
              >
                CV
                <ArrowDownToLine aria-hidden className="hidden size-3.5 text-ash sm:block" strokeWidth={1.75} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
