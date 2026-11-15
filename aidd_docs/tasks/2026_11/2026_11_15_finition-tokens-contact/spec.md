# Finition : tokens, primitives shadcn, architecture et formulaire de contact

## Target

Le site « Générique » garde le rendu validé par Yanis, mais son code repose sur des tokens de design et les primitives shadcn/ui, dans une architecture lisible ; le final se lit comme une phrase, les boutons ont des coins arrondis, et un visiteur peut écrire à Yanis depuis un formulaire de contact.

## Hard constraints

- **Rendu préservé** : hors final et boutons, l'accueil, le catalogue et les pages secondaires gardent le rendu de la PR #13 sur ordinateur, tablette et téléphone, animations comprises. Tout écart visible est listé et justifié.
- **Tokens** : couleurs, tailles de texte, rayons, gouttière et courbes d'animation viennent de tokens déclarés une seule fois. Aucune couleur, aucun rayon ni aucune taille de texte n'est écrit en dur dans un composant ou une feuille de style, animations comprises. Les cotes propres à une scène (un titre à 16vh du haut, par exemple) restent des valeurs d'écran dans les classes : précisé le 2026-11-15 pendant l'implémentation, car un token à usage unique par cote n'apportait rien.
- **Conventions** : la mise en forme passe par les classes Tailwind et les variables de thème shadcn/ui. Une règle CSS écrite à la main ne subsiste que pour ce que Tailwind n'exprime pas, et elle consomme les tokens.
- **Primitives** : boutons, liens-boutons, badges, filtres, cartes, champs de formulaire et notifications utilisent les composants shadcn/ui du projet, thémés dans l'univers « Générique ». Les affiches de projet restent un composant du site : aucune primitive ne leur correspond.
- **Boutons** : coins arrondis issus du token de rayon, jamais en pilule. Les badges et filtres suivent la même règle.
- **Final** : « Prochain rôle » et « dans votre équipe » se lisent comme une seule phrase, selon la variante C choisie par Yanis sur maquette le 2026-11-15 : « Mon prochain rôle se joue dans votre équipe. », la fin en orange. Aucun accent n'est masqué ni coupé.
- **Architecture** : chaque dossier a une responsabilité unique, les composants partagés entre l'accueil et le catalogue ne vivent pas dans le dossier de l'accueil, aucun fichier d'indirection ne double un nom de classe, et la mémoire du projet décrit la structure réelle.
- **Formulaire de contact** : sur `/contact`, avec nom, e-mail et message. Les champs sont revalidés côté serveur, le jeton Turnstile est vérifié avant tout envoi, le message part par Resend et n'est jamais stocké. Le retour à l'utilisateur est un message générique, en succès comme en erreur.
- **Sans clés** : tant que les clés Turnstile et Resend ne sont pas configurées dans un environnement, le formulaire n'y est pas affiché et la page garde ses coordonnées directes.
- **RGPD** : la page mentions légales décrit le formulaire en service (Resend, Turnstile, absence de stockage), et le formulaire y renvoie.
- **Acquis conservés** : contenu complet sans JavaScript et avec « réduire les animations », tête du portrait entière, navigation au clavier avec focus visible, performance mobile d'au moins 85 et accessibilité de 100 sur l'accueil et sur `/contact`.
- **Budget** : 0 €/mois, offres gratuites uniquement.

## Non-goals

- Changer la direction « Générique », les textes ou l'ordre des sections, hors final.
- Refaire la mise en page des fiches projet, de la veille et des mentions légales.
- Stocker les messages, ajouter un accusé de réception au visiteur ou une limitation de débit maison.
- Créer le compte Resend, vérifier le domaine d'envoi et saisir les clés dans Vercel : ces étapes sont faites par Yanis.
- Basculer le domaine `yanis-harrat.com`, fusionner la PR.

## Done-when

- Les captures de l'accueil, du catalogue et des pages secondaires, prises avant et après aux mêmes tailles et aux mêmes instants de défilement, sont identiques hors final et boutons ; les écarts restants sont listés.
- Une recherche dans `src/` ne trouve plus de couleur en dur, de rayon en dur ni de fichier `*.styles.ts`.
- Chaque bouton, badge, filtre, carte et champ du site est rendu par un composant de `src/components/ui/`.
- Le final affiche la variante C ([maquette ordinateur](./mockup/final-variantes-ordinateur.png), [téléphone](./mockup/final-variantes-telephone.png)), lisible à 1440 px et à 375 px, sans accent coupé.
- Sur `/contact`, avec les clés de test, un message valide affiche une confirmation ; un champ invalide, un jeton refusé ou une panne d'envoi affichent une erreur compréhensible, sans détail technique ; aucun mail ne part si Turnstile échoue.
- Sans clés, `/contact` n'affiche pas de formulaire et reste utilisable.
- Les suites de tests passent, avec des tests automatiques sur la validation du formulaire, l'ordre de traitement côté serveur et l'affichage de `/contact`.
- Les scores mobiles de l'accueil et de `/contact` atteignent 85 en performance et 100 en accessibilité.
- Yanis reçoit un vrai message de test depuis la prévisualisation, une fois ses clés saisies.

## Open Questions

None

## Stakeholders

- Decider: Yanis HARRAT
- Owner: Yanis HARRAT
- Consumer: recruteurs d'alternance, enseignants et jury du BTS

## Context

- Demande de Yanis du 2026-11-15, après validation de la prévisualisation de la PR #13 (« j'aime beaucoup »).
- État constaté le 2026-11-15 : aucun composant shadcn/ui installé (`src/components/ui/` n'existe pas) ; 1 047 lignes de CSS sur mesure dans `home.css`, `poster.css` et `catalog.css`, avec 30 tailles de texte distinctes et des rayons de 99 px ; deux fichiers `*.styles.ts` d'indirection ; le composant d'affiche partagé vit dans `src/components/home/`.
- Le formulaire est décrit par `aidd_docs/memory/forms.md`, `integration.md` et `api.md`, et ses variables par `.env.example`.
