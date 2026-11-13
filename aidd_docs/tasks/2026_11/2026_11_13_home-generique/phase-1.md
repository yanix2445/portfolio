---
status: pending
---

# Instruction: Fondations — contenu réel, polices, couleurs, données

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── src/
│   ├── app/
│   │   ├── contact/
│   │   │   └── page.tsx ✏️
│   │   ├── fonts/
│   │   │   ├── big-shoulders.woff2 ✅
│   │   │   ├── geist-mono.woff2 ✅
│   │   │   └── hanken-grotesk.woff2 ✅
│   │   ├── globals.css ✏️
│   │   └── layout.tsx ✏️
│   ├── components/
│   │   └── layout/
│   │       ├── site-footer.tsx ✏️
│   │       └── site-header.tsx ✏️
│   ├── content/
│   │   └── projets/
│   │       ├── appkite-app-macos.mdx ✅
│   │       ├── homelab-proxmox-docker.mdx ✅
│   │       └── lab-active-directory-windows-server.mdx ✅
│   ├── lib/
│   │   ├── content.ts ✏️
│   │   ├── profile.ts ✏️
│   │   └── site.ts ✏️
│   └── types/
│       └── mdx.d.ts ✏️
└── tests/
    ├── fixtures/
    │   └── src/
    │       └── content/
    │           └── projets/
    │               ├── ancien-projet.mdx ✏️
    │               ├── projet-a-venir.mdx ✅
    │               └── projet-recent.mdx ✏️
    └── unit/
        ├── content.test.ts ✏️
        ├── profile.test.ts ✏️
        └── seo.test.ts ✏️
```

Le merge de la PR #12 apporte aussi l'article de veille réel et supprime les deux fichiers d'exemple.

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | `git merge origin/claude/real-content-e91032` sur `claude/home-generique` | 3 fiches de projet et 1 article de veille réels, plus aucun fichier d'exemple | cli |
| Happy path | `pnpm test` | Les tests du profil (5 actes dans l'ordre, 7 certifications, familles de compétences) et du contenu (à la une, statut, domaine) passent | cli |
| Happy path | `pnpm typecheck`, `pnpm build` puis `pnpm test:e2e` | Tout passe : l'ancien accueil tourne encore, dans les nouvelles couleurs et polices | cli |
| Edge case | Ouvrir `/contact` | Le lien du CV fonctionne toujours après le déplacement de `CV_PATH` | browser |
| Edge case | Projet sans `featured`, `status` ni `domain` | Il est traité comme non à la une, « À l'affiche », domaine « Autre » | cli |
| Edge case | Moins de 3 projets marqués à la une | La sélection est complétée par les projets les plus récents | cli |

## Tasks to do

### `1)` Intégrer le vrai contenu

> Partir de vrais projets.

1. Fusionner `origin/claude/real-content-e91032` dans la branche, résoudre les conflits éventuels.
2. Vérifier que `pnpm build` passe avec les 3 fiches et l'article de veille.

### `2)` Polices et couleurs de l'univers

> Poser l'identité « Générique » pour tout le site.

1. Copier les 3 polices de `mockup/fonts/` vers `src/app/fonts/` et les charger avec `next/font/local` dans `layout.tsx` (variables `--font-display`, `--font-sans`, `--font-mono`).
2. Dans `globals.css` :
   - remplacer la palette ambre par celle de la maquette : fond `#0b0a09`, texte `#f2ebdd`, texte secondaire `#9a9082`, accent `#ff5b2e`, filets `rgba(242,235,221,.18)` ;
   - relier les tokens shadcn (`background`, `foreground`, `muted-foreground`, `border`, `primary`, `ring`) à cette palette ;
   - ajouter les utilitaires `disp` (lettrage d'affiche) et `label` (légende mono) ;
   - faire pointer les tokens `brand*` existants sur le nouvel accent, pour que l'ancien accueil compile jusqu'à la phase 2 ;
   - garder un focus clavier visible à l'accent sur tout le site.
3. Vérifier que `Prose` (pages MDX) reste lisible.

### `3)` Header et footer

> Les reconstruire dans le vocabulaire de la maquette.

1. Déplacer `CV_PATH` de `site-header.tsx` vers `site.ts` et mettre à jour ses imports (`/contact`, ancien accueil).
2. `site-header.tsx` : nom à gauche, liens Projets, Veille, Contact, bouton « Appeler » (lien `tel:`), en légendes mono. Fixe et transparent sur l'accueil.
3. `site-footer.tsx` : même vocabulaire, liens existants conservés (e-mail, mentions légales, GitHub, LinkedIn).

### `4)` Données du profil

> Structurer ce que l'accueil affiche.

1. Dans `profile.ts`, **ajouter** sans retirer l'existant :
   - `ACTS` : les 5 actes du brief (lieu, dates, rôle, texte, mots-clés, ville ou durée), dans l'ordre chronologique ;
   - `SHEET` : les familles de la maquette, plus « Code » (Python, JavaScript, SQL, n8n, Git : CV, IUT Meaux), « Méthodes » (rédaction de procédures, formation des utilisateurs, méthode agile : CV) et « Formation » ;
   - `CERTIFICATIONS` : ajouter aux 7 entrées les champs optionnels `badge` (chemin d'image) et `verifyUrl` ;
   - `OPENING` : légende, rôle, formation « BTS SIO SISR · 1re année », rythme, « Septembre 2027 · Paris » (confirmé par Yanis), synopsis.
2. Compléter `tests/unit/profile.test.ts` : 5 actes dans l'ordre chronologique, familles de la fiche technique non vides.

### `5)` Modèle de contenu des projets

> Permettre « à la une », statut et domaine.

1. Dans `content.ts` : champs optionnels `featured`, `status` (`released`, `in-progress`, `upcoming`), `domain` ; valeurs par défaut ; `getFeaturedProjects()` qui renvoie 3 projets (à la une d'abord, complétés par les plus récents).
2. Mettre à jour `mdx.d.ts`.
3. Renseigner `featured`, `status` et `domain` dans les 3 fiches réelles et dans les fixtures.
4. Ajouter la fixture `projet-a-venir.mdx` (statut `upcoming`, non à la une) pour tester la sélection de 3 projets.
5. Compléter `tests/unit/content.test.ts` et ajuster les comptes de `content.test.ts` et `seo.test.ts` (une URL de plus dans le sitemap).

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | `/projets` liste 3 projets réels, plus aucune fiche d'exemple |
| 2 | Toutes les pages s'affichent sur fond noir chaud, texte crème, avec les polices de la maquette, sans requête vers Google Fonts |
| 3 | Le header affiche les 3 liens et « Appeler » ; `site.spec.ts` (navigation, footer, CV) passe ; `/contact` lie toujours le CV |
| 4 | `pnpm test` valide 5 actes dans l'ordre chronologique et 7 certifications ; `pnpm typecheck` et `pnpm build` passent sans toucher à l'ancien accueil |
| 5 | `getFeaturedProjects()` renvoie 3 projets, les marqués d'abord ; un projet sans champs optionnels reçoit les valeurs par défaut |
