---
objective: "L'accueil et le catalogue /projets reproduisent la maquette « Générique » validée, lisibles sur mobile, sans animation et sans JavaScript, sans casser le reste du site."
status: implemented
---

# Plan: Accueil « Générique » et catalogue de projets

Source: [spec.md](./spec.md), brief [brainstorm.md](./brainstorm.md), maquette de référence [mockup/index.html](./mockup/index.html)

## Phases

| #   | Phase | File | Depends on |
| --- | ----- | ---- | ---------- |
| 1   | Fondations : contenu réel, polices, couleurs, données | [`phase-1.md`](./phase-1.md) | none |
| 2   | Accueil statique et responsive | [`phase-2.md`](./phase-2.md) | 1 |
| 3   | Catalogue des projets | [`phase-3.md`](./phase-3.md) | 1, 2 |
| 4   | Mise en scène au défilement | [`phase-4.md`](./phase-4.md) | 2 |
| 5   | Vérification finale et mémoire | [`phase-5.md`](./phase-5.md) | 2, 3, 4 |

## External sources

| URL | What it settled |
| --- | --------------- |
| https://nextjs.org/docs/app/api-reference/components/font | `next/font/local` : `src` relatif au fichier appelant, `weight: '100 900'` pour une police variable, `variable` pour exposer une variable CSS, reliée à Tailwind dans `@theme inline` |
| https://gsap.com/docs/v3/Plugins/ScrollTrigger/ | `pin` + `scrub` + `end: "+=…"`, `invalidateOnRefresh`, `containerAnimation` pour animer les éléments d'un défilement horizontal (tween en `ease: "none"`, ni pin ni snap dedans). `ScrollTrigger.matchMedia()` est déprécié : utiliser `gsap.matchMedia()` |
| https://gsap.com/resources/React | `useGSAP()` avec `scope`, nettoyage automatique, `gsap.matchMedia()` pour les points de rupture et `prefers-reduced-motion` (consulté pour le plan précédent) |

## Impact

| Category | Verdict and evidence | Handled in |
| -------- | -------------------- | ---------- |
| runtime | Aucun service externe nouveau. Les polices passent de Google (via `next/font/google`) à trois fichiers locaux déjà présents dans `mockup/fonts/`. `motion` n'est plus utilisé après la phase 2 et sort de `package.json`. Poids JS et score Lighthouse non mesurés avant la phase 5 | 1, 2, 5 |
| regression | Les tokens de couleur et les polices changent pour tout le site : `/veille`, les pages de détail, `/contact`, `/mentions-legales` et la 404 changent d'apparence. Leur rendu dans le nouvel univers n'est pas vérifié avant la phase 5. Tests touchés : `home.spec.ts` et `profile.test.ts` (ancien accueil, réécrits) ; `content.test.ts` et `seo.test.ts` (une fixture de projet en plus, comptes à ajuster) ; `site.spec.ts` (son test « contenu MDX » lit `/projets` comme une liste de liens à titre : le catalogue garde cette structure). `CV_PATH` est exporté par le header et importé par `/contact` : il part dans `site.ts`. Risque moyen | 1, 2, 5 |
| architecture | Le modèle de contenu des projets gagne trois champs optionnels (`featured`, `status`, `domain`). Les sections de l'accueil restent des Server Components ; seules les enveloppes d'animation et le filtre du catalogue sont des composants client. Les anciens composants d'accueil et d'animation sont supprimés | 1, 2, 3, 4 |
| documentation | `design.md`, `codebase-map.md`, `testing.md`, `architecture.md` et `project-brief.md` décrivent l'ancien accueil ambre : à réécrire. `README.md` : rien à changer | 5 |

## Rules

| Rule | Why it applies |
| ---- | -------------- |
| Jamais de travail sur `main` : branche `claude/home-generique` | Règle globale CLAUDE.md |
| Commandes bornées et serveurs via Portly | Règle globale CLAUDE.md |
| Sections en Server Components, animation en enveloppes `"use client"` dans `src/components/animations/` | `design.md` |
| Rien n'est masqué en CSS ni au rendu serveur : les états de départ sont posés par GSAP dans `gsap.matchMedia(MOTION_OK)` | `design.md`, spec (sans animation, sans JavaScript) |
| Le H1 est visible dès le rendu serveur ; l'intro est sautée si l'hydratation est tardive | `design.md`, acquis de la PR #10 |
| Tests unitaires sur fixtures, e2e sur le build de production, assertions sur des invariants | `testing.md` |
| Tout fait affiché vient du CV, de `profile.ts`, de `site.ts` ou d'une confirmation de Yanis. Confirmés par Yanis le 2026-11-13 : 1re année, alternance à partir de septembre 2027, 16 mois chez Coco Rocco. Tirés du CV (IUT Meaux) : SQL, Git, Python, JavaScript, n8n | spec, `PRODUCT.md` |
| Conventional Commits en anglais | `vcs.md` |

## Decisions

| Decision | Why |
| -------- | --- |
| La branche intègre le contenu de la PR #12 (merge de `claude/real-content-e91032`) dès la phase 1 | La spec exige 3 projets à la une et un catalogue : `main` n'a qu'une fiche d'exemple. La PR #12 pourra être fermée, son contenu partant avec celle-ci |
| Polices en fichiers locaux (`next/font/local`) plutôt que via Google | Ce sont exactement les fichiers de la maquette validée, et le build ne dépend plus du catalogue Google |
| Le filtre du catalogue fonctionne côté client, sans paramètre d'URL | Sous Cache Components, lire les paramètres d'URL sort la page du prérendu. Sans JavaScript, tous les projets restent listés |
| Sur mobile et en mouvement réduit, ni épinglage ni défilement horizontal : les actes sont en colonne | Spec : page utilisable sur téléphone et lisible sans animation |
| La phase 1 ajoute sans rien retirer ; l'ancien accueil et ses données ne sont supprimés qu'en phase 2 | Chaque phase doit se terminer avec un build et des tests verts |
| Le portrait reste `public/images/yanis-harrat.png`, servi par `next/image` | C'est la photo de la maquette (dont `yanis.webp` n'est qu'une conversion) ; `next/image` produit les formats et tailles adaptés |
| Chaque projet du catalogue est une fiche MDX, y compris « En tournage » et « Prochainement » | La spec ne catalogue que des fiches existantes ; le statut est une étiquette, pas une absence de page |
| Le Bac Pro SN ARED apparaît dans une ligne « Formation » de la fiche technique | Il figurait dans le générique supprimé ; il vient du CV et n'est pas une expérience à mettre en acte |
| Les couronnes de laurier sont dessinées en SVG dans un composant serveur | Rendu identique sans JavaScript, aucun fichier image à produire |
