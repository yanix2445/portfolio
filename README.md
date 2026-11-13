# Portfolio

Portfolio personnel de Yanis Harrat (BTS SIO option SISR), publié sur [yanis-harrat.com](https://yanis-harrat.com). Il présente le parcours, les projets et la veille technologique.

## Stack

- Next.js 16 (App Router, prérendu statique), TypeScript
- Tailwind CSS 4 et shadcn/ui
- Contenu en MDX via `@next/mdx`
- PNPM, hébergement Vercel

## Commandes

| Commande         | Rôle                         |
| ---------------- | ---------------------------- |
| `pnpm dev`       | serveur de développement     |
| `pnpm typecheck` | typage TypeScript            |
| `pnpm lint`      | règles ESLint                |
| `pnpm build`     | build de production complet  |

Installation : `pnpm install`. Les variables d'environnement sont listées dans `.env.example` (à copier en `.env.local`).

## Documentation

Architecture, choix de stack et audit des alternatives : [`aidd_docs/INSTALL.md`](aidd_docs/INSTALL.md).

## CV

Déposer le CV en PDF dans `public/cv/yanis-harrat-cv.pdf` : le lien « CV (PDF) » du site renvoie une 404 tant que ce fichier est absent.
