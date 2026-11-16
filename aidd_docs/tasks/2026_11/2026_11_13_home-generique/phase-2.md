---
status: implemented
---

# Instruction: Accueil statique et responsive

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── src/
│   ├── app/
│   │   └── page.tsx ✏️
│   └── components/
│       ├── animations/
│       │   ├── hero-intro.tsx ❌
│       │   ├── marquee.tsx ❌
│       │   ├── motion-card.tsx ❌
│       │   ├── motion-provider.tsx ❌
│       │   ├── scroll-reveal.tsx ❌
│       │   └── timeline-scroll.tsx ❌
│       └── home/
│           ├── acts-section.tsx ✅
│           ├── awards-section.tsx ✅
│           ├── bill-section.tsx ✅
│           ├── certifications-section.tsx ❌
│           ├── finale-section.tsx ✅
│           ├── hero-section.tsx ✏️
│           ├── laurel.tsx ✅
│           ├── poster.tsx ✅
│           ├── projects-section.tsx ❌
│           ├── status-badge.tsx ✅
│           ├── section-heading.tsx ❌
│           ├── sheet-section.tsx ✅
│           ├── skills-section.tsx ❌
│           ├── timeline-section.tsx ❌
│           └── watch-contact-section.tsx ❌
│   └── lib/
│       └── profile.ts
├── tests/
│   └── e2e/
│       └── home.spec.ts ✏️
└── package.json ✏️
```

`profile.ts` et `globals.css` sont modifiés en phase 1 ; cette phase en retire ce que l'ancien accueil était seul à utiliser.

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | Ouvrir `/` à 1440 × 900 sur le build de production | Sections dans l'ordre : hero, actes, « À l'affiche », « Fiche technique », certifications, fin. H1 « Yanis HARRAT » | browser |
| Happy path | Comparer le premier écran à la maquette | Même composition : photo à droite, nom géant sur deux lignes, bandeau de 4 informations | browser |
| Edge case | JavaScript désactivé | Tout le contenu est présent et lisible, la photo s'affiche | browser |
| Edge case | Viewport 375 × 812 | Aucun défilement horizontal, actes en colonne, tête entière sur la photo | browser |
| Edge case | Parcourir l'accueil à la touche Tab | Les boutons du hero, les 3 affiches, le lien du catalogue et les boutons de fin reçoivent un focus visible | browser |
| Edge case | Titres accentués (« ÉCOLE 42 », « À L'AFFICHE », « ÉQUIPE. ») | Aucun accent masqué ni coupé, à 1440 et à 375 | browser |

## Wireframe

```txt
┌──────────────────────────────────────────────┐
│ (1) Header : nom · Projets Veille Contact ·  │
│     Appeler                                  │
├──────────────────────────────────────────────┤
│ (2) Hero : légende · YANIS / HARRAT géant ·  │
│     photo plein cadre à droite · synopsis ·  │
│     bandeau rôle / formation / rythme / dispo│
├──────────────────────────────────────────────┤
│ (3) Actes : 5 panneaux, numéro géant en      │
│     contour · lieu · dates · rôle · texte    │
├──────────────────────────────────────────────┤
│ (4) À l'affiche : 3 affiches de projet ·     │
│     lien « Tous les projets (n) »            │
├──────────────────────────────────────────────┤
│ (5) Fiche technique : tableau de compétences │
├──────────────────────────────────────────────┤
│ (6) Certifications : 7 couronnes de laurier  │
├──────────────────────────────────────────────┤
│ (7) Fin : « Dans votre équipe. » · Appeler · │
│     e-mail · CV                              │
└──────────────────────────────────────────────┘
```

1. Header : posé en phase 1, transparent au-dessus du hero.
2. Hero : identique à la maquette. Sans JavaScript, la photo est à droite et le synopsis est visible sous la légende.
3. Actes : en colonne tant qu'aucune animation ne les met en rangée.
4. À l'affiche : affiches orange, crème et sombre, dans cet ordre.
5. Fiche technique : titre à gauche, lignes « famille → éléments » à droite, en colonne sur mobile.
6. Certifications : couronne, badge s'il existe, organisme et intitulé. 4 puis 3 sur ordinateur, 2 par ligne sur mobile.
7. Fin : titre sur deux lignes, la seconde en contour, trois boutons.

## Tasks to do

### `1)` Hero

> Reproduire le premier écran de la maquette.

1. Réécrire `hero-section.tsx` : légende, H1 en deux lignes (`aria-label` complet), synopsis, bandeau de 4 informations, et le portrait `public/images/yanis-harrat.png` via `next/image` prioritaire, cadré comme la maquette (`object-position: 50% 16%`).
2. Mise en page mobile : photo en haut avec la tête entière, nom dessous, bandeau en 2 × 2.

### `2)` Actes

> Un acte par expérience.

1. `acts-section.tsx` : rend `ACTS` en `<article>`, numéro en contour, légende « Acte N · dates », lieu en titre, rôle, texte, mots-clés. Le dernier acte (en cours) a son numéro plein.
2. Attributs `data-*` pour l'animation de la phase 4. En colonne par défaut.

### `3)` À l'affiche

> Trois projets à la une.

1. `status-badge.tsx` : libellé par statut (« À l'affiche », « En tournage », « Prochainement »).
2. `poster.tsx` : une affiche de projet (numéro, statut, titre en `<h3>`, résumé, pied avec « Voir la fiche »), en 3 variantes de couleur, lien vers `/projets/[slug]`.
3. `bill-section.tsx` : `getFeaturedProjects()`, titre « À l'affiche », lien « Tous les projets (n) » vers `/projets`.

### `4)` Fiche technique et certifications

> Compétences lisibles, certifications en lauriers.

1. `sheet-section.tsx` : tableau issu de `SKILL_GROUPS`.
2. `laurel.tsx` : couronne SVG calculée côté serveur, décorative (`aria-hidden`).
3. `awards-section.tsx` : une couronne par certification, badge si `badge` est renseigné (image avec texte alternatif), lien si `verifyUrl` existe.

### `5)` Fin et assemblage

> Fermer la page et brancher le tout.

1. `finale-section.tsx` : « Prochain rôle », titre, boutons Appeler, e-mail, CV.
2. `page.tsx` : assemble les sections, garde `<PersonJsonLd />`.
3. Supprimer les anciens composants d'accueil et d'animation listés, retirer `motion` de `package.json`.
4. Retirer ce que l'ancien accueil était seul à utiliser : `TIMELINE`, l'ancien `HERO` et `SKILL_GROUPS` dans `profile.ts` (et leurs tests), les tokens `brand*` et les utilitaires `glow-card`, `grain` et `animate-marquee` dans `globals.css`.
5. Réécrire `tests/e2e/home.spec.ts` : ordre des sections, H1, 3 affiches avec statut et lien du catalogue avec le bon nombre, focus clavier visible, rendu sans JavaScript, absence de débordement à 375 px, aucune erreur console.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Le premier écran correspond à la maquette à 1440 ; la tête est entière à 1440 et à 375 |
| 2 | 5 actes dans l'ordre, chacun avec lieu, dates et rôle ; en colonne à 375 |
| 3 | 3 affiches cliquables vers leur fiche, lien « Tous les projets » avec le nombre exact |
| 4 | Toutes les familles de compétences et 7 couronnes s'affichent ; une certification sans badge affiche organisme et intitulé |
| 5 | Les 5 commandes de vérification passent ; aucun import des composants ni des données supprimés ; `motion` absent de `package.json` ; le focus clavier est visible sur chaque élément interactif de l'accueil |
