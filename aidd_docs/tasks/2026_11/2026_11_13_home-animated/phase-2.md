---
status: pending
---

# Instruction: Sections statiques de l'accueil

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
└── src/
    ├── app/
    │   └── page.tsx ✏️
    └── components/
        ├── layout/
        │   └── site-header.tsx ✏️
        └── home/
            ├── hero-section.tsx ✅
            ├── skills-section.tsx ✅
            ├── certifications-section.tsx ✅
            ├── timeline-section.tsx ✅
            ├── projects-section.tsx ✅
            └── watch-contact-section.tsx ✅
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | `curl /` sur le build | Le HTML contient le H1, l'accroche et les six sections (`aria-labelledby`), avant tout script | api |
| Edge case | JavaScript désactivé | Toutes les sections sont lisibles, la photo s'affiche | browser |
| Edge case | Viewport 375 px | Aucun débordement horizontal | browser |

## Wireframe

```txt
┌─────────────────────────────────────────────┐
│ (1) Hero : accroche · H1 géant · photo      │
│     dégradé ambre · boutons Projets / CV    │
├─────────────────────────────────────────────┤
│ (2) Compétences : 6 cartes de groupe        │
├─────────────────────────────────────────────┤
│ (3) Certifications : bande de badges        │
├─────────────────────────────────────────────┤
│ (4) Parcours : timeline 2022 → 2026         │
├─────────────────────────────────────────────┤
│ (5) Projets récents : 3 cartes              │
├─────────────────────────────────────────────┤
│ (6) Veille (dernier article) · CTA contact  │
└─────────────────────────────────────────────┘
```

1. Hero : rythme d'alternance en surtitre, nom en très gros, accroche, photo `next/image` prioritaire, deux boutons.
2. Compétences : une carte par groupe, titre et liste de technologies en pastilles.
3. Certifications : rangée de badges (émetteur + intitulé), défilante plus tard.
4. Parcours : étapes datées, l'expérience soft skills visuellement distincte.
5. Projets : cartes propres à l'accueil (sans toucher `EntryList`, partagé avec `/projets` et `/veille`), 3 derniers projets.
6. Veille et contact : dernier article de veille et grand appel à l'action vers `/contact`.

## Tasks to do

### `1)` Composants de section

> Une section serveur par bloc, alimentée par `profile.ts` et `getEntries`.

1. Créer les six composants dans `src/components/home/`, chacun un `<section>` avec un `<h2>` relié par `aria-labelledby` (le hero porte le `<h1>`).
2. Photo : `next/image` sur `/images/yanis-harrat.png`, `priority`, `sizes` adaptés, alt descriptif.
3. Mise en page responsive, aucune largeur fixe qui dépasse 375 px.
4. Chaque lien et bouton de l'accueil a un style `focus-visible` net (anneau ambre) ; le lien CV du header aussi.

### `2)` Assemblage de la page

> Remplacer l'accueil actuel.

1. `page.tsx` assemble les six sections dans l'ordre et garde `<PersonJsonLd />`.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Chaque lien a un focus visible ; chaque section rend son contenu depuis `profile.ts` ou le contenu MDX, sans texte du CV codé en dur dans les composants |
| 2 | `/` contient les six sections dans l'ordre, le H1 « Yanis HARRAT » et le JSON-LD |
