# Codebase Audit: ui

L'interface respecte son design system : les tokens sont dans `globals.css`, les composants n'écrivent aucune couleur en dur, les états vides et d'erreur existent, et l'accessibilité est soignée (focus, `aria-*`, mouvement réduit, rendu sans JavaScript). Deux points mineurs.

- **Date**: 2026_11_24
- **Scope**: `src/components/`, `src/app/`, `src/lib/contact-emails.ts`
- **Health**: good
- **Findings**: 0 critical, 0 major, 2 minor

Sévérité : 🔴 critique, 🟡 majeur, 🟢 mineur. Effort : `S` < 1 h, `M` < 1 j, `L` > 1 j.

## Findings

| Sev | Category | Location | Issue | Suggested fix | Effort |
| --- | -------- | -------- | ----- | ------------- | ------ |
| 🟢  | ui       | `src/components/content/entry-list.tsx:29` | Toute la ligne d'un article est un seul lien : un lecteur d'écran annonce date, titre, résumé, sujets et « Lire l'article » à chaque entrée. **Corrigé le 2026-11-24** (`aria-labelledby` sur le titre). | Garder la ligne cliquable avec un pseudo-élément étiré, et ne nommer le lien que par le titre (`aria-labelledby` sur le `h2`). | S |
| 🟢  | ui       | `src/lib/contact-emails.ts:14` | Les couleurs des mails recopient les tokens de `globals.css` (c'est obligatoire : un mail n'a pas de variables CSS), mais rien ne vérifie qu'elles restent synchronisées. **Corrigé le 2026-11-24** (test de synchronisation ; filet aligné en `#3d3a35`). | Test unitaire qui lit `globals.css` et compare chaque valeur de `COLOR`. | S |

## Top actions

1. Simplifier le nom accessible des lignes de la veille (ligne 1).
2. Ajouter le test de synchronisation des couleurs des mails (ligne 2), à faire en même temps que les autres tests de `tests.md`.

Le bug d'envoi du formulaire, invisible pour le visiteur (aucun retour), est compté dans `code-quality.md`.

## Coverage

- **Scanned**: ui (états de chargement, d'erreur et vides, hiérarchie visuelle, dérive des tokens, points de rupture, accessibilité par lecture du balisage)
- **Skipped**: aucune URL fournie, pas de passe d'accessibilité axe à l'exécution, inspection statique seulement. Référence : Lighthouse accessibilité 100 sur l'accueil et `/contact` le 2026-11-15 (`testing.md`).
