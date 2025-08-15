"use client"; // Composant client Next.js 15+ optimisé

import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./toogle-theme";
import { Badge } from "./ui/badge";

const navLinks = [
  { name: "Accueil", href: "#"},
  { name: "Parcours", href: "#",},
  { name: "Portfolio", href: "#",},
  { name: "Ressources", href: "#",},
  { name: "Blog", href: "#",},
  { name: "Contact", href: "#",},
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/yanis-harrat", icon: "/linkedin.svg", alt: "LinkedIn", size: 24, },
  { href: "https://github.com/yanix2445", icon: "/github.svg", alt: "GitHub", size: 20, },
];

export default function NavBar() {
  // On déclenche l'animation uniquement côté client (évite tout bug SSR/hydratation)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // On attend le mount pour lancer l'animation (évite le flash SSR)
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {/* 
        //? Navbar moderne, fluide, glassmorphism, dark mode ready.
        //? Animation d'apparition "slide from top" via la classe CSS globale.
      */}
      <nav
        className={`
          fixed top-4 left-1/2 z-50
          -translate-x-1/2
          w-[95vw] max-w-5xl
          rounded-full
          bg-white/20 dark:bg-gray-900/40
          backdrop-blur-sm
          shadow-xl
          dark:shadow-gray-900/60
          border border-white/30 dark:border-gray-700/60
          flex items-center justify-between
          px-4 
          transition-all duration-300
          ${isVisible ? "animate-navbar-slide-down" : "opacity-0"}
        `}
        aria-label="Navigation principale"
      >
        <Badge variant="outline" className="gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          En construction
        </Badge>

        {/*//? Logo ou titre du site */}
        <Link href="/">
          <Avatar className="w-[64px] h-[64px]">
            <AvatarImage
              src="/logo.png"
              alt="Logo du site"
              className="w-full h-full rounded-full object-cover"
            />
          </Avatar>
        </Link>

        {/*//? Liens de navigation */}
        <ul className="flex gap-2">
          {navLinks.map(({ name, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`
                  text-gray-900 dark:text-white font-medium px-3 py-1
                  transition-colors duration-200 
                `}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Liens de réseaux sociaux */}
        <ul className="flex gap-4 items-center sm:flex">
          {socialLinks.map(({ href, icon, alt, size }) => (
            <li key={href}>
              <Link href={href} target="_blank">
                <Image
                  src={icon}
                  alt={alt}
                  width={size}
                  height={size}
                  className={`rounded-full transition-transform transform hover:scale-110 ${
                    icon === "/github.svg" ? "bg-zinc-950 " : ""
                  }`} />
              </Link>
            </li>
          ))}
          <ModeToggle />
        </ul>
       
      </nav>
    </div>
  );
}
