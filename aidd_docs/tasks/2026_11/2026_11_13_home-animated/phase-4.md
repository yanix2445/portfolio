---
status: implemented
---

# Instruction: Tests, mesure de performance et mémoire

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── tests/
│   └── e2e/
│       └── home.spec.ts ✅
└── aidd_docs/
    └── memory/
        ├── codebase-map.md ✏️
        ├── design.md ✏️
        └── testing.md ✏️
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | `pnpm test:e2e` | Les six sections sont présentes et dans l'ordre ; H1 visible ; aucune erreur console | browser |
| Edge case | Contexte Playwright `reducedMotion: 'reduce'` | Toutes les sections visibles sans défiler l'animation | browser |
| Edge case | Viewport 375 × 812 | `scrollWidth` du document ≤ largeur de la fenêtre | browser |
| Happy path | Lighthouse mobile sur `/` (build de production, via Portly) | Score de performance ≥ 75 | cli |

## Tasks to do

### `1)` Tests e2e de l'accueil

> Verrouiller les garanties de la spec.

1. `home.spec.ts` :
   - ordre des six sections, H1 visible avec le nom accessible « Yanis HARRAT », absence d'erreur console ;
   - contexte `javaScriptEnabled: false` : H1, accroche et six sections présents ;
   - `reducedMotion: 'reduce'` : toutes les sections et tous les badges visibles, aucun élément épinglé ;
   - 375 px : pas de débordement horizontal ;
   - clavier : `Tab` atteint les boutons du hero avec un focus visible.
2. Contrôle visuel en sombre de `/projets`, d'une page projet, `/contact`, `/mentions-legales` et de la 404 (captures Playwright).

### `2)` Mesure de performance

> Vérifier le plancher de 75.

1. Via `portly temp` : `pnpm build`, `pnpm start -p 3200` en arrière-plan, puis `CHROME_PATH=<chromium Playwright> npx -y lighthouse@latest http://localhost:3200 --only-categories=performance --form-factor=mobile --chrome-flags=--headless --output=json`, puis arrêt du serveur. Consigner le score ; si < 75, alléger l'effet le plus coûteux.

### `3)` Mémoire

> Aligner la mémoire sur le code.

1. `design.md` : thème sombre global, token `brand`, composants d'animation réels.
2. `codebase-map.md` : `src/components/home/`, `src/components/animations/`, `src/content/profile.ts`.
3. `testing.md` : `home.spec.ts` et la mesure Lighthouse.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | `pnpm test:e2e` passe avec les nouveaux tests ; captures sombres relues sans texte illisible |
| 2 | Score Lighthouse mobile ≥ 75 consigné |
| 3 | Les trois fichiers de mémoire décrivent le code réel |
