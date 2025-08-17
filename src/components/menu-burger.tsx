"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { ModeToggle } from "./toogle-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BurgerMenuProps {
  navLinks: { id: number; name: string; href: string }[];
  socialLinks: { href: string; icon: any; alt: string }[];
  variant: "mobile" | "tablet";
}

export function BurgerMenu({
  navLinks,
  socialLinks,
  variant,
}: BurgerMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Détermine quels liens restent à mettre dans le burger
  const sliceIndex = variant === "mobile" ? 0 : 0;
  const linksToShow = navLinks.slice(sliceIndex);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Ouvrir le menu"
          className="p-2 rounded-full hover:bg-gray-200/30 dark:hover:bg-gray-700/30 transition"
        >
          {isMenuOpen ? (
            <HiX className="w-6 h-6 transition-transform duration-300" />
          ) : (
            <HiMenuAlt3 className="w-6 h-6 transition-transform duration-300" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={2}
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-1 w-56 flex flex-col gap-1 mr-2.5"
      >
        {/* Liens navigation */}
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-1">
          {navLinks.map(({ name, href }) => (
            <DropdownMenuItem key={href} asChild>
              <Link
                href={href}
                className="w-full px-2 py-1 rounded hover:bg-primary/10 dark:hover:bg-primary/20 text-gray-900 dark:text-white text-sm font-medium"
                onClick={() => setIsMenuOpen(false)} // fermé seulement sur les liens
              >
                {name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* Toggle mode */}
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <div className="flex items-center gap-2 px-2 py-1">
          <ModeToggle />
          <span className="text-gray-900 dark:text-white text-sm">Mode</span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Reseaux Social</DropdownMenuLabel>

        {/* Réseaux sociaux */}
        <div className="flex gap-3 px-2 py-1">
          {socialLinks.map(({ href, icon: Icon, alt }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              aria-label={alt}
              className="p-1 rounded-full hover:bg-gray-200/30 dark:hover:bg-gray-700/30 transition"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
