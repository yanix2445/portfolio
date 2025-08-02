"use client"; // Composant client Next.js 15+ optimisé

import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./toogle-theme";

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
        Navbar moderne, fluide, glassmorphism, dark mode ready.
        Animation d'apparition "slide from top" via la classe CSS globale.
      */}
      <nav
        className={`
          fixed top-4 left-1/2 z-50
          -translate-x-1/2
          w-[95vw] max-w-3xl
          rounded-2xl
          bg-white/20 dark:bg-gray-900/40
          backdrop-blur-md
          shadow-lg
          border border-white/30 dark:border-gray-700/60
          flex items-center justify-between
          px-8 py-3
          transition-all duration-300
          ${isVisible ? "animate-navbar-slide-down" : "opacity-0"}
        `}
        aria-label="Navigation principale"
      >
        {/* Logo ou titre du site */}
        <Link href="/">
          <Avatar className="w-[64px] h-[64px]">
            <AvatarImage
              src="/logo.png"
              alt="Logo du site"
              className="w-full h-full rounded-full object-cover"
            />
          </Avatar>
        </Link>

        {/* Liens de navigation */}
        <ul className="flex gap-6">
          <li>
            <Link
              href="/"
              className="
                text-gray-900 dark:text-white font-medium px-3 py-1 rounded-lg
                transition-colors duration-200
                hover:bg-white/40 hover:backdrop-blur-sm hover:text-blue-500
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
              "
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="
                text-gray-900 dark:text-white font-medium px-3 py-1 rounded-lg
                transition-colors duration-200
                hover:bg-white/40 hover:backdrop-blur-sm hover:text-purple-500
                focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400
              "
            >
              À propos
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="
                text-gray-900 dark:text-white font-medium px-3 py-1 rounded-lg
                transition-colors duration-200
                hover:bg-white/40 hover:backdrop-blur-sm hover:text-pink-500
                focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400
              "
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Liens de réseaux sociaux */}
        <ul className=" flex gap-4 items-center sm:flex">
          <li>
            <Link
              href="www.linkedin.com/in/yanis-harrat"
              target="_blank"
              
            >
              <Image
                src="/linkedin.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                className="w-6 h-6 rounded-full transition-transform transform hover:scale-110"
              />
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/yanix2445"
              target="_blank"
              
              aria-label="Voir le profil GitHub"
            >
              <Image
                src="/github.svg"
                alt="GitHub"
                width={20}
                height={20}
                className=" rounded-full
                bg-gray-900 text-white font-medium shadow-md
                transition-all duration-200
                hover:bg-gray-800 hover:scale-105
                focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 
              "
              />
            </Link>
          </li> <ModeToggle />
        </ul>
       
      </nav>
    </div>
  );
}
