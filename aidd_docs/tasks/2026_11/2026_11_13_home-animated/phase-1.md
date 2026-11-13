---
status: implemented
---

# Instruction: Thème sombre, données du profil et dépendances

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── src/
│   ├── app/
│   │   ├── globals.css ✏️
│   │   └── layout.tsx ✏️
│   └── lib/
│       └── profile.ts ✅
├── tests/
│   └── unit/
│       └── profile.test.ts ✅
└── package.json ✏️
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | Installer `gsap@3.15.1`, `@gsap/react@2.1.2`, `motion@14.13.0` | Présents dans `dependencies` | cli |
| Happy path | `pnpm test` | Le test du profil passe : 6 groupes de compétences, 6 étapes de parcours triées par date, certifications non vides | cli |
| Happy path | `pnpm build && pnpm test:e2e` | Toutes les pages existantes répondent comme avant, en thème sombre | cli |
| Edge case | Page de détail MDX en sombre | Le texte `prose` reste lisible (inversé) | browser |

## Tasks to do

### `1)` Dépendances d'animation

> Disposer de GSAP et Motion.

1. `pnpm add gsap@3.15.1 @gsap/react@2.1.2 motion@14.13.0` via Portly.

### `2)` Thème sombre et accent

> Passer le site en sombre et poser l'accent ambre.

1. Ajouter `dark` à la classe de `<html>` dans `layout.tsx`.
2. Dans `globals.css`, ajouter un token `--brand` (ambre/orangé, oklch) et `--brand-foreground` dans `:root` et `.dark`, exposés en `--color-brand` et `--color-brand-foreground` dans `@theme inline`.

### `3)` Données du profil

> Centraliser le contenu du CV.

1. Créer `src/lib/profile.ts` avec des tableaux typés : `SKILL_GROUPS` (6 groupes, titre + éléments), `CERTIFICATIONS` (émetteur + intitulé), `TIMELINE` (période, titre, lieu, résumé d'une ligne, type `formation` / `experience` / `soft-skills`), et `HERO` (accroche, rythme d'alternance).
2. Reprendre fidèlement le CV (`public/cv/yanis-harrat-cv.pdf`) et le brief, sans rien inventer.
3. Créer `tests/unit/profile.test.ts` : comptes attendus, ordre chronologique du parcours, aucun champ vide.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | `package.json` contient les 3 dépendances aux versions exactes |
| 2 | `<html>` porte `dark` ; `bg-brand` et `text-brand` sont générés au build |
| 3 | `src/lib/profile.ts` contient 6 groupes, 6 étapes et 7 certifications conformes au CV ; le test unitaire passe |
