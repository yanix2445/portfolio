---
objective: "L'accueil `/` est reconstruit selon le contrat « Opérationnel dès lundi », vérifié par les suites de tests, Lighthouse, la relecture finale Impeccable et documenté dans DESIGN.md."
status: done
---

# Plan: Refonte de l'accueil « Opérationnel dès lundi »

Source: `aidd_docs/tasks/2026_11/2026_11_13_home-redesign/spec.md` + `.impeccable/surfaces/src-app-page-tsx.md`

## Phases

| #   | Phase | File | Depends on |
| --- | ----- | ---- | ---------- |
| 1   | Monde visuel : tokens, polices, header et footer | [`phase-1.md`](./phase-1.md) | none |
| 2   | Accueil : titre trois voix, démo de file, chiffres, sections | [`phase-2.md`](./phase-2.md) | 1 |
| 3   | Tests e2e et assertions | [`phase-3.md`](./phase-3.md) | 2 |
| 4   | Finition Impeccable et documentation | [`phase-4.md`](./phase-4.md) | 3 |

## External sources

| URL | What it settled |
| --- | --------------- |
| https://nextjs.org/docs/app/api-reference/components/font | `next/font/local` auto-héberge les fichiers et génère un fallback ajusté (CLS) |
| https://nextjs.org/docs/app/api-reference/components/image#preload | Next 16 : `priority` est déprécié au profit de `preload` (vérifié dans `node_modules/next/dist/shared/lib/get-img-props.d.ts`) |
| https://github.com/rektdeckard/departure-mono | Departure Mono, police pixel sous OFL 1.1 |
| https://fontsource.org/fonts/archivo · https://fontsource.org/fonts/bodoni-moda | Archivo (axes wdth+wght) et Bodoni Moda italique (opsz+wght) sous OFL 1.1 |

## Impact

| Category | Verdict and evidence | Handled in |
| -------- | -------------------- | ---------- |
| runtime | Polices locales (aucun appel externe au runtime) ; Geist via `next/font/google` retiré du layout | 1 |
| regression | Vérifié par grep : seul `page.tsx` importe `src/components/home` et `src/components/animations` ; `glow-card`, `grain` et `marquee` ne sont utilisés que par l'accueil. Les autres pages consomment les tokens shadcn (`bg-card`, `text-muted-foreground`, `border`) et `CV_PATH` (`src/app/contact/page.tsx`) : tokens remappés sur la nouvelle palette, `CV_PATH` conservé. Couvert par `tests/e2e/site.spec.ts` (statuts, nav, footer, JSON-LD). Risque moyen | 1, 3 |
| regression | `tests/e2e/home.spec.ts` verrouille l'ancien accueil (6 sections, épinglage GSAP) : réécrit sur le nouveau premier écran | 3 |
| architecture | Les anciens wrappers GSAP/Motion (`src/components/animations/*`) disparaissent ; l'animation devient CSS + deux petits composants client sans librairie. `gsap`/`motion` restent dans `package.json` (hors périmètre) | 2 |
| documentation | `aidd_docs/memory/design.md` décrit l'ancien système : réécrit. `DESIGN.md` + `.impeccable/design.json` créés par le documenter. `architecture.md`, `codebase-map.md` et `testing.md` citent GSAP : hors périmètre de cette session, signalés en suivi | 4 |

## Rules

| Rule | Why it applies |
| ---- | -------------- |
| Contrat de direction `.impeccable/surfaces/src-app-page-tsx.md` | Fait loi sur palette, voix typographiques, premier écran et mouvement |
| `design.md` : rien de masqué au rendu serveur, H1 jamais à `opacity: 0` en SSR | H1 lisible sans JS et LCP |
| `testing.md` : e2e sur le build de production, invariants sans titres MDX codés en dur | Tests de l'accueil |
| Portly pour toute commande bornée et tout serveur | Règle utilisateur globale |
| Craft floor Impeccable : pas de kicker au-dessus d'un titre (interdit absolu) | Écart assumé au contrat : la ligne rôle · BTS SIO SISR · 3 j / 2 j passe sous le titre, signalé au rapport |
| Provenance des rasters (contrat, FINISH) | `yanis-harrat-pastille.webp` est un recadrage de `yanis-harrat.png` : origine embarquée via `impeccable embed-prompt` |

## Decisions

| Decision | Why |
| -------- | --- |
| Animations sans librairie (CSS + IntersectionObserver), GSAP et Motion retirés de l'accueil | Le contrat ne demande que trois mouvements ; moins de JS = Lighthouse mobile ≥ 90 |
| Polices auto-hébergées via `next/font/local` depuis `public/fonts/` | Exigence « auto-hébergées » + fallback métrique automatique |
