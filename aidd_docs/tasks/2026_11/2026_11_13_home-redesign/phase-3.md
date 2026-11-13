---
status: pending
---

# Instruction: Tests e2e et assertions

## Architecture projection

```txt
.
└── tests/e2e/home.spec.ts ✏️
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | `portly temp 'pnpm test:e2e'` | build + serveur 3100 | cli |
| Happy path | suite complète | verte | cli |
| Edge case | Lighthouse mobile sur build de prod | perf ≥ 90, a11y 100 | cli |

## Tasks to do

### `1)` Réécrire `home.spec.ts`

> Couvrir le nouveau premier écran.

1. H1 + nom accessible, actions d'appel et de CV, pastille.
2. Démo : progression, pause au survol et bouton, statique en mouvement réduit.
3. Sans JS, 320/375 px sans débordement, focus clavier visible, aucune erreur console.

### `2)` Assertions

> Vérifier le projet entier.

1. `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm test:e2e`.
2. Lighthouse mobile (perf, a11y).

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | `home.spec.ts` vert sur le build de production |
| 2 | Les quatre commandes sortent en 0 ; Lighthouse ≥ 90 / 100 |
