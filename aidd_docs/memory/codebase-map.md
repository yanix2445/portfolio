# Codebase Map

Les grandes zones du code et ce que contient chacune. C'est une carte pour s'orienter, pas l'arborescence complète, qui se trouve dans `aidd_docs/INSTALL.md`.

```mermaid
flowchart TD
  App["src/app · routes et pages"]
  Components["src/components · UI et animations"]
  Content["src/content · projets et veille en MDX"]
  Actions["src/actions · Server Actions"]
  Lib["src/lib · helpers et clients"]
  Public["public · CV, images"]

  App --> Components
  App --> Content
  App --> Actions
  Actions --> Lib
  App --> Lib
```

## Areas

- `src/app` : les routes de l'App Router (accueil, projets, veille, contact, mentions légales) ainsi que `sitemap.ts`, `robots.ts` et l'image OpenGraph.
- `src/components` : `ui/` pour les composants shadcn, `layout/`, `content/` (liste de cartes, métadonnées et page de détail partagées par projets et veille), `animations/` (GSAP et Motion, toujours en `"use client"`), et `mdx/` pour les composants utilisables dans le MDX.
- `src/types` : les déclarations de modules, dont `*.mdx` (qui type `export const metadata`).
- `src/content` : un fichier MDX par projet ou article de veille. On ajoute du contenu ici.
- `src/actions` : les Server Actions. Pour l'instant, il n'y a que le formulaire de contact.
- `src/lib` : le listing du contenu MDX (`content.ts`), les constantes du site (`site.ts`, dont `SITE_URL`), le client Resend, l'appel Turnstile et `cn()`.
- `public` : le CV en PDF et les images des projets.

## Entry points

- `src/app/layout.tsx` : le layout racine (fonts, metadata globale, Vercel Analytics).
- `src/mdx-components.tsx` : obligatoire pour `@next/mdx`.
- `next.config.ts` : la configuration MDX.
