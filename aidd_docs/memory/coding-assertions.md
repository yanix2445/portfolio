# Coding Assertions

Les vérifications qui doivent passer pour qu'un changement soit considéré comme terminé. À lancer après chaque modification. Les scripts sont déclarés dans `package.json` au moment du scaffold.

## Before commit

La vérification rapide.

| Ordre | Commande         | Vérifie                     |
| ----- | ---------------- | --------------------------- |
| 1     | `pnpm typecheck` | typage TypeScript (`tsc --noEmit`) |
| 2     | `pnpm lint`      | règles ESLint               |

## Before push

La vérification complète.

| Ordre | Commande     | Vérifie                                   |
| ----- | ------------ | ----------------------------------------- |
| 1     | `pnpm build` | build Next.js complet, génération SSG de toutes les pages MDX |

## Behavior

Si une correction est nécessaire, lancer 1 agent par vérification en échec (par exemple typage, lint et build en échec = 3 agents).
