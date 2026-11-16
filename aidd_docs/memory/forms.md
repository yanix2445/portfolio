# Forms

Comment les formulaires sont construits et validés. Le site n'en a qu'un : le formulaire de contact, sur `/contact`.

## Approach

- Composant client : `src/components/contact/contact-form.tsx`, avec les primitives shadcn/ui (`FieldGroup`, `Field`, `Input`, `Textarea`, `Button`, `Spinner`, `Sonner`) et le widget Turnstile (`@marsidev/react-turnstile`).
- Soumission : `useActionState` sur la Server Action `sendContact` (`src/actions/contact.ts`).
- Règles : `src/lib/contact.ts` porte la validation (`validateContact`), les limites et les messages. Le navigateur l'utilise pour répondre tout de suite, le serveur la rejoue toujours.
- Il n'y a pas de bibliothèque de schéma : trois champs, une fonction pure.

## Conventions

- Ordre de traitement côté serveur : écarter un robot pris au champ piège (`contact_hp`, réponse « envoyé » sans rien envoyer), valider les champs, vérifier le jeton Turnstile, puis envoyer la notification à Yanis et l'accusé de réception au visiteur via Resend. Aucune donnée n'est persistée, et l'action ne lève jamais. Côté client, un appel qui échoue (réseau, ou 429 du pare-feu) devient l'erreur générique, sans planter la page.
- Motif facultatif (Alternance, Stage, Autre) sur la ligne du libellé « Message », pour ne pas ajouter de ligne ; il préfixe l'objet de la notification. `/contact?motif=alternance` le présélectionne (le bouton « Proposer une alternance » de l'accueil). Lu après l'hydratation, la page restant prérendue.
- Brouillon (nom, e-mail, message, motif) dans `sessionStorage`, effacé après un envoi réussi. Compteur de caractères sous le message à partir de 80 % de la limite, relié au champ par `aria-describedby`, sans `aria-live`.
- Pare-feu Vercel : règle « Formulaire de contact : 5 envois / 10 min par IP » (`POST /contact`, 429 au-delà).
- `/contact` n'affiche le formulaire que si les quatre variables existent (`contactSiteKey` : clé de site et clé secrète Turnstile, clé Resend, destinataire). Sinon la page garde ses coordonnées directes. La page est prérendue : ce choix est figé au build, il faut redéployer après avoir saisi les clés.
- Le jeton Turnstile est à usage unique et expire après 300 s : le widget est réinitialisé après chaque envoi, réussi ou non. Le widget ajoute lui-même le champ `cf-turnstile-response` au formulaire.
- Erreurs de champ : sous le champ, reliées par `aria-describedby`, `aria-invalid` sur le contrôle et `data-invalid` sur le `Field`. Le focus va au premier champ en erreur.
- Après une erreur, la saisie est conservée : l'action renvoie les champs, repris en `defaultValue`.
- Le retour global passe par un toast `sonner` et reste affiché sous le bouton (`data-contact-result`), en succès comme en erreur. Le message est générique : on n'expose jamais la réponse brute de Resend ou de Turnstile.
- Pendant l'envoi, le bouton est en `aria-disabled` et non `disabled` : il garde le focus clavier. Le double envoi est refusé dans `handleSubmit`.
- Le widget Turnstile est discret (choix de Yanis, 2026-11-16) : `appearance: "interaction-only"`, il reste invisible et n'apparaît (300 × 65 px) que si Cloudflare demande une interaction. Si le visiteur envoie avant l'arrivée du jeton, le formulaire attend le jeton (20 s au plus) puis s'envoie seul ; si le widget n'a pas pu se charger, l'erreur s'affiche tout de suite. Son cadre défile en interne sur un écran de moins de 300 px.
- Sur ordinateur et tablette, `/contact` tient en un écran sans défiler, pied de page compris (titre `text-display-fit` borné par la hauteur, nom et e-mail côte à côte, message à 16svh). Sur téléphone aussi (mesuré de 375 × 667 à 412 × 915) : l'introduction n'est lue que par les lecteurs d'écran, nom et e-mail restent côte à côte, et la liste des coordonnées laisse place à trois accès directs (Appeler, E-mail, CV) ; LinkedIn et GitHub sont dans le pied de page, resserré sur téléphone. Seul un écran de 320 × 568 défile encore, du pied de page.
- Le `Toaster` est rendu par le formulaire, pas par le layout : les autres pages ne chargent pas `sonner`.
- Le formulaire renvoie vers la page mentions légales pour l'information RGPD.
