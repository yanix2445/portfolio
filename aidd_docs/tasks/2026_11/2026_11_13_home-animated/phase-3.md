---
status: implemented
---

# Instruction: Animations GSAP et Motion

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
└── src/
    └── components/
        ├── animations/
        │   ├── gsap.ts ✅
        │   ├── hero-intro.tsx ✅
        │   ├── scroll-reveal.tsx ✅
        │   ├── timeline-scroll.tsx ✅
        │   ├── marquee.tsx ✅
        │   └── motion-card.tsx ✅
        └── home/
            ├── hero-section.tsx
            ├── skills-section.tsx
            ├── certifications-section.tsx
            ├── timeline-section.tsx
            └── projects-section.tsx
```

Les fichiers `home/` sont créés en phase 2 et modifiés ici pour envelopper leur contenu.

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | Charger `/` et défiler | Le hero s'anime à l'arrivée ; compétences, certifications et parcours apparaissent au scroll ; le parcours est épinglé et défile horizontalement au-dessus de 768 px | browser |
| Edge case | `prefers-reduced-motion: reduce` | Aucune animation, aucun épinglage, tout le contenu visible | browser |
| Edge case | Mobile 375 px | Parcours empilé verticalement, pas d'épinglage ni de débordement | browser |
| Edge case | Navigation client aller-retour vers `/` | Pas de ScrollTrigger orphelin ni d'erreur console | browser |

## Tasks to do

### `1)` Socle GSAP

> Un point d'entrée unique pour les plugins.

1. `gsap.ts` (`"use client"`) : enregistre `useGSAP` et `ScrollTrigger`, réexporte `gsap`.

### `2)` Hero

> Entrée spectaculaire sans masquer le nom au SSR.

1. `hero-intro.tsx` : timeline GSAP dans `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`, lettres du nom qui montent (transform uniquement, l'état SSR reste visible), accroche et boutons en cascade, parallaxe de la photo et du dégradé au scroll.
2. Le H1 garde un nom accessible intact : `aria-label` avec le nom complet, lettres découpées en `aria-hidden`.

### `3)` Scroll

> Révéler et mettre en scène les sections.

1. `scroll-reveal.tsx` : enveloppe qui révèle ses enfants en cascade au scroll (ScrollTrigger, `once`).
2. `timeline-scroll.tsx` : au-dessus de 768 px, épingle la section parcours et la fait défiler horizontalement au scroll ; en dessous, simple révélation verticale.
3. `marquee.tsx` : bande de certifications en défilement continu, en pause au survol et au focus. La copie dupliquée pour la boucle est en `aria-hidden`. En reduced-motion, la bande devient une grille sur plusieurs lignes, tous les badges visibles.

### `4)` Micro-interactions

> Retour au survol avec Motion.

1. `motion-card.tsx` : `MotionConfig reducedMotion="user"` + `LazyMotion` + `domAnimation`, carte `m.div` avec léger soulèvement et lueur ambre au survol et au focus. Utilisé par les cartes de compétences et de projets, jamais sur un élément animé par GSAP.

### `5)` Branchement

> Envelopper les sections.

1. Envelopper hero, compétences, certifications, parcours et projets avec les composants ci-dessus.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Un seul enregistrement de plugins, aucun import GSAP côté serveur |
| 2 | Le H1 est visible dans le HTML serveur avec un `aria-label` complet ; l'intro joue à l'hydratation |
| 3 | En reduced-motion et en mobile, aucun épinglage ; en desktop, le parcours défile horizontalement |
| 4 | Le survol d'une carte de compétence ou de projet déclenche l'effet Motion |
| 5 | `pnpm build` passe ; aucune erreur console sur `/` |
