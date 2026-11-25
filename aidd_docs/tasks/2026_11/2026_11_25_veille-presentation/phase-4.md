---
status: done
---

# Instruction: Documentation et vérifications du projet

## Architecture projection

```txt
.
├── aidd_docs/
│   └── memory/
│       ├── design.md ✏️
│       ├── project-brief.md ✏️
│       └── testing.md ✏️
└── tests/
    └── e2e/
        └── entry.spec.ts ✏️
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | Dépendances installées | Les scripts du projet tournent | cli |
| Happy path | `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm test:e2e` | Tout passe | cli |
| Edge case | `/veille` sans JavaScript | La présentation et les fiches sont entières | browser |

## Tasks to do

### `1)` Couvrir la présentation par un test

> La présentation reste visible et lisible.

1. Dans `tests/e2e/entry.spec.ts`, vérifier sur `/veille` que la problématique de `src/lib/veille.ts` et la section « Fiches publiées » sont visibles, et que la page ne déborde pas à 375 px.
2. Ajouter un test avec JavaScript désactivé (`test.use({ javaScriptEnabled: false })`) : la présentation et chaque fiche restent dans la page.

### `2)` Mettre à jour la mémoire du projet

> La documentation décrit la page telle qu'elle est.

1. `aidd_docs/memory/design.md` : la présentation permanente, la section « Fiches publiées », le champ `takeaway`, aucune animation sur la présentation.
2. `aidd_docs/memory/project-brief.md` : le sujet et la démarche hebdomadaire de la veille.
3. `aidd_docs/memory/testing.md` : les tests e2e ajoutés à `entry.spec.ts` (ouverture des fiches depuis la liste, présentation, rendu sans JavaScript).

### `3)` Lancer les vérifications du projet

> Les commandes de `aidd_docs/memory/coding-assertions.md` passent.

1. Lancer via Portly (`portly temp … --timeout …` puis `portly wait`) `pnpm typecheck`, `pnpm lint`, `pnpm test`, puis `pnpm build` et `pnpm test:e2e`, un seul à la fois pour `build` et `e2e` (ils écrivent tous deux dans `.next`). Avant `e2e`, libérer le port 3100 et vérifier l'accès réseau ; si `contact-turnstile.spec.ts` échoue faute de réseau, le relancer seul une fois le réseau revenu et le signaler.
2. Contrôler le rendu de `/veille` en 1440 et 375 px, et au clavier.

### `4)` Résumer les changements et les vérifications

> Yanis sait ce qui a changé et ce qui a été vérifié, ou pas.

1. Rédiger le résumé final : les changements par partie de la page, les fichiers touchés, chaque vérification lancée avec son résultat, et ce qui n'a pas pu être vérifié.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Le test échoue si la présentation disparaît, si la page déborde sur téléphone, ou si la présentation ou une fiche manque sans JavaScript. |
| 2 | `design.md`, `project-brief.md` et `testing.md` décrivent la page et les tests livrés. |
| 3 | Les cinq commandes sortent en 0, ou l'échec réseau de `contact-turnstile.spec.ts` est relancé et signalé. |
| 4 | Le résumé liste les changements, les vérifications avec leur résultat et ce qui reste non vérifié. |
