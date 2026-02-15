# Politique de Sécurité

La sécurité de ce projet est une priorité. Si vous découvrez une vulnérabilité, merci de suivre les instructions ci-dessous pour nous la signaler de manière responsable.

## Signaler une Vulnérabilité (CRITICAL)

Merci de ne pas signaler de vulnérabilités via des issues GitHub publiques. À la place, veuillez envoyer un e-mail à : **contact@yanis-harrat.com**

Nous nous efforcerons de répondre dans les 48 heures et de proposer un correctif dès que possible.

## Versions Supportées

Seule la dernière version de la branche `main` est activement supportée pour les mises à jour de sécurité.

| Version | Supportée |
| ------- | --------- |
| > 1.0.0 | ✅ Oui     |
| < 1.0.0 | ❌ Non     |

## Nos Engagements de Sécurité (HIGH)

- **Audit des Dépendances** : Nous surveillons régulièrement les vulnérabilités des dépendances (via `bun audit` et Dependabot).
- **Secrets** : Aucun secret, clé API ou identifiant ne doit être committé dans le dépôt. Le fichier `.gitignore` est configuré à cet effet.
- **Workflow** : Toutes les modifications passent par une revue et des branches de feature pour garantir l'intégrité du code.

## Conseils pour les Contributeurs

- Assurez-vous que vos dépendances sont à jour avant de soumettre une Pull Request.
- Évitez d'introduire du code permettant des injections (XSS, SQL, etc.).
- Suivez les directives du fichier [CONTRIBUTING.md](./CONTRIBUTING.md).

---
Merci de nous aider à maintenir la sécurité de ce portfolio ! 🛡️
