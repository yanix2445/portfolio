"use client";

// Importation des hooks React pour la gestion d'état et d'effets de bord
import { useState, useEffect } from "react";
// Importation du composant Link de Next.js pour la navigation côté client
import Link from "next/link";
// Importation du composant de bascule de thème (clair/sombre)
import { ModeToggle } from "./toogle-theme";
// Importation des icônes de réseaux sociaux depuis react-icons
import { FaLinkedin, FaSquareXTwitter, FaGithub } from "react-icons/fa6";
// Importation du composant menu burger personnalisé
import { BurgerMenu } from "./menu-burger";

// Définition des liens de navigation principaux de la navbar
const navLinks = [
  { id: 1, name: "Accueil", href: "/Accueil" },
  { id: 2, name: "Parcours", href: "/Parcours" },
  { id: 3, name: "Portfolio", href: "/Portfolio" },
  { id: 4, name: "Contact", href: "/Contact" },
  { id: 5, name: "Ressources", href: "/Ressources" },
  { id: 6, name: "Blog", href: "/Blog" },
];

// Définition des liens vers les réseaux sociaux (icône, url, accessibilité)
const socialLinks = [
  { href: "https://github.com/yanix2445", icon: FaGithub, alt: "GitHub" },
  { href: "https://x.com/yanix_213", icon: FaSquareXTwitter, alt: "Twitter" },
  {
    href: "https://www.linkedin.com/in/yanis-harrat",
    icon: FaLinkedin,
    alt: "LinkedIn",
  },
];

// Composant principal de la barre de navigation
export default function NavBar() {
  // État local pour gérer l'animation d'apparition de la navbar
  const [isVisible, setIsVisible] = useState(false);

  // Effet pour déclencher l'animation d'apparition au montage du composant
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  // --- Gestion des liens affichés selon la taille d'écran ---

  // Sur mobile : seuls "Portfolio" et "Contact" sont visibles directement
  const mobileVisibleLinks = navLinks.filter((link) =>
    ["Portfolio", "Contact"].includes(link.name)
  );
  // Sur tablette : "Accueil", "Parcours", "Portfolio", "Contact" sont visibles
  const tabletVisibleLinks = navLinks.filter((link) =>
    ["Accueil", "Parcours", "Portfolio", "Contact"].includes(link.name)
  );
  // Sur desktop : tous les liens sont affichés
  const desktopVisibleLinks = navLinks;

  // Sur mobile : les autres liens vont dans le menu burger
  const mobileBurgerLinks = navLinks.filter(
    (link) => !mobileVisibleLinks.includes(link)
  );
  // Sur tablette : les autres liens vont dans le menu burger
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
      {/*//?  === SECTION MOBILE ===
          Affichage uniquement sur mobile (sm:hidden)
          - Logo à gauche
          - Liens principaux visibles au centre
          - Menu burger à droite pour les autres liens et réseaux sociaux
      */}
      <div className="flex items-center justify-between w-full sm:hidden">
        {/* Logo (gauche) */}
        <Link href="/" className="flex-shrink-0 max-w-[30%] pl-4">
          <span className="block logo-font text-lg text-black dark:text-white transform -rotate-12 lg:-ml-1">
            Yanis
          </span>
          <span className="block logo-font text-base text-black dark:text-white transform -rotate-12 lg:-mt-0.5 lg:ml-1">
            Harrat
          </span>
        </Link>

        {/* Liens principaux visibles (centre) */}
        <ul className="flex gap-3">
          {mobileVisibleLinks.map((link) => (
            <li key={link.id}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Menu burger (droite) pour les autres liens + réseaux sociaux */}
        <BurgerMenu
          navLinks={mobileBurgerLinks}
          socialLinks={socialLinks}
          variant="mobile"
        />
      </div>

      {/*//? === SECTION TABLETTE ===
          Affichage sur tablette (sm:flex lg:hidden)
          - Logo à gauche
          - Liens principaux visibles au centre
          - Menu burger à droite pour les liens secondaires et réseaux sociaux
      */}
      <div className="hidden sm:flex lg:hidden items-center justify-between w-full min-w-0 px-6">
        {/* Logo (gauche) */}
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

        {/* Liens principaux visibles (centre) */}
        <ul className="flex gap-4 flex-1 justify-center">
          {tabletVisibleLinks.map((link) => (
            <li key={link.id}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Menu burger (droite) pour les liens secondaires + réseaux sociaux */}
        <BurgerMenu
          navLinks={tabletBurgerLinks}
          socialLinks={socialLinks}
          variant="tablet"
        />
      </div>

      {/*//? === SECTION DESKTOP ===
          Affichage sur desktop (lg:flex)
          - Logo à gauche
          - Tous les liens visibles au centre
          - Réseaux sociaux + toggle thème à droite
      */}
      <div className="hidden lg:flex items-center justify-between w-full max-w-full min-w-0 pl-3">
        {/* Logo (gauche) */}
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

        {/* Tous les liens de navigation (centre) */}
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

        {/* Réseaux sociaux (icônes) + toggle thème (droite) */}
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
        {/* Bascule du mode clair/sombre */}
        <ModeToggle />
      </div>
    </nav>
  );
}
