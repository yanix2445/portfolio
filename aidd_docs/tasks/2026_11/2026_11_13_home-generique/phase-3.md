---
status: implemented
---

# Instruction: Catalogue des projets

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── src/
│   ├── app/
│   │   └── projets/
│   │       └── page.tsx ✏️
│   └── components/
│       └── projects/
│           └── catalog.tsx ✅
└── tests/
    └── e2e/
        ├── projects.spec.ts ✅
        └── site.spec.ts ✏️
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | Ouvrir `/projets` | Tous les projets en affiches, chacun avec son statut | browser |
| Happy path | Cliquer sur un filtre de domaine | Seuls les projets de ce domaine restent ; « Tous » les ramène | browser |
| Edge case | JavaScript désactivé | Tous les projets sont listés, les filtres ne masquent rien | browser |
| Edge case | Filtres au clavier | Chaque filtre est atteignable à la touche Tab, activable à Entrée ou Espace, avec un focus visible et son état annoncé | browser |
| Edge case | Viewport 375 × 812 | Affiches en une colonne, pas de défilement horizontal | browser |

## Wireframe

```txt
┌──────────────────────────────────────────────┐
│ (1) Titre « Tous les projets » · compteur    │
├──────────────────────────────────────────────┤
│ (2) Filtres : Tous · un bouton par domaine   │
│     présent dans les projets                 │
├──────────────────────────────────────────────┤
│ (3) Grille d'affiches, 3 par ligne           │
│  ┌────────┐ ┌────────┐ ┌────────┐            │
│  │(4)statut│ │        │ │        │            │
│  │ titre  │ │        │ │        │            │
│  └────────┘ └────────┘ └────────┘            │
└──────────────────────────────────────────────┘
```

1. Titre en lettrage d'affiche et nombre total de projets.
2. Filtres en boutons : « Tous », puis uniquement les domaines qui ont au moins un projet. Le filtre actif est signalé (`aria-pressed`).
3. Grille : 3 colonnes sur ordinateur, 2 sur tablette, 1 sur mobile.
4. Statut sur chaque affiche : « À l'affiche », « En tournage » ou « Prochainement ».

## Tasks to do

### `1)` Catalogue

> Lister et filtrer.

1. `catalog.tsx` (`"use client"`) : reçoit la liste des projets, affiche les filtres des domaines présents et la grille d'affiches (`poster.tsx` et `status-badge.tsx` de la phase 2) ; rendu serveur avec tous les projets visibles.
2. La grille est une liste (`<ul>`, `<li>`), chaque affiche un lien contenant un titre : c'est la structure que lit le test « contenu MDX » de `site.spec.ts`.
3. `projets/page.tsx` : titre, compteur, `<Catalog />`, métadonnées SEO conservées. `EntryList` reste utilisé par `/veille`.

### `2)` Tests

> Verrouiller le catalogue.

1. `projects.spec.ts` : tous les projets listés avec un statut, filtre qui réduit puis rétablit la liste, filtres utilisables au clavier, rendu sans JavaScript, 375 px.
2. Relancer `site.spec.ts` ; n'ajuster son sélecteur que si la structure de liste ne suffit pas.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Chaque affiche porte un statut ; le filtre réduit la liste au domaine choisi ; sans JavaScript, tout est listé ; chaque projet mène à sa fiche |
| 2 | `pnpm test:e2e` passe, `projects.spec.ts` et `site.spec.ts` compris |
