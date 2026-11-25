---
status: done
---

# Instruction: Présentation permanente de la veille

## Architecture projection

```txt
.
└── src/
    ├── app/
    │   └── veille/
    │       └── page.tsx ✏️
    ├── components/
    │   └── content/
    │       └── veille-intro.tsx ✅
    └── lib/
        └── veille.ts ✅
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | Build de production | `/veille` répond 200 | system |
| Happy path | Ouvrir `/veille` | La présentation affiche le sujet, la problématique, la position, l'objectif et la démarche, avant la liste des fiches | browser |
| Edge case | JavaScript désactivé | La présentation est entière | browser |
| Edge case | Écran de 375 px | La présentation passe en une colonne, sans débordement horizontal | browser |
| Edge case | `prefers-reduced-motion: reduce` | Rien ne bouge ni n'est masqué | browser |

## Wireframe

```txt
┌──────────────────────────────────────────────────────────┐
│ (1) En-tête de page : VEILLE · phrase d'introduction     │
├──────────────────┬───────────────────────────────────────┤
│ (2) LE SUJET     │ L'IA comme assistant pour administrer,│
│                  │ développer et dépanner une infra…     │
├──────────────────┼───────────────────────────────────────┤
│ (3) PROBLÉMATIQUE│ « Dans quelle mesure l'IA peut-elle…» │
├──────────────────┼───────────────────────────────────────┤
│ (4) MA POSITION  │ L'IA propose et assiste. L'admin…     │
├──────────────────┼───────────────────────────────────────┤
│ (5) CE QUE JE    │ · gains de temps ou d'efficacité      │
│     CHERCHE      │ · limites et risques                  │
│                  │ · méthode sécurisée, traçable…        │
├──────────────────┼───────────────────────────────────────┤
│ (6) MA MÉTHODE   │ Pendant la semaine │ En fin de semaine │
│                  │ Chaque fiche : étudié · fait ou testé │
│                  │ · observé · retenu ; lu / vérifié     │
├──────────────────┴───────────────────────────────────────┤
│ (7) FICHES PUBLIÉES (phase 3)                            │
└──────────────────────────────────────────────────────────┘
```

1. En-tête : le titre « Veille » et une phrase qui annonce le sujet et le rythme hebdomadaire.
2. Le sujet : la thématique en une phrase.
3. La problématique : la question de Yanis, mot pour mot, en grande citation, seul moment fort de la présentation.
4. La position : l'IA propose, l'administrateur vérifie, décide et reste responsable.
5. L'objectif, dans le cadre du parcours SISR : trois buts.
6. La démarche : les deux temps de la semaine, puis le contenu d'une fiche et la distinction entre lu et vérifié.
7. La liste des fiches, séparée par un filet et son propre titre.

## Tasks to do

### `1)` Écrire le texte de la présentation

> Le texte vit dans `src/lib/veille.ts`, tiré mot pour mot ou de près de la demande de Yanis, sans rien ajouter.

1. Créer `src/lib/veille.ts` avec le sujet, la problématique, la position, les trois buts et la démarche (deux temps, quatre parties d'une fiche, distinction lu / vérifié).
2. Relire chaque phrase avec le contrôle « no AI tells » de copywriting.

### `2)` Afficher la présentation

> Une section « La veille » sur la grille 0.78fr / 1.22fr de la « Fiche technique », libellés mono à gauche, texte à droite, une colonne sur téléphone.

1. Créer `src/components/content/veille-intro.tsx` (Server Component, aucune animation).
2. Dans `src/app/veille/page.tsx`, placer la présentation sous l'en-tête et avant la liste ; réécrire l'introduction et la description de la page à partir de `src/lib/veille.ts`.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | `src/lib/veille.ts` contient la problématique de Yanis mot pour mot et aucune affirmation absente de sa demande. |
| 2 | Sur `/veille`, en 1440 et 375 px, les cinq parties de la présentation sont visibles avant la liste, sans débordement, et entières sans JavaScript. |
