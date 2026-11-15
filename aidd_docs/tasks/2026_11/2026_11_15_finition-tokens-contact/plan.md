---
objective: "Le site « Générique » garde son rendu validé, repose sur des tokens et les primitives shadcn/ui dans une architecture lisible, avec un final lisible, des boutons à coins arrondis et un formulaire de contact en service."
status: implemented
---

# Plan: Finition : tokens, primitives shadcn, architecture et formulaire de contact

Source: [spec.md](./spec.md), maquettes du final [mockup/](./mockup/)

## Phases

| #   | Phase | File | Depends on |
| --- | ----- | ---- | ---------- |
| 1   | Référence visuelle et tokens | [`phase-1.md`](./phase-1.md) | none |
| 2   | Primitives shadcn/ui, boutons et final | [`phase-2.md`](./phase-2.md) | 1 |
| 3   | Architecture : Tailwind dans les composants, dossiers rangés | [`phase-3.md`](./phase-3.md) | 2 |
| 4   | Formulaire de contact | [`phase-4.md`](./phase-4.md) | 2 |
| 5   | Vérification finale, DESIGN.md et mémoire | [`phase-5.md`](./phase-5.md) | 3, 4 |

## External sources

| URL | What it settled |
| --- | --------------- |
| https://tailwindcss.com/docs/theme | Tailwind 4 : un token déclaré dans `@theme` (`--text-*`, `--spacing-*`, `--radius-*`, `--color-*`) crée les classes utilitaires correspondantes ; `@utility` pour une classe maison. À relire en phase 1 |
| https://ui.shadcn.com/docs/components | Composants à installer par la CLI (`button`, `badge`, `card`, `toggle-group`, `field`, `input`, `textarea`, `label`, `sonner`) et leur thème par variables CSS. À relire en phase 2, avec le skill `shadcn` |
| https://resend.com/docs/send-with-nextjs | Envoi d'un mail depuis une Server Action avec le SDK `resend`. À relire en phase 4, avec le plugin officiel Resend s'il est installé |
| https://developers.cloudflare.com/turnstile/get-started/server-side-validation/ | Vérification `siteverify` côté serveur, jeton à usage unique valable 300 s, clés de test. À relire en phase 4 |

## Impact

| Category | Verdict and evidence | Handled in |
| -------- | -------------------- | ---------- |
| runtime | Nouvelles dépendances : `resend`, `@marsidev/react-turnstile`, `sonner`, composants shadcn copiés dans le repo. Deux services externes entrent en service : Resend et Turnstile. Quatre variables d'environnement à saisir par Yanis dans Vercel (Preview et Production) et `.env.local` ; sans elles le formulaire ne s'affiche pas. Poids JS de `/contact` non mesuré avant la phase 5 | 4, 5 |
| regression | Risque élevé : 1 047 lignes de CSS sur mesure sont réécrites en classes Tailwind sur un rendu validé au pixel. Garde-fou : captures de référence prises en phase 1, comparées après chaque phase. Les tests e2e ciblent des attributs `data-*` et des rôles, pas des classes : ils doivent rester verts sans réécriture. Le test du final (`finale-title`) change avec la variante | 1, 2, 3, 5 |
| architecture | `src/components/ui/` apparaît (shadcn). Les composants partagés (affiche, badge de statut) quittent `home/`. Les feuilles `home.css`, `poster.css`, `catalog.css` et les `*.styles.ts` disparaissent au profit de classes dans les composants et de quelques `@utility`. `src/actions/` et les clients `resend`/`turnstile` de `src/lib/` sont créés | 2, 3, 4 |
| documentation | `design.md`, `codebase-map.md`, `forms.md`, `integration.md`, `api.md`, `testing.md` et `PRODUCT.md` à mettre à jour ; `DESIGN.md` à créer ; mentions légales à réécrire pour le formulaire en service | 4, 5 |

## Rules

