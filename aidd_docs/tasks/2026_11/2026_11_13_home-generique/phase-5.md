---
status: pending
---

# Instruction: Vérification finale et mémoire

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
└── aidd_docs/
    └── memory/
        ├── architecture.md ✏️
        ├── codebase-map.md ✏️
        ├── design.md ✏️
        ├── project-brief.md ✏️
        └── testing.md ✏️
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm test:e2e` via Portly | Les 5 commandes sortent en 0 | cli |
| Happy path | Lighthouse mobile sur `/` du build de production | Performance ≥ 85, accessibilité 100 | cli |
| Happy path | Captures à 1440 et 375 de `/`, `/projets`, une fiche projet, `/veille`, `/contact`, `/mentions-legales`, la 404 | Rien d'illisible dans le nouvel univers, aucun accent masqué | browser |
| Happy path | Ouvrir la prévisualisation Vercel de la PR | Le site s'affiche comme en local ; Yanis valide ou liste ses retouches | browser |
| Edge case | Comparer les captures de l'accueil à la maquette, section par section | Même composition ; les écarts sont listés et justifiés | browser |

## Tasks to do

### `1)` Vérifications

> Prouver que la spec est tenue.

1. Lancer les 5 commandes et corriger jusqu'au vert.
2. Lighthouse mobile via `portly temp` (build, `pnpm start` sur un port dédié, Chromium de Playwright). Si la performance est sous 85, alléger l'effet le plus coûteux.
3. Captures de toutes les pages et de l'animation à plusieurs instants, relues une par une.

### `2)` Mémoire

> Décrire le code réel.

1. `design.md` : univers « Générique » (palette, polices, utilitaires), composants d'animation, règles (tête entière, accents, mobile en colonne).
2. `codebase-map.md` : `src/components/home/`, `projects/`, `animations/`, `src/app/fonts/`.
3. `testing.md` : nouveaux tests e2e et mesure Lighthouse.
4. `architecture.md` et `project-brief.md` : modèle de contenu (à la une, statut, domaine), catalogue, retrait de `motion`.
5. Resynchroniser le bloc mémoire de `CLAUDE.md` avec le script du plugin.

### `3)` Prévisualisation

> Faire valider le rendu réel par Yanis.

1. Pousser la branche et ouvrir la PR en brouillon : Vercel crée la prévisualisation.
2. Donner à Yanis l'URL de prévisualisation et attendre sa validation sur ordinateur et sur téléphone. Aucune fusion avant.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Les 5 commandes sortent en 0 ; Lighthouse mobile ≥ 85 en performance et 100 en accessibilité ; captures relues sans défaut |
| 2 | Les fichiers de mémoire décrivent l'univers « Générique » et plus l'ancien accueil ambre |
| 3 | La PR en brouillon a une prévisualisation Vercel verte, et Yanis a validé le rendu avant toute fusion |
