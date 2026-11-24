# Codebase Audit: performance

Aucun goulot repéré. Le site est prérendu, GSAP n'est chargé que sur l'accueil, `sonner` que sur `/contact`, et les trois polices locales pèsent de 23 à 37 Ko. Lighthouse mobile mesurait 93 à 95 le 2026-11-15 (`testing.md`).

- **Date**: 2026_11_24
- **Scope**: `src/`, `public/`
- **Health**: good
- **Findings**: 0 critical, 0 major, 1 minor

Sévérité : 🔴 critique, 🟡 majeur, 🟢 mineur. Effort : `S` < 1 h, `M` < 1 j, `L` > 1 j.

## Findings

| Sev | Category    | Location | Issue | Suggested fix | Effort |
| --- | ----------- | -------- | ----- | ------------- | ------ |
| 🟢  | performance | `src/components/home/hero-section.tsx:33` | Le portrait source (`public/images/yanis-harrat.png`) pèse 1,75 Mo. `next/image` le sert optimisé, donc l'impact pour le visiteur reste faible. Mais chaque nouvelle taille passe par l'optimisation d'image de Vercel à partir de ce fichier, et le repo porte le poids. | Remplacer la source par une version compressée (WebP ou JPEG de qualité ~85, 1122 × 1402), en gardant le cadrage. | S |

## Top actions

1. Compresser le portrait source (ligne 1). Gain limité : le faire à la prochaine retouche de la photo.
2. Relancer Lighthouse mobile sur l'accueil et `/contact` après la mise en place de la CSP (`security.md`), pour vérifier que les planchers de 85 et 100 tiennent toujours.

## Coverage

- **Scanned**: performance (heuristiques statiques : requêtes en boucle, données non paginées, poids des ressources de `public/` et des polices, écouteurs de défilement, mémoïsation)
- **Skipped**: aucun profileur ni analyseur de bundle lancé, heuristiques statiques seulement. Lighthouse n'a pas été relancé pour cet audit.