| Rule | Why it applies |
| ---- | -------------- |
| Jamais de travail sur `main` : branche `claude/home-generique`, PR #13 | Règle globale CLAUDE.md |
| Commandes bornées et serveurs via Portly | Règle globale CLAUDE.md |
| Plugin officiel de l'éditeur d'abord (Resend, Cloudflare), puis skill officiel (`shadcn`) | Règle globale CLAUDE.md |
| Sections en Server Components ; animation en enveloppes `"use client"` qui ciblent des attributs `data-*` | `design.md` |
| Rien n'est masqué en CSS ni au rendu serveur ; tête du portrait entière ; accents jamais coupés | `design.md`, spec |
| Server Action qui renvoie un résultat typé, ne lève jamais vers le client et revalide tout | `api.md`, `forms.md` |
| Ordre serveur : valider les champs, vérifier Turnstile, puis envoyer ; widget réinitialisé après chaque envoi ; erreurs génériques | `forms.md`, `integration.md` |
| Secrets côté serveur uniquement ; seul `NEXT_PUBLIC_TURNSTILE_SITE_KEY` est exposé | `integration.md` |
| Pas de `@react-email/components` : mail texte et HTML simple | `integration.md` |
| Tests unitaires sur fixtures, e2e sur le build de production, sans attente fixe | `testing.md` |
| Conventional Commits en anglais, un commit par phase, seulement si les vérifications sortent en 0 | `vcs.md`, acquis de la session |

## Decisions

| Decision | Why |
| -------- | --- |
| Migration complète vers Tailwind et shadcn/ui, pas un simple renommage de variables | C'est la demande de Yanis : conventions Tailwind/shadcn et code maintenable. Coût : toute la mise en forme de l'accueil est réécrite |
| Les tailles fluides de la maquette (`vw`, `svh`, `min()`, `clamp()`) deviennent des tokens nommés dans `@theme`, pas des valeurs arbitraires dans les classes | Le rendu validé dépend de ces valeurs ; les nommer les rend uniques et réutilisables |
| Comparaison de captures avant/après comme critère de sortie de chaque phase | Seule preuve fiable qu'une réécriture de CSS n'a rien déplacé |
| Rayon des boutons, badges et filtres dérivé de `--radius` (0,625 rem) | Demande de Yanis : arrondis, pas en pilule ; une seule source pour tout le site |
| Les filtres du catalogue passent sur `toggle-group` | Primitive shadcn/Radix qui porte l'état pressé et le clavier, au lieu de boutons faits main |
| Le bouton « Écrire un e-mail » du final reste un lien `mailto:` ; le formulaire vit sur `/contact` | Principe « trente secondes pour appeler » : l'accueil garde les moyens directs, le formulaire est une voie de plus |
| Validation des champs par une fonction pure partagée entre client et serveur, sans bibliothèque de schéma | Trois champs ; une dépendance de plus n'apporte rien |
| Formulaire non rendu si la clé de site Turnstile est absente | Une prévisualisation sans clés ne doit pas montrer un formulaire qui échoue |
| L'envoi réel n'est testé automatiquement qu'avec Resend et Turnstile simulés ; le vrai envoi est vérifié à la main sur la prévisualisation | Aucune clé ne doit entrer dans le repo, et un test ne doit pas dépendre d'un service externe |
| `DESIGN.md` est généré depuis le code final | Demande de Yanis de « définir le design » ; une seule description de référence des tokens et composants |
| Exécution : les phases 1 à 3 ont été menées ensemble, section par section | Remplacer les valeurs en dur dans des feuilles vouées à disparaître aurait été du travail jeté. Les tokens ont été déclarés, puis chaque section réécrite directement en classes Tailwind avec ses primitives, et comparée à la référence |
| Pas de dossier `typography/` : deux `@utility` (`type-poster`, `type-label`) et des tokens `text-*` | Un composant polymorphe pour chaque balise aurait été plus lourd que deux classes |
| Les coordonnées de `/contact` sont une liste à filets, pas des cartes | Même forme que la fiche technique de l'accueil ; quatre cartes identiques n'apportaient rien |
| `sonner` est rendu par le formulaire, pas par le layout | Les autres pages ne chargent pas la bibliothèque |
| La référence visuelle a été refaite depuis le commit d'avant la passe, bouton de l'en-tête masqué | La comparaison ne signale ainsi que les écarts hors périmètre voulu |
