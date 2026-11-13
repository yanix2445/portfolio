# Design

Le langage visuel : design system, tokens, conventions d'UI et règles d'animation.

## System

- shadcn/ui (base Radix, preset `nova`, style `radix-nova`) : les composants sont copiés dans `src/components/ui/`, on peut les modifier.
- Tailwind CSS, utilisé en classes utilitaires. Pour fusionner les classes, utiliser `cn()` depuis `src/lib/utils.ts`.
- Les animations d'entrée shadcn passent par `tw-animate-css` (et non `tailwindcss-animate`), les toasts par `sonner`.

## Tokens

- Couleurs, rayons et typographie sont définis dans `src/app/globals.css` (`@theme` de Tailwind et variables CSS shadcn). Il n'y a pas de `tailwind.config`.
- Thème sombre sur tout le site : `class="dark"` sur `<html>` (layout racine), `color-scheme: dark`. Les tokens shadcn de base ne changent pas.
- Accent ambre, qui reprend la lumière du portrait : `--brand`, `--brand-deep` et `--brand-foreground` (classes `bg-brand`, `text-brand`, `from-brand-deep`…).
- Utilitaires maison dans `globals.css` : `focus-ring` (contour ambre au focus clavier), `glow-card` (carte sombre à filet ambré), `grain` (grain photographique statique) et `animate-marquee`.
- Attention : shadcn définit la variante `data-horizontal` comme `[data-orientation="horizontal"]`, pas `[data-horizontal]`.

## Components

- Animations, en respectant les rôles de chaque librairie :
  - **GSAP** (`useGSAP` + ScrollTrigger) sert à l'accueil et aux animations liées au scroll. Utiliser `contextSafe()` pour les animations déclenchées par un événement.
  - **Motion**, chargé via `LazyMotion`/`m`, sert aux micro-interactions (hover, menu, cartes).
  - Un même élément n'est jamais animé par les deux librairies.
- Tout composant animé est en `"use client"` et se trouve dans `src/components/animations/`. Les sections restent des Server Components (`src/components/home/`) et ne reçoivent que des enveloppes d'animation, ciblant leurs enfants par attributs `data-*`.
- Composants en place :
  - `gsap.ts` : enregistrement unique de `useGSAP` et `ScrollTrigger`, constante `MOTION_OK` pour `gsap.matchMedia()`.
  - `hero-intro.tsx` : lettres du nom (`data-hero-letter`) qui montent, cascade (`data-hero-reveal`), parallaxe de la photo et du halo.
  - `scroll-reveal.tsx` : révélation en cascade des `[data-reveal]` (`ScrollTrigger.batch`, `once`).
  - `timeline-scroll.tsx` : au-dessus de 768 px, parcours épinglé qui défile horizontalement ; en dessous, révélation verticale.
  - `marquee.tsx` : bande de certifications en animation CSS, en pause au survol, au focus et via un bouton ; grille en mouvement réduit.
  - `motion-card.tsx` : `MotionConfig reducedMotion="user"` + `LazyMotion`, soulèvement et lueur ambre au survol et au focus.

## Accessibility

- `prefers-reduced-motion` est respecté par toutes les animations, GSAP comme Motion : GSAP ne tourne que dans `gsap.matchMedia(MOTION_OK)`, le CSS passe par `motion-safe:`/`motion-reduce:`.
- Rien n'est masqué en CSS ni au rendu serveur : les états de départ sont posés par GSAP à l'hydratation, le contenu reste complet sans JavaScript.
- Le H1 de l'accueil (élément LCP) n'est jamais à `opacity: 0` au rendu SSR, sinon le score Lighthouse chute.
- Le contraste et le focus visible reposent sur les valeurs par défaut de shadcn/ui. La navigation au clavier doit fonctionner sur tout le site.
