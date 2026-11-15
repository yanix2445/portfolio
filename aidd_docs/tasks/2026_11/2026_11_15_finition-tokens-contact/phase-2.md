---
status: implemented
---

# Instruction: Primitives shadcn/ui, boutons et final

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── src/
│   ├── app/
│   │   ├── contact/
│   │   │   └── page.tsx ✏️
│   │   └── not-found.tsx ✏️
│   └── components/
│       ├── home/
│       │   ├── acts-section.tsx ✏️
│       │   ├── bill-section.tsx ✏️
│       │   ├── finale-section.tsx ✏️
│       │   ├── hero-section.tsx ✏️
│       │   └── status-badge.tsx ✏️
│       ├── layout/
│       │   └── site-header.tsx ✏️
│       ├── projects/
│       │   └── catalog.tsx ✏️
│       └── ui/
│           ├── badge.tsx ✅
│           ├── button.tsx ✅
│           ├── card.tsx ✅
│           └── toggle-group.tsx ✅
└── tests/
    └── e2e/
        └── home.spec.ts ✏️
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | Parcourir l'accueil, le catalogue, `/contact` et la 404 | Chaque bouton, badge, filtre et carte est une primitive shadcn, à coins arrondis | browser |
| Happy path | Lire le final à 1440 px et à 375 px | La phrase de la variante choisie se lit d'un trait, accents entiers | browser |
| Edge case | Filtrer le catalogue au clavier | Filtres atteignables, état pressé annoncé, focus visible | browser |
| Edge case | Comparer les captures à la référence | Seuls le final, les boutons, les badges et les filtres diffèrent | cli |

## Wireframe

```txt
┌──────────────────────────────────────────────┐
│ (1) MON PROCHAIN RÔLE / SE JOUE DANS /       │
│     VOTRE ÉQUIPE. (variante C, fin orange)   │
│                                              │
│ (2) [Appeler · numéro] [Écrire] [CV (PDF)]   │
└──────────────────────────────────────────────┘
```

1. Titre du final : un seul bloc lisible, nommé pour les lecteurs d'écran par la phrase entière.
2. Trois boutons shadcn : un principal orange, deux en contour, coins arrondis.

## Tasks to do

### `1)` Primitives

> Installer et thémer.

1. Ajouter par la CLI shadcn : `button`, `badge`, `card`, `toggle-group`.
2. Thémer dans les composants copiés : variantes et tailles du bouton (dont la grande taille du final), badge de statut et étiquettes, rayons issus du token.

### `2)` Remplacement

> Plus aucun bouton fait main.

1. Boutons et liens-boutons : « Appeler » du header, actions du hero mobile, « Tous les projets », final, retour de la 404.
2. Badges : statut des affiches, mots-clés des actes.
3. Filtres du catalogue sur `toggle-group`, avec le même nom de groupe et un seul filtre actif.
4. Cartes de coordonnées de `/contact` sur `card`.

### `3)` Final

> La phrase lisible.

1. Appliquer la variante C choisie par Yanis (« Mon prochain rôle se joue dans votre équipe. »), avec la marge qui dégage les accents.
2. Adapter les attributs d'animation et le test qui lit le titre du final.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Les quatre composants existent dans `src/components/ui/` et le build passe |
| 2 | Aucun `<button>` ni lien stylé en bouton hors de `src/components/ui/` ; le test clavier du catalogue passe |
| 3 | Le final correspond à la maquette choisie à 1440 px et 375 px ; les captures hors final, boutons, badges et filtres sont inchangées ; les quatre commandes de vérification passent |
