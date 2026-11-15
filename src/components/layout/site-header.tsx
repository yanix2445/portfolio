"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CONTACT, OWNER } from "@/lib/site";

const NAV_LINKS = [
  { href: "/projets", label: "Projets" },
  { href: "/veille", label: "Veille" },
  { href: "/contact", label: "Contact" },
] as const;

// En-tête fixe : transparent en haut de page (il laisse voir le hero), puis sur fond
// dès que la page a défilé. Sans JavaScript, il reste transparent et lisible.
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="type-label fixed inset-x-0 top-0 z-50 h-header transition-colors duration-300 data-[scrolled=true]:bg-background/85 data-[scrolled=true]:backdrop-blur-md"
    >
      <div className="flex h-full items-center justify-between gap-3 px-gutter">
        <Link href="/" className="rounded-sm whitespace-nowrap">
          {OWNER.fullName}
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="flex items-center gap-3 md:gap-[2.4vw]">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-sm text-foreground/75 transition-colors duration-200 hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="max-sm:hidden">
              <Button asChild variant="outline" size="label">
                <a href={`tel:${CONTACT.phoneE164}`}>Appeler</a>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
