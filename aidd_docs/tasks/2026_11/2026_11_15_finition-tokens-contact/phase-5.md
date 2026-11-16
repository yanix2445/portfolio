---
status: implemented
---

# Instruction: Vérification finale, DESIGN.md et mémoire

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── DESIGN.md ✅
├── PRODUCT.md ✏️
└── aidd_docs/
    └── memory/
        ├── api.md ✏️
        ├── codebase-map.md ✏️
        ├── design.md ✏️
        ├── forms.md ✏️
        ├── integration.md ✏️
        └── testing.md ✏️
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm test:e2e` via Portly | Les 5 commandes sortent en 0 | cli |
| Happy path | Lighthouse mobile sur `/` et `/contact` du build de production | Performance ≥ 85, accessibilité 100 | cli |
| Happy path | Comparaison finale des captures avec la référence de la phase 1 | Seuls le final, les boutons, les badges, les filtres et `/contact` diffèrent ; écarts listés | cli |
| Happy path | Yanis envoie un message depuis la prévisualisation, ses clés saisies | Le mail arrive dans sa boîte, la réponse part vers l'adresse saisie | browser |
| Edge case | Détecteur Impeccable sur les fichiers d'interface modifiés | Aucun défaut bloquant | cli |

## Tasks to do

### `1)` Vérifications

> Prouver que la spec est tenue.

1. Les 5 commandes, Lighthouse sur les deux pages, comparaison finale des captures, détecteur Impeccable.
2. Revue indépendante du diff, puis correction de ce qu'elle trouve.

### `2)` Documentation

> Décrire le code réel.

1. `DESIGN.md` : tokens, typographie, composants et règles, générés depuis le code final.
2. Mémoire : `design.md` (tokens, primitives, plus de CSS préfixé), `codebase-map.md` (dossiers), `forms.md`, `integration.md`, `api.md` (formulaire en service), `testing.md` (comparaison de captures, tests du formulaire) ; `PRODUCT.md` (formulaire livré).
3. Resynchroniser le bloc mémoire de `CLAUDE.md`.

### `3)` Livraison

> Faire valider par Yanis.

1. Pousser sur la PR #13 et mettre à jour sa description.
2. Donner à Yanis la liste des quatre variables à saisir dans Vercel et `.env.local`, puis attendre son message de test et sa validation. Aucune fusion avant.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Les 5 commandes sortent en 0 ; les deux pages atteignent 85 et 100 ; la revue ne laisse aucun point bloquant ouvert |
| 2 | `DESIGN.md` et la mémoire ne citent aucun fichier disparu |
| 3 | La PR #13 décrit la passe ; Yanis a reçu la liste des variables |
