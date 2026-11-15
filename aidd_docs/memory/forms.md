# Forms

Comment les formulaires sont construits et validés. Le site n'en a qu'un : le formulaire de contact, sur `/contact`.

## Approach

- Composant client : `src/components/contact/contact-form.tsx`, avec les primitives shadcn/ui (`FieldGroup`, `Field`, `Input`, `Textarea`, `Button`, `Spinner`, `Sonner`) et le widget Turnstile (`@marsidev/react-turnstile`).
- Soumission : `useActionState` sur la Server Action `sendContact` (`src/actions/contact.ts`).
- Règles : `src/lib/contact.ts` porte la validation (`validateContact`), les limites et les messages. Le navigateur l'utilise pour répondre tout de suite, le serveur la rejoue toujours.
- Il n'y a pas de bibliothèque de schéma : trois champs, une fonction pure.

## Conventions

- Ordre de traitement côté serveur : valider les champs, vérifier le jeton Turnstile, puis envoyer le mail via Resend. Aucune donnée n'est persistée, et l'action ne lève jamais.
- Sans `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `/contact` n'affiche pas le formulaire : la page garde ses coordonnées directes.
- Le jeton Turnstile est à usage unique et expire après 300 s : le widget est réinitialisé après chaque envoi, réussi ou non. Le widget ajoute lui-même le champ `cf-turnstile-response` au formulaire.
- Erreurs de champ : sous le champ, reliées par `aria-describedby`, `aria-invalid` sur le contrôle et `data-invalid` sur le `Field`. Le focus va au premier champ en erreur.
- Après une erreur, la saisie est conservée : l'action renvoie les champs, repris en `defaultValue`.
- Le retour global passe par un toast `sonner`, en succès comme en erreur. Le message est générique : on n'expose jamais la réponse brute de Resend ou de Turnstile.
- Le `Toaster` est rendu par le formulaire, pas par le layout : les autres pages ne chargent pas `sonner`.
- Le formulaire renvoie vers la page mentions légales pour l'information RGPD.
