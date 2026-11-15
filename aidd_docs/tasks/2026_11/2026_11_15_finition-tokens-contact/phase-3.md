---
status: pending
---

# Instruction: Architecture : Tailwind dans les composants, dossiers rangés

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
└── src/
    ├── app/
    │   ├── globals.css ✏️
    │   ├── page.tsx ✏️
    │   └── projets/
    │       └── page.tsx ✏️
    └── components/
        ├── animations/ ✏️
        ├── home/
        │   ├── acts-section.tsx ✏️
        │   ├── awards-section.tsx ✏️
        │   ├── bill-section.tsx ✏️
        │   ├── finale-section.tsx ✏️
        │   ├── hero-section.tsx ✏️
        │   ├── home.css ❌
        │   ├── home.styles.ts ❌
        │   ├── laurel.tsx ✏️
        │   ├── poster.css ❌
        │   ├── poster.styles.ts ❌
        │   ├── poster.tsx ❌
        │   ├── sheet-section.tsx ✏️
        │   └── status-badge.tsx ❌
        ├── projects/
        │   ├── catalog.css ❌
        │   ├── catalog.tsx ✏️
        │   ├── poster.tsx ✅
        │   └── status-badge.tsx ✅
        └── typography/
            ├── eyebrow.tsx ✅
            └── poster-title.tsx ✅
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | Comparer les captures à celles de la fin de phase 2 | Aucun écart au-delà du seuil de bruit | cli |
| Happy path | Lancer les suites de tests | Tout passe sans modifier une assertion | cli |
| Edge case | Chercher `*.styles.ts`, `gn-`, `gp-`, `gc-` dans `src/` | Aucun résultat | cli |
| Edge case | Défiler l'accueil avec et sans animation | Mise en scène et repli identiques à avant | browser |

## Tasks to do

### `1)` Mise en forme dans les composants

> Le style se lit là où il s'applique.

1. Réécrire chaque section avec des classes Tailwind qui consomment les tokens de la phase 1, une section à la fois, avec comparaison de captures après chacune.
2. Garder en `@utility` dans `globals.css` ce que Tailwind n'exprime pas : lettrage en contour, état horizontal des actes posé par l'animation, copie repliée du synopsis, animation de l'indication de défilement.
3. Supprimer les trois feuilles sur mesure et les deux `*.styles.ts`.

### `2)` Dossiers

> Un dossier, une responsabilité.

1. `typography/` : le titre d'affiche et la légende, utilisés partout.
2. `projects/` : l'affiche et le badge de statut, partagés par l'accueil et le catalogue.
3. `home/` ne garde que les six sections et la couronne.
4. Mettre à jour les imports ; les animations ne ciblent que des attributs `data-*`.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Captures identiques à la fin de phase 2 ; aucune classe préfixée ni fichier `*.styles.ts` ; `globals.css` ne contient que tokens, base et `@utility` |
| 2 | Aucun import de `components/home/` depuis `components/projects/` ou `app/projets/` ; les quatre commandes de vérification passent sans assertion modifiée |
