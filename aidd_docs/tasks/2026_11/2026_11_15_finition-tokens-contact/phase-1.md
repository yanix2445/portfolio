---
status: implemented
---

# Instruction: Référence visuelle et tokens

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── src/
│   ├── app/
│   │   └── globals.css ✏️
│   └── components/
│       ├── animations/
│       │   └── hero-scroll.tsx ✏️
│       ├── home/
│       │   ├── home.css ✏️
│       │   └── poster.css ✏️
│       └── projects/
│           └── catalog.css ✏️
└── tests/
    └── visual/
        ├── capture.mjs ✅
        └── compare.mjs ✅
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | Capturer la référence sur le build de la PR #13, avant toute modification | Un jeu de captures par page, taille et instant de défilement | cli |
| Happy path | Recapturer après la phase et comparer | Aucun écart au-delà du seuil de bruit | cli |
| Edge case | Chercher une couleur, un rayon ou une taille de texte en dur dans `src/` | Aucun résultat hors déclaration des tokens | cli |

## Tasks to do

### `1)` Référence visuelle

> Figer le rendu validé avant d'y toucher.

1. `capture.mjs` : sur le build de production, captures de `/` (premier écran, cinq instants du hero, quatre des actes, chaque section), `/projets`, une fiche projet, `/veille`, `/contact`, `/mentions-legales`, la 404, en 1440 × 900, 768 × 1024 et 375 × 812, animations terminées.
2. `compare.mjs` : compare deux jeux de captures et liste les images qui diffèrent, avec la part de pixels touchés.
3. Capturer la référence et la garder hors du repo.

### `2)` Tokens

> Une seule source pour chaque valeur de design.

1. Dans `@theme` de `globals.css` : échelle de texte fluide nommée, espacements (gouttière, rythme vertical des sections), rayons dérivés de `--radius`, couleurs dérivées (voiles, filets, halo), graisses, durées et courbes.
2. Remplacer chaque valeur en dur des trois feuilles par son token, sans changer la structure ni le rendu.
3. `hero-scroll.tsx` : la couleur de remplissage du nom est lue dans le thème, plus écrite en dur.
4. Regrouper les tailles de texte quasi identiques seulement si la comparaison de captures reste sous le seuil.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Deux captures successives du même build ne diffèrent pas : le protocole est stable |
| 2 | La comparaison avec la référence ne signale aucun écart ; la recherche de valeurs en dur est vide ; `pnpm typecheck`, `pnpm lint`, `pnpm test` et `pnpm test:e2e` passent |
