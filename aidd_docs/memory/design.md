# Design

Le langage visuel : design system, tokens, conventions d'UI et règles d'animation.

## System

- Direction « Générique » : le site se lit comme un générique de film. Fond noir chaud, texte crème, accent orange braise, grandes lettres d'affiche condensées, légendes en mono. La maquette validée par Yanis est dans `aidd_docs/tasks/2026_11/2026_11_13_home-generique/mockup/index.html`.
- Deux designs ont été rejetés (PR #10 sombre et ambre, PR #11) : ne rien en reprendre.
- shadcn/ui (base Radix, preset `nova`, style `radix-nova`) reste disponible : les composants s'ajoutent dans `src/components/ui/` via la CLI.
- Tailwind CSS en classes utilitaires pour les pages secondaires. Pour fusionner les classes, utiliser `cn()` depuis `src/lib/utils.ts`.
- L'accueil et le catalogue ont leur propre CSS global, préfixé : `gn-` (`home/home.css`), `gp-` (`home/poster.css`) et `gc-` (`projects/catalog.css`), importés depuis `globals.css`. Chaque feuille a un fichier `*.styles.ts` qui associe un nom lisible à chaque classe.
- Les CSS modules ne fonctionnent pas dans ce projet : `next.config.ts` fait passer tous les `*.css` par le loader Tailwind de Turbopack.

## Tokens

- Couleurs, rayons et typographie sont définis dans `src/app/globals.css` (`@theme inline` et variables CSS). Il n'y a pas de `tailwind.config`.
- Thème sombre unique : `class="dark"` sur `<html>`, `color-scheme: dark`.
- Palette : `--background` `#0b0a09`, `--foreground` `#f2ebdd`, `--soft` `#cfc6b6`, `--card` `#151310`, `--primary` `#ff5b2e` (orange braise), `--muted-foreground` `#9a9082`.
- Polices locales (`src/app/fonts/`, chargées par `next/font/local`) : Big Shoulders pour les titres d'affiche (`--font-big-shoulders`), Hanken Grotesk pour le texte (`--font-hanken`), Geist Mono pour les légendes (`--font-geist-mono`).
- Utilitaires maison dans `globals.css` : `type-poster` (titre d'affiche), `type-label` (légende mono en capitales) et `focus-ring`.
- `--header-h` donne la hauteur du header fixe. Le `<main>` est décalé d'autant, et le hero remonte dessous.

## Components

- **GSAP** (`useGSAP` + ScrollTrigger) est la seule librairie d'animation. `motion` a été retiré.
- Tout composant animé est en `"use client"` et se trouve dans `src/components/animations/`. Les sections restent des Server Components (`src/components/home/`) : elles sont enveloppées par un composant d'animation, qui cible leurs enfants par attributs `data-*`.
- `gsap.ts` : enregistrement unique des plugins, et les requêtes `MOTION_OK`, `WIDE` (768 px et plus) et `NARROW` pour `gsap.matchMedia()`.
- `hero-scroll.tsx` : intro au chargement, puis, sur grand écran, hero épinglé pendant que la photo se range en affiche à droite, que le nom rétrécit et que le synopsis apparaît.
- `acts-scroll.tsx` : sur grand écran, il pose `data-orientation="horizontal"` sur `[data-acts]`, épingle la section et fait défiler les actes à l'horizontale, avec compteur « Acte n / 5 » et barre de progression. Sur petit écran, les actes restent en colonne et apparaissent un à un.
- `reveal.tsx` : apparition, une seule fois, des éléments marqués `data-reveal` (`title`, `poster`, `row`, `laurel`, `finale`, `button`) dans chaque `data-reveal-group`. À la fin, les styles posés par GSAP sont retirés pour que le survol CSS reprenne la main.
- Le hero ne joue son intro que si le JS s'hydrate dans les 1,5 premières secondes : sur un appareil lent, le nom déjà affiché n'est jamais masqué.
- Le premier acte se révèle à l'arrivée de la section (défilement vertical), les suivants pendant le défilement horizontal (`containerAnimation`).

## Rules

- **Portrait** : la tête de Yanis reste entière à chaque étape et sur chaque écran. Seul le bas de la photo est rogné (`object-position` calé en haut).
- **Accents** : aucune lettre accentuée d'un titre n'est masquée ou coupée par la ligne voisine (« ÉQUIPE », « À L'AFFICHE »). Les titres d'affiche gardent une marge haute.
- **Mobile** : pas d'épinglage ni de défilement horizontal sous 768 px. Une animation ne doit jamais élargir la page (le cadre de la photo est en `overflow: hidden`).
- **Certifications** : une couronne de laurier par certification. Le badge officiel s'affiche quand son fichier est fourni (`public/images/certifs/`), sinon l'organisme et l'intitulé. Aucun logo de marque n'est redessiné.
- **Statuts de projet** : « À l'affiche » (terminé), « En tournage » (en cours), « Prochainement » (à venir).

## Accessibility

- `prefers-reduced-motion` : aucune animation ne tourne, GSAP n'étant lancé que dans `gsap.matchMedia()` avec `MOTION_OK`. Les actes restent en colonne.
- Rien n'est masqué en CSS ni au rendu serveur : les états de départ sont posés par GSAP à l'hydratation, le contenu reste complet sans JavaScript.
- Le H1 de l'accueil (élément LCP avec la photo) n'est jamais à `opacity: 0` au rendu serveur.
- Le synopsis existe en deux copies : celle du flux (`data-hero-synopsis-flow`), lue par tous, et une copie décorative (`data-hero-synopsis`, `aria-hidden`) affichée seulement pendant l'animation épinglée.
- Focus clavier : `:focus-visible` global à l'accent orange. La navigation au clavier doit fonctionner sur tout le site.
