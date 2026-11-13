# Design

Le langage visuel : monde « Opérationnel dès lundi », tokens, conventions d'UI et règles de mouvement. La source détaillée est `DESIGN.md` (avec `.impeccable/design.json`) ; le contrat de l'accueil est `.impeccable/surfaces/src-app-page-tsx.md`.

## System

- shadcn/ui (base Radix, preset `nova`, `components.json`) est configuré ; ses composants s'ajoutent dans `src/components/ui/` via la CLI. L'accueil n'utilise aucun composant stock : tout est dessiné dans le vocabulaire du monde.
- Tailwind CSS 4 en classes utilitaires. Pour fusionner les classes, utiliser `cn()` depuis `src/lib/utils.ts`.
- Refus de Yanis, à ne jamais réintroduire : dégradés, lueurs (glow), verre/flou décoratif, cartes lumineuses, cliché hacker (terminal vert, faux code), badges de compétences, métaphores lourdes (baie, plan de métro, photocopie).

## Tokens

- Définis dans `src/app/globals.css` (`@theme inline` + variables sur `:root, .dark`). Il n'y a pas de `tailwind.config`. Un seul thème, sombre, `class="dark"` sur `<html>`.
- Palette tirée du portrait : `ground` #121114 (fond), `raised` #1C1A1A (surface surélevée), `bone` #EFE9E1 (texte), `ash` #9C948B (texte secondaire, contraste 6,3:1), `tungsten` #F5B66A (UNE couleur d'action, en aplat), `rule` / `rule-strong` (filets os à 10 % / 22 %).
- Le tungstène est réservé aux actions (bouton « Appeler ») et à l'état vivant (ticket « En cours », démo « En direct »), à la sélection et au focus. Jamais en décor.
- Les tokens shadcn (`background`, `card`, `muted-foreground`, `border`, `ring`…) sont remappés sur cette palette : les autres pages en héritent.
- Coins : 6 px (`--radius: 0.375rem`) ; seule la pastille portrait est arrondie à fond.
- Utilitaires maison : `page-container` (marges du site, 84rem max), `pixel` (police pixel, chiffres tabulaires), `focus-ring`.

## Typography

- Trois voix auto-hébergées via `next/font/local` (fichiers et licences OFL dans `public/fonts/`) :
  - **Archivo** (variable `wdth` + `wght`) : titres serrés (`[font-stretch:80–88%]`, graisse 680–760, interlettrage jusqu'à -0,04em) et texte courant.
  - **Bodoni Moda italique** (`font-serif italic`, composant `Voice`) : les mots humains glissés dans les titres (« dès lundi. », « sans arrondir. »), les lieux, les groupes de compétences.
  - **Departure Mono** (`font-pixel` / `pixel`) : uniquement chiffres et identifiants (INC-2041, N1/N2, heures). Tailles multiples de 11 px quand c'est possible.
- Titres de section : composant `SectionTitle` (`src/components/home/home-ui.tsx`).
- Typo française : espace insécable avant « : » et « ? » (`&nbsp;`, `&#8239;`), chiffre et unité inséparables (« 3 j »).

## Components

- `src/components/home/` : sections de l'accueil en Server Components (hero, démo, chiffres, compétences, parcours, projets, clôture), primitives `home-ui.tsx` (`Voice`, `SectionTitle`, `CallAction`, `CvAction`, `MailAction`) et `facts.ts` (faits dérivés du CV, durées calculées depuis les périodes du parcours).
- `src/components/animations/` (toujours `"use client"`, sans librairie) :
  - `ticket-queue.tsx` : démo « exemple » d'une file N1/N2 ; lignes positionnées par `transform`, boucle `setInterval` active seulement à l'écran, hors survol, hors focus, onglet visible et sans mouvement réduit ; bouton pause/lecture ; instantané SSR identique à l'état statique.
  - `tick-figure.tsx` : chiffre qui défile une fois à l'entrée ; valeur finale dans le HTML, largeur réservée (aucun décalage).
- Chaque section a sa propre forme, jamais de grille de cartes : chiffres en grille 2×2 à l'échelle display (Departure Mono 110–154 px), compétences en texte courant dense (un paragraphe par groupe sous `sm`, noms d'un seul mot en `nowrap`), certifications en colonnes par émetteur, parcours et projets en rangées à filets.
- Double voix (grotesque + `Voice`) réservée au hero, à la démo et à la clôture ; les titres intermédiaires restent en grotesque seule.
- Les entrées MDX étiquetées `exemple` ne s'affichent jamais sur l'accueil.
- GSAP et Motion ne sont plus utilisés par le site (dépendances encore présentes dans `package.json`).

## Motion

- Trois mouvements, pas un de plus : les lignes du H1 montent d'un masque et la pastille s'ouvre (CSS `rise-from-mask` / `pill-open`, `data-rise` / `data-pill`), la file de tickets tourne, les chiffres défilent une fois.
- Courbe unique `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Hover : changement de couleur ou de filet, jamais de soulèvement ni de lueur.

## Accessibility

- `prefers-reduced-motion` : les animations CSS ne sont déclarées que sous `no-preference` ; la file est figée (« Démo figée : mouvement réduit. ») et les chiffres affichent leur valeur.
- Rien n'est masqué au rendu serveur : le H1 est complet et lisible sans JavaScript (le nom « Yanis HARRAT » est porté par un `sr-only` dans le H1), la file et les chiffres sont rendus dans leur état final.
- Focus clavier : contour tungstène 2 px (`:focus-visible` global) ; lien d'évitement « Aller au contenu ».
- Pas de débordement à 320 px ; la nav passe sur deux lignes sous ~360 px.
- Lighthouse mobile mesuré sur build de prod : performance 94, accessibilité 100, CLS 0.
