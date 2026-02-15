# Guide de Contribution

Bienvenue ! Ce projet suit des standards de développement stricts pour garantir un historique Git propre, une sécurité maximale et une qualité de code constante. Merci de suivre ces directives pour toute contribution.

## 1. Workflow Git (HIGH)

### Branches
- Ne travaillez **jamais** directement sur la branche `main`.
- Créez toujours une branche dédiée pour vos changements :
  - `feat/nom-de-la-fonctionnalite`
  - `fix/nom-du-bug`
  - `docs/nom-du-document`

### Commits Atomiques
- Un commit doit représenter **UN SEUL** changement logique.
- Ne mélangez pas des corrections de bugs avec du formatage de style ou de nouvelles fonctionnalités.

## 2. Conventions de Commit (CRITICAL)

Nous utilisons les **Conventional Commits** en **FRANÇAIS uniquement**.

### Structure Obligatoire
```text
type(scope): description courte (max 50 caractères)

[Corps OBLIGATOIRE] Expliquez le "Pourquoi" et le "Comment" (max 72 car./ligne).

[Footer OBLIGATOIRE] Référence aux tickets (ex: Fixes #123).
```

### Types autorisés
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage (espaces, points-virgules, etc.)
- `refactor`: Restructuration du code (ni fix, ni feature)
- `chore`: Tâches de maintenance, dépendances, configuration

## 3. Sécurité (CRITICAL)

- **Vérification** : Utilisez toujours `git status` avant de faire un `git add`. N'ajoutez pas tout aveuglément (`git add .`).
- **Secrets** : Ne committez jamais de fichiers `.env`, clés API ou mots de passe. Vérifiez le `.gitignore`.
- **Force Push** : Le "Force Push" (`git push -f`) est **strictement interdit** sur les branches protégées (`main`).

## 4. Environnement de Développement

- **Package Manager** : Ce projet utilise `bun`.
- **Commandes utiles** :
  - `bun install` : Installer les dépendances.
  - `bun dev` : Lancer le serveur de développement.
  - `bun build` : Compiler pour la production.

---
Merci de contribuer à rendre ce portfolio encore meilleur ! 🚀
