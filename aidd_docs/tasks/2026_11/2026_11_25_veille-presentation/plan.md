---
objective: "La page /veille présente en permanence le sujet, la problématique, la position, l'objectif et la démarche de la veille, puis liste à part les fiches publiées, chacune avec son numéro et ce que Yanis en retient."
status: implemented
---

# Plan: Présentation permanente de la veille et fiches publiées

Source: demande de Yanis du 2026-11-25 dans la conversation (thématique, problématique, positionnement, objectif, démarche), et le brief validé (Impeccable shape, Emil, marketing-skills copywriting).

## Phases

| #   | Phase | File | Depends on |
| --- | ----- | ---- | ---------- |
| 1   | Filet de sécurité des liens de la veille | [`phase-1.md`](./phase-1.md) | none |
| 2   | Présentation permanente de la veille | [`phase-2.md`](./phase-2.md) | 1 |
| 3   | Fiches publiées numérotées avec ce que j'en retiens | [`phase-3.md`](./phase-3.md) | 1, 2 |
| 4   | Documentation et vérifications du projet | [`phase-4.md`](./phase-4.md) | 2, 3 |

## External sources

| URL | What it settled |
| --- | --------------- |
| none | none |

## Impact

| Category | Verdict and evidence | Handled in |
| -------- | -------------------- | ---------- |
| runtime | Vérifié : Playwright construit le site et le sert sur le port 3100 (`playwright.config.ts`, serveur existant non réutilisé), Chromium est installé. Deux conditions : le port 3100 libre et le réseau ouvert, car `tests/e2e/contact-turnstile.spec.ts` charge le vrai widget Turnstile. Les commandes passent par `portly temp`, comme le veut `deployment.md`. | phase 1, phase 4 |
| regression | Moyen. `/veille` et sa liste changent ; `tests/e2e/entry.spec.ts` couvre déjà les liens nommés par leur titre et les fiches, pas l'ouverture d'une fiche depuis la liste. Un test la verrouille avant tout changement. | phase 1 |
| architecture | Faible. Un champ facultatif `takeaway` s'ajoute à `ContentMeta` (`src/lib/content.ts`) ; le texte de la présentation va dans `src/lib/veille.ts`, comme le profil dans `src/lib/profile.ts`. | phase 2, phase 3 |
| documentation | À mettre à jour, vérifié en lisant les fichiers : `aidd_docs/memory/design.md` décrit la liste de la veille sans présentation permanente ; `aidd_docs/memory/project-brief.md` ne nomme pas le sujet de la veille ; `aidd_docs/memory/testing.md` décrit `tests/e2e/entry.spec.ts` sans les tests ajoutés aux phases 1 et 4. | phase 4 |

## Rules

| Rule | Why it applies |
| ---- | -------------- |
| Ne rien inventer (demande de Yanis, PRODUCT.md « Evidence on Hand ») | Aucune publication, source ni résultat de test ; la ligne « Ce que j'en retiens » cite l'article. |
| Contenu éditorial hors des composants (`src/lib/profile.ts`) | Le texte de la présentation va dans `src/lib/veille.ts`, pas dans le JSX. |
| Pas de surtitre ajouté au-dessus d'un titre (`design.md`, Impeccable) | Les légendes de la présentation sont des libellés de colonne, à gauche, pas des surtitres. |
| Aucune animation ne tourne avec la réduction des animations, rien n'est masqué en CSS (`design.md`) | La présentation n'a aucune animation ; les fiches gardent leurs transitions de survol. |
| Tests e2e sur des invariants, sans titres codés en dur (`testing.md`) | Les nouveaux tests lisent les fiches et `src/lib/veille.ts`. |
| Commits en anglais, Conventional Commits, jamais sur `main` (`vcs.md`) | La branche est `claude/veille-page`. |

## Decisions

| Decision | Why |
| -------- | --- |
| Champ `takeaway` facultatif dans les métadonnées d'une fiche | La page montre ce que Yanis apprend fiche après fiche sans relire chaque article ; une fiche sans ce champ reste valide. |
| Numéro de fiche calculé dans l'ordre de publication (la plus ancienne est la fiche 1) | Le numéro ne change pas quand une fiche paraît ; aucun champ à tenir à jour. |
