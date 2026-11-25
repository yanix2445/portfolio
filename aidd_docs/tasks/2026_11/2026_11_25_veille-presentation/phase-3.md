---
status: done
---

# Instruction: Fiches publiées numérotées avec ce que j'en retiens

## Architecture projection

```txt
.
└── src/
    ├── app/
    │   └── veille/
    │       └── page.tsx ✏️
    ├── components/
    │   └── content/
    │       └── entry-list.tsx ✏️
    ├── content/
    │   └── veille/
    │       └── ia-copilote-technicien-informatique.mdx ✏️
    └── lib/
        └── content.ts ✏️
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | Build de production | `/veille` répond 200 | system |
| Happy path | Ouvrir `/veille` | Une section « Fiches publiées » avec son compteur ; chaque fiche porte « Fiche N », sa date, son temps de lecture et, si elle en a une, sa ligne « Ce que j'en retiens » | browser |
| Edge case | Une fiche sans `takeaway` | La fiche s'affiche sans la ligne, sans erreur | system |
| Edge case | Plusieurs fiches | La plus récente est en grand et porte le plus grand numéro ; la plus ancienne est la fiche 1 | browser |

## Tasks to do

### `1)` Ajouter le champ facultatif `takeaway`

> Une fiche peut dire en une phrase ce que Yanis en retient.

1. Dans `src/lib/content.ts`, ajouter `takeaway?: string` à `ContentMeta`, avec sa documentation.
2. Dans `src/content/veille/ia-copilote-technicien-informatique.mdx`, ajouter `takeaway`, cité de sa section « Ce que j'en retiens » : « L'IA est un copilote efficace pour écrire, diagnostiquer et documenter. » Le corps de l'article ne change pas.

### `2)` Numéroter les fiches et afficher ce que j'en retiens

> La liste devient la section « Fiches publiées », distincte de la présentation.

1. Dans `src/app/veille/page.tsx`, envelopper la liste dans une section titrée « Fiches publiées » avec le compteur (« 1 fiche publiée »).
2. Dans `src/components/content/entry-list.tsx`, afficher « Fiche N » dans la colonne de gauche (N dans l'ordre de publication), passer les titres de fiche en `h3` sous ce nouveau `h2`, et afficher « Ce que j'en retiens » quand `takeaway` existe.
3. Garder la mise en forme en place : la dernière fiche en grand, les suivantes serrées, lien nommé par le seul titre.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Le typage accepte une fiche avec ou sans `takeaway` ; le texte de l'article est inchangé. |
| 2 | Sur `/veille`, la section « Fiches publiées » affiche « Fiche 1 », la date, le temps de lecture et la phrase citée ; chaque lien de fiche s'ouvre toujours (test de la phase 1). |
