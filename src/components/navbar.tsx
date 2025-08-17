"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ModeToggle } from "./toogle-theme";
import { FaLinkedin, FaSquareXTwitter, FaGithub } from "react-icons/fa6";
import { BurgerMenu } from "./menu-burger";

const navLinks = [
  { id: 1, name: "Accueil", href: "/Accueil" },
  { id: 2, name: "Parcours", href: "/Parcours" },
  { id: 3, name: "Portfolio", href: "/Portfolio" },
  { id: 4, name: "Contact", href: "/Contact" },
  { id: 5, name: "Ressources", href: "/Ressources" },
  { id: 6, name: "Blog", href: "/Blog" },
];

const socialLinks = [
  { href: "https://github.com/yanix2445", icon: FaGithub, alt: "GitHub" },
  { href: "https://x.com/yanix_213", icon: FaSquareXTwitter, alt: "Twitter" },
  {
    href: "https://www.linkedin.com/in/yanis-harrat",
    icon: FaLinkedin,
    alt: "LinkedIn",
  },
];

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  // Les autres liens seront accessibles via le menu burger.
  const mobileVisibleLinks = navLinks.filter((link) =>
    ["Portfolio", "Contact"].includes(link.name)
  );
  // Les autres liens ("Ressources", "Blog") passent dans le menu burger.
  const tabletVisibleLinks = navLinks.filter((link) =>
    ["Accueil", "Parcours", "Portfolio", "Contact"].includes(link.name)
  );

  // Sur desktop : tous les liens sont affichés directement dans la navbar.
  const desktopVisibleLinks = navLinks; // Affichage complet

  // Sur mobile : tous les liens qui ne sont pas dans mobileVisibleLinks vont dans le burger.
  const mobileBurgerLinks = navLinks.filter(
    (link) => !mobileVisibleLinks.includes(link)
  );
  // Sur tablette : tous les liens qui ne sont pas dans tabletVisibleLinks vont dans le burger.
  const tabletBurgerLinks = navLinks.filter(
    (link) => !tabletVisibleLinks.includes(link)
  );

  return (
    <nav
      className={`
        fixed top-2 sm:top-3 lg:top-4 left-1/2 -translate-x-1/2
        w-[96vw] sm:w-[85vw] lg:w-[90vw] xl:w-[85vw] 2xl:max-w-5xl
        rounded-full bg-white/40 dark:bg-gray-900/60
        backdrop-blur-sm shadow-xl dark:shadow-gray-900/60
        border border-white/30 dark:border-gray-700/60
        flex items-center justify-between
        px-3 sm:px-5 lg:px-8 py-2 sm:py-2.5 lg:py-3
        transition-all duration-300 overflow-hidden
        ${isVisible ? "animate-navbar-slide-down" : "opacity-0"}
      `}
      aria-label="Navigation principale"
    >
      {/* MOBILE */}
      <div className="flex items-center justify-between w-full sm:hidden">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 max-w-[30%] pl-4">
          <span className="block logo-font text-lg text-black dark:text-white transform -rotate-12 -ml-1">
            Yanis
          </span>
          <span className="block logo-font text-base text-black dark:text-white transform -rotate-12 -mt-0.5 ml-1">
            Harrat
          </span>
        </Link>

        {/* Liens visibles */}
        <ul className="flex gap-3">
          {mobileVisibleLinks.map((link) => (
            <li key={link.id}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Burger */}
        <BurgerMenu
          navLinks={mobileBurgerLinks}
          socialLinks={socialLinks}
          variant="mobile"
        />
      </div>

      {/* TABLETTE */}
      <div className="hidden sm:flex lg:hidden items-center justify-between w-full min-w-0 px-6">
        {/* Logo */}
         {/* Logo */}
         <Link
          href="/"
          className="flex-shrink-0 flex flex-col max-w-[20%] min-w-0"
        >
          <span className="logo-font text-3xl text-black dark:text-white transform -rotate-12 pl-1 pb-2 truncate">
            Yanis
          </span>
          <span className="logo-font text-2xl text-black dark:text-white transform -rotate-12 -mt-1 pr-0.5 pl-5 truncate">
            Harrat
          </span>
        </Link>

        {/* Liens visibles */}
        <ul className="flex gap-4 flex-1 justify-center">
          {tabletVisibleLinks.map((link) => (
            <li key={link.id}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Burger */}
        <BurgerMenu
          navLinks={tabletBurgerLinks}
          socialLinks={socialLinks}
          variant="tablet"
        />
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex items-center justify-between w-full max-w-full min-w-0 pl-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 flex flex-col max-w-[20%] min-w-0"
        >
          <span className="logo-font text-3xl text-black dark:text-white transform -rotate-12 pl-1 pb-2 truncate">
            Yanis
          </span>
          <span className="logo-font text-2xl text-black dark:text-white transform -rotate-12 -mt-1 pr-0.5 pl-5 truncate">
            Harrat
          </span>
        </Link>

        {/* Tous les liens */}
        <ul className="flex flex-1 flex-wrap justify-center gap-1 overflow-hidden min-w-0">
          {desktopVisibleLinks.map((link) => (
            <li key={link.id} className="flex-shrink-0">
              <Link
                href={link.href}
                className="truncate text-gray-900 dark:text-white font-medium px-3 py-1 text-base xl:text-lg hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Réseaux + toggle */}
        <div className="flex gap-3 items-center flex-shrink-0 max-w-[20%] min-w-0 pr-8">
          {socialLinks.map(({ href, icon: Icon, alt }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              aria-label={alt}
              className=" flex-shrink-0"
            >
              <Icon className="w-6 h-6 xl:w-7 xl:h-7" />
            </Link>
          ))}
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
