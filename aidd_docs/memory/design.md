# Design

Le langage visuel : design system, tokens, conventions d'UI et règles d'animation.

## System

- Direction « Générique » : le site se lit comme un générique de film. Fond noir chaud, texte crème, accent orange braise, grandes lettres d'affiche condensées, légendes en mono. La maquette validée par Yanis est dans `aidd_docs/tasks/2026_11/2026_11_13_home-generique/mockup/index.html`.
- Deux designs ont été rejetés (PR #10 sombre et ambre, PR #11) : ne rien en reprendre.
- shadcn/ui (base Radix, preset `nova`, style `radix-nova`) reste disponible : les composants s'ajoutent dans `src/components/ui/` via la CLI.
- Tailwind CSS en classes utilitaires pour les pages secondaires. Pour fusionner les classes, utiliser `cn()` depuis `src/lib/utils.ts`.
- L'accueil et le catalogue ont leur propre CSS global, préfixé : `gn-` (`home/home.css`), `gp-` (`home/poster.css`) et `gc-` (`projects/catalog.css`), importés depuis `globals.css`. `home.css` et `poster.css` ont chacun un fichier `*.styles.ts` qui associe un nom lisible à chaque classe ; le catalogue écrit ses classes `gc-` directement.
- Les CSS modules ne fonctionnent pas dans ce projet : `next.config.ts` fait passer tous les `*.css` par le loader Tailwind de Turbopack.

## Tokens

- Couleurs, rayons et typographie sont définis dans `src/app/globals.css` (`@theme inline` et variables CSS). Il n'y a pas de `tailwind.config`.
- Thème sombre unique : `class="dark"` sur `<html>`, `color-scheme: dark`.
- Palette : `--background` `#0b0a09`, `--foreground` `#f2ebdd`, `--soft` `#cfc6b6`, `--card` `#151310`, `--primary` `#ff5b2e` (orange braise), `--muted-foreground` `#9a9082`.
- Polices locales (`src/app/fonts/`, chargées par `next/font/local`) : Big Shoulders pour les titres d'affiche (`--font-big-shoulders`), Hanken Grotesk pour le texte (`--font-hanken`), Geist Mono pour les légendes (`--font-geist-mono`).
- Utilitaire maison dans `globals.css` : `type-label` (légende mono en capitales), utilisé par le header et le footer.
- `--header-h` donne la hauteur du header fixe. Le `<main>` est décalé d'autant, et le hero remonte dessous.

## Components

- **GSAP** (`useGSAP` + ScrollTrigger) est la seule librairie d'animation. `motion` a été retiré.
- Tout composant animé est en `"use client"` et se trouve dans `src/components/animations/`. Les sections restent des Server Components (`src/components/home/`) : elles sont enveloppées par un composant d'animation, qui cible leurs enfants par attributs `data-*`.
- `gsap.ts` : enregistrement unique des plugins, et les requêtes `MOTION_OK`, `WIDE` (au moins 768 px de large et 35 rem de haut) et `NARROW` (tout le reste, téléphone en paysage compris) pour `gsap.matchMedia()`.
- `hero-scroll.tsx` : intro au chargement, puis, sur grand écran, hero épinglé pendant que la photo se range en affiche à droite, que le nom rétrécit et que le synopsis apparaît.
- `acts-scroll.tsx` : sur grand écran, il pose `data-orientation="horizontal"` sur `[data-acts]`, épingle la section et fait défiler les actes à l'horizontale, avec compteur « Acte n / 5 » et barre de progression. Sur petit écran, les actes restent en colonne et apparaissent un à un.
- `reveal.tsx` : apparition, une seule fois, des éléments marqués `data-reveal` (`title`, `poster`, `row`, `laurel`, `finale`, `button`) dans chaque `data-reveal-group`. À la fin, les styles posés par GSAP sont retirés pour que le survol CSS reprenne la main.
- Le hero ne joue son intro que si le JS s'hydrate dans les 1,5 premières secondes : sur un appareil lent, le nom déjà affiché n'est jamais masqué.
- L'intro pose tous ses états de départ d'un coup (`gsap.set`), puis anime avec `to` : avec `from` dans une timeline, les éléments restaient affichés avant de disparaître.
- Deux animations ne touchent jamais la même propriété d'un élément : l'intro anime l'`opacity` de la légende et de « Défiler », le hero épinglé leur `filter`.
- Les cotes de départ de la photo sont mesurées en JS et recalculées à chaque redimensionnement (`invalidateOnRefresh`). En quittant le grand écran, les styles posés sur la photo sont retirés.
- Le premier acte se révèle à l'arrivée de la section (défilement vertical), les suivants pendant le défilement horizontal (`containerAnimation`).

## Rules

- **Portrait** : la tête de Yanis reste entière à chaque étape et sur chaque écran. Seul le bas de la photo est rogné. Le cadrage vertical est la variable `--photo-y` du hero : elle diminue par paliers quand l'écran s'élargit (`min-aspect-ratio`), et l'affiche finale est calée en haut (`50% 0%`).
- **Hero** : le nom et le synopsis sont bornés par la largeur et par la hauteur (`min(vw, svh)`), pour ne pas se chevaucher sur un écran bas ou très large.
- **Accents** : aucune lettre accentuée d'un titre n'est masquée ou coupée par la ligne voisine (« ÉQUIPE », « À L'AFFICHE »). Les titres d'affiche gardent une marge haute.
- **Petit écran** : pas d'épinglage ni de défilement horizontal hors `WIDE`. Une animation ne doit jamais élargir la page (cadre de la photo en `overflow: hidden`, section des affiches en `overflow-x: clip`).
- **Certifications** : une couronne de laurier par certification, dont le texte se dimensionne sur la couronne (`cqi`) pour ne pas toucher les feuilles. Le badge officiel s'affiche quand son fichier est fourni (`public/images/certifs/`), sinon l'organisme et l'intitulé. Aucun logo de marque n'est redessiné.
- **Statuts de projet** : « À l'affiche » (terminé), « En tournage » (en cours), « Prochainement » (à venir).

## Accessibility

- `prefers-reduced-motion` : aucune animation ne tourne, GSAP n'étant lancé que dans `gsap.matchMedia()` avec `MOTION_OK`. Les actes restent en colonne.
- Rien n'est masqué en CSS ni au rendu serveur : les états de départ sont posés par GSAP à l'hydratation, le contenu reste complet sans JavaScript.
- Le H1 de l'accueil (élément LCP avec la photo) n'est jamais à `opacity: 0` au rendu serveur.
- Le synopsis existe en deux copies : celle du flux (`data-hero-synopsis-flow`), lue par tous, et une copie décorative (`data-hero-synopsis`, `aria-hidden`) affichée seulement pendant l'animation épinglée. Pendant celle-ci, la copie du flux est masquée visuellement (`data-collapsed`), jamais en `display: none`.
- Les affiches portent un `h3` sur l'accueil (sous le `h2` de la section) et un `h2` sur `/projets` (sous le `h1`).
- Focus clavier : `:focus-visible` global à l'accent orange. La navigation au clavier doit fonctionner sur tout le site.
