---
status: done
---

# Instruction: Accueil : titre trois voix, démo de file, chiffres, sections

## Architecture projection

```txt
.
└── src/
    ├── app/page.tsx ✏️
    └── components/
        ├── animations/
        │   ├── gsap.ts ❌
        │   ├── hero-intro.tsx ❌
        │   ├── marquee.tsx ❌
        │   ├── motion-card.tsx ❌
        │   ├── motion-provider.tsx ❌
        │   ├── scroll-reveal.tsx ❌
        │   ├── timeline-scroll.tsx ❌
        │   ├── ticket-queue.tsx ✅
        │   └── tick-figure.tsx ✅
        └── home/
            ├── certifications-section.tsx ❌
            ├── hero-section.tsx ✏️
            ├── projects-section.tsx ✏️
            ├── section-heading.tsx ❌
            ├── skills-section.tsx ✏️
            ├── timeline-section.tsx ❌
            ├── watch-contact-section.tsx ❌
            ├── demo-section.tsx ✅
            ├── figures-section.tsx ✅
            ├── path-section.tsx ✅
            ├── close-section.tsx ✅
            └── home-ui.tsx ✅
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | build de production | `/` prérendu | cli |
| Happy path | charger `/` en 1440×900 | titre trois voix, pastille, appel et CV visibles, haut de la file visible | browser |
| Happy path | attendre 5 s | des tickets passent à « Résolu » avec une heure | browser |
| Edge case | survol ou focus de la file, bouton pause | la boucle s'arrête | browser |
| Edge case | `prefers-reduced-motion: reduce` | page statique complète, file figée | browser |
| Edge case | JS désactivé | H1, file (instantané) et chiffres finaux visibles | browser |
| Edge case | 320 et 375 px | aucun débordement horizontal | browser |

## Wireframe

```txt
┌───────────────────────────────────────────────────────────┐
│ (1) Yanis HARRAT        Projets  Veille  Contact    [CV]  │
├───────────────────────────────────────────────────────────┤
│ (2) OPÉRATIONNEL                                          │
│     (●portrait●) dès lundi.                               │
│     rôle · BTS SIO SISR · 3 j / 2 j                       │
│     phrase de preuve                                      │
│     [Appeler · 07 68 18 79 34]  [CV (PDF)]                │
│                              ┌───────────────────────────┐│
│ (3) Lundi, je prends …       │ (4) File de support ·ex.  ││
├──────────────────────────────┴───────────────────────────┤│
│ (5) Chiffres en pixel : 4 mois · 16 mois · 7 certifs · 3/2│
│ (6) Compétences en index typographique + certifications   │
│ (7) Parcours en table à filets                            │
│ (8) Projets récents (3 MDX)                               │
│ (9) Clôture : « On en parle lundi ? » + actions           │
│ (10) Footer                                               │
└───────────────────────────────────────────────────────────┘
```

1. Nav fine, nom à gauche, CV à droite.
2. Titre géant : grotesque + pastille portrait + serif italique ; ligne rôle sous le titre.
3. Légende de la démo.
4. File de tickets animée, étiquetée « exemple », qui dépasse le pli à droite.
5. Chiffres du CV en police pixel, en lignes éditoriales (pas de tuiles).
6. Compétences par groupe, en texte courant.
7. Parcours, du plus récent.
8. Trois dernières entrées MDX.
9. Appel final.
10. Liens secondaires.

## Tasks to do

### `1)` Premier écran

> Titre trois voix et actions.

1. H1 « Opérationnel [pastille] dès lundi. », nom accessible avec le nom de Yanis ; ligne rôle (`HERO.role`, `HERO.diploma`, `HERO.rhythm`) et phrase de preuve (entrée helpdesk de `TIMELINE`) sous le titre.
3. Focus tungstène visible sur chaque action, lien et sur le bouton pause.
2. Animation CSS : lignes qui montent d'un masque, pastille qui s'ouvre (clip-path), désactivée en mouvement réduit.

### `2)` Démo de file

> Boucle de tickets N1/N2 jusqu'à « Résolu ».

1. Composant client sans librairie, instantané SSR identique à l'état statique.
2. Pause hors écran, au survol, au focus, onglet caché, bouton pause ; statique en mouvement réduit.

### `3)` Sections de preuve

> Chiffres, compétences, parcours, projets, clôture.

1. Chiffres comptés une fois à l'entrée (police pixel), valeur finale en SSR ; durées calculées depuis les périodes du CV (helpdesk juin–sept. 2026 = 4 mois, chef de rang sept. 2023–janv. 2025 = 16 mois), certifications = `CERTIFICATIONS.length`.
2. Supprimer les anciens composants d'accueil et d'animation.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Premier écran conforme au FIRST VIEWPORT à 1440 et 390 px |
| 2 | Un ticket passe à « Résolu » en moins de 6 s ; aucune progression pendant la pause |
| 3 | Tous les chiffres et faits proviennent de `profile.ts` / `site.ts` |
