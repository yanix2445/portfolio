"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BookCallLink } from "@/components/contact/book-call-link";
import { Button } from "@/components/ui/button";
import { CV_PATH, OWNER } from "@/lib/site";

const NAV_LINKS = [
  { href: "/projets", label: "Projets" },
  { href: "/veille", label: "Veille" },
  { href: "/contact", label: "Contact" },
] as const;

// Zone cliquable d'environ 40 px de haut sans décaler la ligne : la marge négative
// rend l'espace pris par le remplissage.
const HIT_AREA = "-my-3 py-3";

// En-tête fixe : transparent en haut de page (il laisse voir le hero), puis sur un fond plein
// bordé d'un filet dès que la page a défilé. Sans JavaScript, il reste transparent et lisible.
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="fixed inset-x-0 top-0 z-50 h-header border-b border-transparent font-mono text-nav uppercase transition-[background-color,border-color] duration-300 ease-poster data-[scrolled=true]:border-border data-[scrolled=true]:bg-background"
    >
      <div className="flex h-full items-center justify-between gap-3 px-gutter">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className={`${HIT_AREA} rounded-sm whitespace-nowrap transition-colors duration-200 hover:text-primary`}
        >
          {OWNER.fullName}
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="flex items-center gap-2.5 sm:gap-4 md:gap-[2.2vw]">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={
                    pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined
                  }
                  className={`${HIT_AREA} block rounded-sm text-foreground/75 underline-offset-[0.6em] transition-colors duration-200 hover:text-foreground aria-[current=page]:text-primary aria-[current=page]:underline aria-[current=page]:decoration-1`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="max-md:hidden md:ml-[0.6vw]">
              <Button asChild variant="outline" size="label">
                <a href={CV_PATH} target="_blank" rel="noopener">
                  CV
                </a>
              </Button>
            </li>
            <li className="max-sm:hidden">
              <Button asChild variant="outline" size="label">
                <BookCallLink />
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
