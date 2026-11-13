# Design

Le langage visuel : design system, tokens, conventions d'UI et règles d'animation.

## System

- shadcn/ui (style `new-york`) : les composants sont copiés dans `src/components/ui/`, on peut les modifier.
- Tailwind CSS, utilisé en classes utilitaires. Pour fusionner les classes, utiliser `cn()` depuis `src/lib/utils.ts`.
- Les animations d'entrée shadcn passent par `tw-animate-css` (et non `tailwindcss-animate`), les toasts par `sonner`.

## Tokens

- Couleurs, rayons et typographie sont définis dans `src/app/globals.css` (`@theme` de Tailwind et variables CSS shadcn). Il n'y a pas de `tailwind.config`.

## Components

- Animations, en respectant les rôles de chaque librairie :
  - **GSAP** (`useGSAP` + ScrollTrigger) sert à l'accueil et aux animations liées au scroll. Utiliser `contextSafe()` pour les animations déclenchées par un événement.
  - **Motion**, chargé via `LazyMotion`/`m`, sert aux micro-interactions (hover, menu, cartes).
  - Un même élément n'est jamais animé par les deux librairies.
- Tout composant animé est en `"use client"` et se trouve dans `src/components/animations/`.

## Accessibility

- `prefers-reduced-motion` est respecté par toutes les animations, GSAP comme Motion.
- Le H1 de l'accueil (élément LCP) n'est jamais à `opacity: 0` au rendu SSR, sinon le score Lighthouse chute.
- Le contraste et le focus visible reposent sur les valeurs par défaut de shadcn/ui. La navigation au clavier doit fonctionner sur tout le site.
