# Coding Assertions

Les vérifications qui doivent passer pour qu'un changement soit considéré comme terminé. À lancer après chaque modification. Les scripts sont déclarés dans `package.json` au moment du scaffold.

## Before commit

La vérification rapide.

| Ordre | Commande         | Vérifie                     |
| ----- | ---------------- | --------------------------- |
| 1     | `pnpm typecheck` | typage TypeScript 7 (`next typegen && tsc --noEmit`, `next typegen` génère les types de routes `PageProps`/`LayoutProps`) |
| 2     | `pnpm lint`      | règles ESLint via la CLI `eslint` (flat config `eslint.config.mjs`, `next lint` est supprimé en Next 16) |
| 3     | `pnpm test`      | tests unitaires Vitest (contenu, sitemap, métadonnées) |

## Before push

La vérification complète.

| Ordre | Commande     | Vérifie                                   |
| ----- | ------------ | ----------------------------------------- |
| 1     | `pnpm build` | build Next.js complet, prérendu de toutes les pages (MDX compris) |
| 2     | `pnpm test:e2e` | smoke test Playwright sur le build de production (statuts 200/404, sitemap, robots, navigation) |

## Behavior

Si une correction est nécessaire, lancer 1 agent par vérification en échec (par exemple typage, lint et build en échec = 3 agents).
