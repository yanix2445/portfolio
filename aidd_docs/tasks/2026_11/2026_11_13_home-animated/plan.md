---
objective: "L'accueil présente les six sections du CV dans une mise en scène sombre et richement animée, lisible sans JS et sans mouvement, sans régression des autres pages."
status: implemented
---

# Plan: Accueil complet et animé

Source: [spec.md](./spec.md), d'après le brief [brainstorm.md](./brainstorm.md)

## Phases

| #   | Phase | File | Depends on |
| --- | ----- | ---- | ---------- |
| 1   | Thème sombre, données du profil et dépendances | [`phase-1.md`](./phase-1.md) | none |
| 2   | Sections statiques de l'accueil | [`phase-2.md`](./phase-2.md) | 1 |
| 3   | Animations GSAP et Motion | [`phase-3.md`](./phase-3.md) | 2 |
| 4   | Tests, mesure de performance et mémoire | [`phase-4.md`](./phase-4.md) | 3 |

## External sources

| URL | What it settled |
| --- | --------------- |
| https://gsap.com/resources/React | `useGSAP()` de `@gsap/react` avec `registerPlugin(useGSAP, ScrollTrigger)`, nettoyage automatique, `contextSafe()` pour les événements, `gsap.matchMedia()` pour `prefers-reduced-motion` et les points de rupture |
| https://motion.dev/docs/react-lazy-motion | `LazyMotion` + `domAnimation` et le composant `m` pour charger Motion à la demande |
| https://motion.dev/docs/react-motion-config | `MotionConfig reducedMotion="user"` désactive les animations Motion quand le système demande moins de mouvement |
| https://www.npmjs.com/package/lighthouse | CLI Lighthouse lancée via `npx`, avec `CHROME_PATH` pointant sur le Chromium de Playwright |
| https://www.npmjs.com/package/gsap | v3.15.1 (gratuite, plugins compris) ; `@gsap/react` v2.1.2 ; `motion` v14.13.0 |

## Impact

| Category | Verdict and evidence | Handled in |
| -------- | -------------------- | ---------- |
| runtime | Ajout de `gsap`, `@gsap/react` et `motion` côté client. JS plus lourd sur l'accueil : plancher Lighthouse mobile fixé à 75 par la spec. Non mesuré à ce stade | 1, 4 |
| regression | `class="dark"` sur `<html>` passe tout le site en sombre via les tokens shadcn existants (`globals.css` déjà en `.dark`, `Prose` déjà en `dark:prose-invert`). Le rendu sombre de `/projets`, `/veille`, `/contact`, `/mentions-legales`, de la 404, du header et du footer n'est pas encore vérifié : contrôle visuel prévu en phase 4. Tests e2e existants à garder verts. Risque moyen, non vérifié | 1, 4 |
| architecture | Nouveau fichier de données `src/lib/profile.ts` (hors `src/content/`, que Vitest redirige vers les fixtures) et nouveaux composants `src/components/home/` (statiques) et `src/components/animations/` (clients). Les sections restent des Server Components ; seules les enveloppes d'animation sont en `"use client"` | 1, 2, 3 |
| documentation | `design.md` (thème sombre, accent ambre, rôles d'animation appliqués), `codebase-map.md` (`home/`, `animations/`, `profile.ts`), `testing.md` (nouveaux tests e2e) | 4 |

## Rules

| Rule | Why it applies |
| ---- | -------------- |
| GSAP pour le hero et le scroll, Motion via `LazyMotion`/`m` pour les micro-interactions, jamais les deux sur un même élément | `design.md` |
| Le H1 n'est jamais à `opacity: 0` au rendu serveur ; aucune classe CSS ne masque le contenu avant hydratation | `design.md`, spec (nom visible sans JS) |
| `prefers-reduced-motion` : aucune animation, contenu complet | `design.md`, spec |
| Composants animés en `"use client"` dans `src/components/animations/` | `design.md` |
| Tests e2e sur des invariants, pas de texte de contenu codé en dur hors données du profil | `testing.md` |
| Commandes bornées via Portly, branche `claude/home-animated` | CLAUDE.md global |

## Decisions

| Decision | Why |
| -------- | --- |
| Thème sombre pour tout le site (classe `dark` globale) | Décision de Yanis du 2026-11-13, reportée dans la spec ; les tokens sombres existent déjà, les autres pages ne changent que de couleurs |
| Accent ambre/orangé en token dédié | Reprend la lumière chaude de la photo ; donne l'identité « audacieuse » sans toucher aux tokens shadcn de base |
| Sections rendues côté serveur, animation ajoutée par des enveloppes client | Contenu complet sans JS et sans mouvement ; une animation qui échoue ne cache jamais le contenu |
| Animations de scroll riches (épinglage, défilement horizontal) uniquement au-dessus de 768 px ; version empilée sur mobile | Garantit l'absence de débordement horizontal à 375 px et limite le coût sur mobile |
