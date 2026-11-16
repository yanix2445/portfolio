# Design

Le langage visuel : design system, tokens, conventions d'UI et règles d'animation. La référence complète (tokens, typographie, composants, à faire et à éviter) est `DESIGN.md`, à la racine.

## System

- Direction « Générique » : le site se lit comme un générique de film. Fond noir chaud, texte crème, accent orange braise, grandes lettres d'affiche condensées, légendes en mono. La maquette validée par Yanis est dans `aidd_docs/tasks/2026_11/2026_11_13_home-generique/mockup/index.html`.
- Deux designs ont été rejetés (PR #10 sombre et ambre, PR #11) : ne rien en reprendre.
- Tout le style passe par des classes Tailwind dans les composants. Il n'y a plus de feuille de style par section : `globals.css` ne contient que les tokens, la base et quelques `@utility`.
- Les éléments interactifs sont des primitives shadcn/ui (base Radix, style `radix-nova`) copiées dans `src/components/ui/` et thémées dans leurs variantes `cva`. On leur passe `className` pour la mise en page, pas pour le style.
- Les CSS modules ne fonctionnent pas dans ce projet : `next.config.ts` fait passer tous les `*.css` par le loader Tailwind de Turbopack.

## Tokens

- Tous les tokens sont dans `src/app/globals.css` : variables CSS sur `:root`, exposées à Tailwind par `@theme inline`. Il n'y a pas de `tailwind.config`.
- Thème sombre unique : `class="dark"` sur `<html>`, `color-scheme: dark`.
- Couleurs : `--background` `#0b0a09`, `--foreground` `#f2ebdd`, `--soft` `#cfc6b6`, `--card` `#151310`, `--primary` `#ff5b2e` (orange braise), `--muted-foreground` `#9a9082`. Aucune couleur n'est écrite dans un composant ni dans une animation.
- Texte : chaque rôle est un token `--text-*` (`text-body`, `text-lead`, `text-display-xl`, `text-display-fit` pour une page qui tient en un écran, `text-display-name`…) qui porte sa taille, son interligne, son approche et sa graisse. Les valeurs fluides (`--fs-*`) ont une valeur téléphone et une valeur grand écran : un composant n'écrit pas de point de rupture pour le texte.
- Un nouveau token de texte ou d'espacement s'ajoute aussi à `TEXT_SIZES` ou `SPACINGS` dans `src/lib/utils.ts`. Sinon `cn()` prend une taille de texte pour une couleur (`text-button` face à `text-primary-foreground`) et ne sait pas qu'un `h-8` remplace un `h-control-xl`.
- Espacements : `px-gutter` (3,4vw, 1 rem sur téléphone), `p-poster`, `h-control-xl`, `pt-header`. Les cotes propres à une scène (un titre à 16vh du haut) restent en unités d'écran dans les classes : c'est de la composition, pas un token.
- Rayons : dérivés de `--radius` (0,625 rem). `rounded-md` pour les badges, `rounded-lg` pour les contrôles et les champs, `rounded-xl` pour les grands boutons, `rounded-2xl` pour les affiches. Aucun bouton ni badge en pilule.
- Polices locales (`src/app/fonts/`) : Big Shoulders (`font-display`), Hanken Grotesk (`font-sans`, et `font-heading` pour les titres d'interface), Geist Mono (`font-mono`).
- Utilitaires maison (`@utility`) : `type-poster` (lettrage d'affiche), `type-label` (légende mono), `type-outline` et `type-outline-accent` (lettres en contour). Ils sont en `type-*` et non en `text-*` : `cn()` ne les fusionne pas avec une couleur de texte. Variante maison : `acts-row:` (actes en rangée).

## Components

- Primitives en place : `button` (tailles ajoutées `xl` et `label` ; les tailles shadcn inutilisées `xs`, `sm` et leurs icônes ont été retirées), `badge` (variante ajoutée `ink`), `card`, `toggle` et `toggle-group` (taille `label`), `field`, `input`, `label`, `textarea`, `separator`, `spinner`, `sonner`.
- Les primitives importent `cn` depuis `@/lib/utils` (et non depuis le paquet `cn`) pour connaître les tailles de texte du thème. Après un `shadcn add`, corriger cet import.
- Les tailles de texte ont quitté la base des variantes `cva` : chaque taille de bouton ou de filtre porte la sienne.
- **GSAP** (`useGSAP` + ScrollTrigger) est la seule librairie d'animation.
- Tout composant animé est en `"use client"` et se trouve dans `src/components/animations/`. Les sections restent des Server Components : elles sont enveloppées par un composant d'animation, qui cible leurs enfants par attributs `data-*`, jamais par classe.
- `gsap.ts` : enregistrement unique des plugins, et les requêtes `MOTION_OK`, `WIDE` (au moins 48 rem de large, comme le `md:` de Tailwind, et 35 rem de haut) et `NARROW` (tout le reste, téléphone en paysage compris).
- `hero-scroll.tsx` : intro au chargement, puis, sur grand écran, hero épinglé pendant que la photo se range en affiche, que le nom rétrécit et que le synopsis apparaît. Il lit la couleur et le rayon dans le thème.
- `acts-scroll.tsx` : sur grand écran, il pose `data-acts-row` sur `[data-acts]` (un attribut à lui : Radix pose déjà `data-orientation`), épingle la section et fait défiler les actes, avec compteur et barre de progression.
- `reveal.tsx` : apparition, une seule fois, des éléments marqués `data-reveal`. À la fin, les styles posés par GSAP sont retirés pour que le survol reprenne la main.
- Tailwind 4 pose `translate`, `rotate` et `scale` comme propriétés séparées. GSAP les neutralise sur ce qu'il anime : ne pas donner d'état de départ en classe à un élément animé (la barre de progression est mise à zéro par GSAP).
- L'intro pose tous ses états de départ d'un coup (`gsap.set`), puis anime avec `to`.
- Deux animations ne touchent jamais la même propriété d'un élément : l'intro anime l'`opacity` de la légende et de « Défiler », le hero épinglé leur `filter`.

## Rules

- **Portrait** : la tête de Yanis reste entière à chaque étape et sur chaque écran. Le cadrage vertical est la variable `--portrait-y`, qui diminue par paliers quand l'écran s'élargit.
- **Hero** : le nom et le synopsis sont bornés par la largeur et par la hauteur, pour ne pas se chevaucher sur un écran bas ou très large.
- **Accents** : aucune lettre accentuée d'un titre n'est masquée ou coupée par la ligne voisine (« ÉQUIPE », « À L'AFFICHE »).
- **Final** : une phrase en trois lignes, « Mon prochain rôle / se joue dans / votre équipe. », la dernière en orange.
- **Petit écran** : pas d'épinglage ni de défilement horizontal hors `WIDE`. Une animation ne doit jamais élargir la page.
- **Certifications** : une couronne de laurier par certification, dont le texte se dimensionne sur la couronne. Le badge officiel s'affiche quand son fichier est fourni (`public/images/certifs/`). Aucun logo de marque n'est redessiné.
- **Statuts de projet** : « À l'affiche » (terminé), « En tournage » (en cours), « Prochainement » (à venir).

## Accessibility

- `prefers-reduced-motion` : aucune animation ne tourne. Les actes restent en colonne.
- Rien n'est masqué en CSS ni au rendu serveur : les états de départ sont posés par GSAP à l'hydratation, le contenu reste complet sans JavaScript.
- Le synopsis existe en deux copies : celle du flux (`data-hero-synopsis-flow`), lue par tous, et une copie décorative (`aria-hidden`) affichée pendant l'animation épinglée. Pendant celle-ci, l'enveloppe de la copie du flux reçoit `sr-only`. Elle ne porte aucun autre style, sinon ses marges gagneraient sur `sr-only`.
- Focus clavier : contour orange de 2 px sur tout le site (`:focus-visible` global). Les boutons, badges et filtres shadcn ont perdu leur anneau pour le garder ; les champs de formulaire gardent l'anneau shadcn, de la même couleur.
- Les filtres du catalogue sont un groupe à choix unique (`radiogroup`) : Tab y entre, les flèches changent de filtre.
- Les affiches portent un `h3` sur l'accueil et un `h2` sur `/projets`.
- La sélection de texte et le curseur de saisie prennent l'accent.
