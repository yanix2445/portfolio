---
status: done
---

# Instruction: Filet de sécurité des liens de la veille

## Architecture projection

```txt
.
└── tests/
    └── e2e/
        └── entry.spec.ts ✏️
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | Build de production servi par Playwright | `/veille` répond 200 | system |
| Happy path | Cliquer chaque fiche de la liste de `/veille` | La page de la fiche s'ouvre, son `h1` porte le titre de la ligne | browser |
| Edge case | Une fiche dont le titre contient des espaces insécables | Le titre comparé est celui de `data-title`, espaces compris | browser |

## Tasks to do

### `1)` Verrouiller l'ouverture des fiches depuis la liste

> Un test e2e prouve que chaque fiche listée sur `/veille` ouvre sa page.

1. Dans `tests/e2e/entry.spec.ts`, ajouter un test qui parcourt les liens des lignes de `/veille`.
2. Pour chacun, cliquer, attendre l'URL `/veille/<slug>` et vérifier que le `h1` reprend `data-title`.
3. Vérifier que le port 3100 est libre (`lsof -ti tcp:3100`), puis lancer les e2e via Portly : `job_id="$(portly temp 'pnpm test:e2e' --name e2e --timeout 30m)"` et `portly wait "$job_id"`. Le test passe sur l'état actuel, avant toute modification.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Le nouveau test passe sur l'état actuel de la branche, et échouerait si un lien de la liste cassait. |
