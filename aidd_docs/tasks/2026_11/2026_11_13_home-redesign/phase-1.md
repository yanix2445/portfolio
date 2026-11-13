---
status: done
---

# Instruction: Monde visuel : tokens, polices, header et footer

## Architecture projection

```txt
.
├── public/fonts/
│   ├── archivo-variable.woff2 ✅
│   ├── bodoni-moda-italic-variable.woff2 ✅
│   ├── departure-mono.woff2 ✅
│   └── OFL-*.txt ✅
├── public/images/yanis-harrat-pastille.webp ✅
└── src/
    ├── app/
    │   ├── globals.css ✏️
    │   └── layout.tsx ✏️
    └── components/layout/
        ├── site-header.tsx ✏️
        └── site-footer.tsx ✏️
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | `pnpm build` via Portly | build vert | cli |
| Happy path | ouvrir `/projets`, `/contact`, `/mentions-legales` | fond #121114, texte os, aucune page cassée | browser |
| Edge case | largeur 320 px | le header passe à la ligne sans débordement | browser |
| Edge case | navigation clavier | focus tungstène visible sur liens du header | browser |

## Tasks to do

### `1)` Tokens

> Remplacer l'ancien thème par la palette du portrait.

1. Remapper les tokens shadcn `.dark` sur #121114 / #1C1A1A / #EFE9E1 / #9C948B / #F5B66A.
2. Supprimer `glow-card`, `grain`, marquee ; thémer sélection, caret, scrollbar, focus.

### `2)` Polices

> Trois voix auto-hébergées.

1. `next/font/local` : Archivo (sans/display), Bodoni Moda italique (serif), Departure Mono (pixel).
2. Exposer `--font-sans`, `--font-serif`, `--font-pixel` dans `@theme`.

### `3)` Header et footer

> Même vocabulaire : filets, 6 px, tungstène pour l'action.

1. Header fin : nom, Projets / Veille / Contact, « CV » à droite.
2. Footer : e-mail, mentions légales, GitHub, LinkedIn.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Aucun dégradé, glow ni verre dans `globals.css` ; les autres pages restent lisibles |
| 2 | Les trois polices sont servies depuis le site, aucune requête vers Google Fonts |
| 3 | `site.spec.ts` (nav, footer, JSON-LD) passe |
