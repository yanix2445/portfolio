---
status: pending
---

# Instruction: Formulaire de contact

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── src/
│   ├── actions/
│   │   └── contact.ts ✅
│   ├── app/
│   │   ├── contact/
│   │   │   └── page.tsx ✏️
│   │   ├── layout.tsx ✏️
│   │   └── mentions-legales/
│   │       └── page.tsx ✏️
│   ├── components/
│   │   ├── contact/
│   │   │   └── contact-form.tsx ✅
│   │   └── ui/
│   │       ├── field.tsx ✅
│   │       ├── input.tsx ✅
│   │       ├── label.tsx ✅
│   │       ├── sonner.tsx ✅
│   │       └── textarea.tsx ✅
│   └── lib/
│       ├── contact.ts ✅
│       ├── resend.ts ✅
│       └── turnstile.ts ✅
└── tests/
    ├── e2e/
    │   └── contact.spec.ts ✅
    └── unit/
        └── contact.test.ts ✅
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Happy path | Envoyer nom, e-mail et message valides, Turnstile accepté | Résultat de succès, un mail envoyé avec l'adresse du visiteur en réponse | cli |
| Error | Champ vide, e-mail mal formé ou message trop long | Résultat d'erreur par champ, aucun appel à Turnstile ni à Resend | cli |
| Error | Turnstile refuse le jeton | Erreur générique, aucun mail envoyé | cli |
| Error | Resend répond en erreur ou ne répond pas | Erreur générique invitant à réessayer, sans détail technique | cli |
| Edge case | Clé de site Turnstile absente | `/contact` n'affiche pas de formulaire, les coordonnées restent | browser |
| Edge case | Formulaire au clavier, erreurs affichées | Champs étiquetés, erreurs reliées aux champs et annoncées, focus visible | browser |
| Edge case | Viewport 375 × 812 | Formulaire lisible, pas de défilement horizontal | browser |

## Wireframe

```txt
┌──────────────────────────────────────────────┐
│ (1) Contact · phrase d'intention             │
├───────────────────────┬──────────────────────┤
│ (2) Formulaire        │ (3) Coordonnées      │
│  Nom                  │  E-mail              │
│  E-mail               │  Téléphone           │
│  Message              │  LinkedIn            │
│  (4) Turnstile        │  GitHub              │
│  [Envoyer] (5) RGPD   │  CV (PDF)            │
└───────────────────────┴──────────────────────┘
```

1. Titre et intention, dans le lettrage du site.
2. Formulaire : trois champs étiquetés, erreurs sous chaque champ.
3. Coordonnées directes en cartes ; seules si le formulaire n'est pas affiché. Une colonne sur mobile.
4. Widget Turnstile, réinitialisé après chaque envoi.
5. Bouton d'envoi avec état d'attente, et lien vers les mentions légales.

## Tasks to do

### `1)` Serveur

> Valider, vérifier, envoyer.

1. `lib/contact.ts` : validation pure des trois champs (présence, format de l'e-mail, longueurs), partagée par le client et le serveur, et type du résultat.
2. `lib/turnstile.ts` : appel `siteverify` avec la clé secrète ; `lib/resend.ts` : client et envoi d'un mail texte et HTML simple depuis `send.yanis-harrat.com`, réponse vers le visiteur.
3. `actions/contact.ts` : valide, vérifie Turnstile, envoie ; renvoie toujours un résultat typé, ne lève jamais, ne stocke rien, n'expose aucune réponse brute.

### `2)` Interface

> Le formulaire dans l'univers du site.

1. Ajouter par la CLI shadcn : `field`, `input`, `label`, `textarea`, `sonner` ; le `Toaster` dans le layout racine.
2. `contact-form.tsx` (`"use client"`) : champs shadcn, erreurs par champ, widget `@marsidev/react-turnstile`, bouton avec état d'attente, toast en succès comme en erreur, widget réinitialisé après chaque envoi.
3. `/contact` : formulaire et coordonnées côte à côte ; sans clé de site, coordonnées seules.
4. Mentions légales : formulaire en service, Resend (États-Unis, 30 jours), Turnstile, absence de stockage.

### `3)` Tests

> Verrouiller l'ordre de traitement.

1. `contact.test.ts` : validation, puis l'action avec Turnstile et Resend simulés pour chaque ligne du Test Scope.
2. `contact.spec.ts` : `/contact` sans clé ; avec les clés de test, formulaire étiqueté, erreurs de champs, clavier, 375 px.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Aucun mail n'est envoyé si un champ est invalide ou si Turnstile refuse ; l'action ne lève jamais ; aucun secret n'est importé par un composant client |
| 2 | Le formulaire n'utilise que des primitives de `src/components/ui/` ; sans clé, la page reste complète ; les mentions légales décrivent le traitement réel |
| 3 | `pnpm test` et `pnpm test:e2e` passent, chaque ligne du Test Scope ayant son test |
