'use client' // Composant client Next.js 15+ optimisé

import { useEffect, useState } from 'react'

/**
 * Pourquoi ?
 * - Optimiser la compatibilité Next.js 15+ (App Router, React 19, strict mode, etc.)
 * - Éviter les bugs liés au SSR/hydratation (notamment avec l'usage de <style jsx global> et des refs inutiles)
 * - Garder l'animation d'apparition fluide, mais sans hack ni dépendance à l'environnement d'exécution
 * 
 * Comment ?
 * - Suppression de useRef (inutile ici)
 * - Utilisation de useState pour déclencher l'animation uniquement côté client (évite les soucis SSR)
 * - Déplacement des keyframes dans le fichier CSS global (globals.css) pour éviter tout souci d'injection de style côté serveur (Next.js 15+ gère mieux les styles globaux ainsi)
 * - Utilisation de la classe d'animation conditionnelle, mais sans <style jsx global>
 * 
 * Bonnes pratiques :
 * - Animation CSS déclarée dans le CSS global (plus robuste, scalable, compatible avec Tailwind)
 * - Composant 100% client, pas de dépendance à l'environnement serveur
 * - Code plus simple, plus lisible, plus "Next.js way"
 */

// ⚠️ À faire : Ajoute ce bloc dans ton fichier src/app/globals.css (ou équivalent Tailwind global)
// -----------------------------------------------------------------------------
// @keyframes navbar-slide-down {
//   0% {
//     opacity: 0;
//     transform: translateY(-40px) scale(0.98);
//   }
//   80% {
//     opacity: 1;
//     transform: translateY(4px) scale(1.01);
//   }
//   100% {
//     opacity: 1;
//     transform: translateY(0) scale(1);
//   }
// }
// .animate-navbar-slide-down {
//   animation: navbar-slide-down 0.7s cubic-bezier(0.22, 1, 0.36, 1);
// }
// -----------------------------------------------------------------------------

export default function NavBar() {
  // On déclenche l'animation uniquement côté client (évite tout bug SSR/hydratation)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // On attend le mount pour lancer l'animation (évite le flash SSR)
    const timeout = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timeout)
  }, [])

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
          ${isVisible ? 'animate-navbar-slide-down' : 'opacity-0'}
        `}
        aria-label="Navigation principale"
      >
        {/* Logo ou titre du site */}
        <div className="flex items-center gap-2 select-none">
          <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 animate-pulse" />
          <span className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-white drop-shadow-sm">
            sthmooth<span className="text-pink-400">Nav</span>
          </span>
        </div>
        {/* Liens de navigation */}
        <ul className="flex gap-6">
          <li>
            <a
              href="/"
              className="
                text-gray-900 dark:text-white font-medium px-3 py-1 rounded-lg
                transition-colors duration-200
                hover:bg-white/40 hover:backdrop-blur-sm hover:text-blue-500
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
              "
            >
              Accueil
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="
                text-gray-900 dark:text-white font-medium px-3 py-1 rounded-lg
                transition-colors duration-200
                hover:bg-white/40 hover:backdrop-blur-sm hover:text-purple-500
                focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400
              "
            >
              À propos
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="
                text-gray-900 dark:text-white font-medium px-3 py-1 rounded-lg
                transition-colors duration-200
                hover:bg-white/40 hover:backdrop-blur-sm hover:text-pink-500
                focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400
              "
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
