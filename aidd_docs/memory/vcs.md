# VCS

Les conventions de gestion de version du projet : branches, commits et plateforme.

## Setup

- Main branch : `main`, protégée. Aucun travail ne se fait directement dessus.
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
