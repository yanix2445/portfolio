---
status: implemented
---

# Instruction: Mise en scène au défilement

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── src/
│   └── components/
│       ├── animations/
│       │   ├── acts-scroll.tsx ✅
│       │   ├── gsap.ts ✏️
│       │   ├── hero-scroll.tsx ✅
│       │   └── reveal.tsx ✅
│       └── home/
│           ├── acts-section.tsx
│           ├── awards-section.tsx
│           ├── bill-section.tsx
│           ├── finale-section.tsx
│           ├── hero-section.tsx
│           └── sheet-section.tsx
└── tests/
    └── e2e/
        └── home.spec.ts
```

Les fichiers `home/` et `home.spec.ts` sont créés ou réécrits en phase 2 et modifiés ici.

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | Charger `/` à 1440 × 900 | Le nom monte ligne par ligne, la photo arrive en fondu avec un léger zoom | browser |
| Happy path | Défiler le hero | La photo se range en affiche à droite, le nom rétrécit, « YANIS » se remplit, le synopsis apparaît | browser |
| Happy path | Défiler les actes | La section est épinglée, les 5 actes défilent horizontalement, la barre de progression avance | browser |
| Edge case | À la fin de l'animation du hero | Le haut de la photo n'est pas rogné : la tête est entière | browser |
| Edge case | `prefers-reduced-motion: reduce` | Aucune animation, rien d'épinglé, tout le contenu visible | browser |
| Edge case | Viewport 375 × 812 | Pas d'épinglage ni de défilement horizontal ; simples apparitions | browser |
| Edge case | Aller sur `/projets` puis revenir | Aucun espace d'épinglage orphelin, aucune erreur console | browser |

## Tasks to do

### `1)` Hero

> L'ouverture de la maquette.

1. `hero-scroll.tsx` : intro au chargement (lignes du nom, photo, bandeau), sautée si l'hydratation dépasse 1,5 s.
2. Au-dessus de 768 px : section épinglée, photo qui passe du plein cadre à l'affiche (`top: 13vh`, `height: 70vh`, `object-position: 50% 0%`), nom à l'échelle 0,44, remplissage de « YANIS », apparition du synopsis.
3. Tout dans `gsap.matchMedia()` : rien ne tourne en mouvement réduit.

### `2)` Actes

> Le défilement horizontal.

1. `acts-scroll.tsx` : au-dessus de 768 px, passe les actes en rangée, épingle la section, translate la rangée, met à jour « Acte n / 5 » et la barre.
2. Parallaxe du numéro et apparition des textes de chaque acte via `containerAnimation`.
3. En dessous de 768 px : apparition simple de chaque acte.

### `3)` Apparitions

> Le reste de la page.

1. `reveal.tsx` : apparition en cascade des enfants marqués, une seule fois.
2. L'appliquer aux titres, aux affiches (avec une légère rotation à l'arrivée, puis droites), aux lignes de la fiche technique, aux couronnes et à la fin.
3. Survol des affiches en CSS (soulèvement), sous `motion-safe`.

### `4)` Tests

> Verrouiller la mise en scène.

1. Compléter `home.spec.ts` :
   - sur ordinateur, les actes sont épinglés et le dernier devient visible après défilement ;
   - à la fin du hero, le haut de l'image n'est pas au-dessus du haut de son cadre ;
   - mouvement réduit : rien d'épinglé, tout visible ;
   - mobile : rien d'épinglé ;
   - navigation aller-retour sans espace orphelin.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | L'ouverture reproduit la maquette ; la tête reste entière du début à la fin du défilement |
| 2 | Les 5 actes défilent horizontalement sur ordinateur et sont en colonne sur mobile |
| 3 | Chaque section apparaît une fois au défilement ; les affiches finissent droites |
| 4 | `pnpm test:e2e` passe, y compris en mouvement réduit et sur mobile |
