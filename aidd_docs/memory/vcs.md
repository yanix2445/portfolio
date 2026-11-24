# VCS

Les conventions de gestion de version du projet : branches, commits et plateforme.

## Setup

- Main branch : `main`, protégée depuis le 2026-11-24 par le ruleset GitHub `main` : passage obligatoire par une PR, jobs de CI « Typage, lint et tests unitaires » et « Tests e2e » au vert (GitHub Actions), ni force-push ni suppression. Le rôle admin peut contourner, en cas d'urgence seulement. Renommer un job de `ci.yml` impose de mettre à jour le ruleset, sinon plus aucune PR ne peut être mergée. Aucun travail ne se fait directement sur `main`.
- Platform : GitHub.
- Tickets : aucun tracker pour l'instant.
- Hooks : aucun hook git. Dependabot ouvre les PR de mise à jour des dépendances.

## Branches

- Format : `<type>/<description-courte-en-kebab-case>`. Les branches créées par l'IA suivent `claude/<description-courte>`.
- Types utilisés : `feat`, `fix`, `chore`, `docs`, `refactor`.

## Commits

- Convention : Conventional Commits.
- Format : `type(scope): description`.
- Règles : en anglais, à l'impératif, en minuscules, 72 caractères maximum pour le titre.

## Commit Strategy

AI should auto commit: `never`
