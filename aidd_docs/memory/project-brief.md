# Project Brief

Ce qu'est le projet, le problème qu'il résout et son vocabulaire. Le « pourquoi », pas le « comment ».

## What it is

- Portfolio personnel de Yanis Harrat, étudiant en 1re année de BTS SIO option SISR à l'AURLOM, publié sur `yanis-harrat.com`.
- Il s'adresse aux recruteurs, aux entreprises qui cherchent un alternant et aux professeurs, soit environ 50 à 200 visiteurs uniques par mois.

## Why it exists

- Présenter le parcours BTS SIO SISR, les projets infra/réseau et les compétences pour décrocher une alternance de technicien systèmes et réseaux à partir de septembre 2027, à Paris.
- Le site sert aussi de démonstration technique : il doit être rapide, bien référencé et conforme au RGPD, pour 0 €/mois.

## Domain language

| Terme | Sens |
| ----- | ---- |
| BTS SIO | Brevet de technicien supérieur « Services informatiques aux organisations » |
| SISR | Option « Solutions d'infrastructure, systèmes et réseaux » (par opposition à SLAM, orientée développement) |
| Réalisation professionnelle | Projet mené en stage ou en formation, présenté à l'épreuve du BTS, avec une page dédiée sur le site |
| Veille technologique | Articles de suivi d'un sujet tech, exigés par le référentiel du BTS |
| Projet | Une entrée MDX dans `src/content/projets/`, rendue sur `/projets/[slug]` |
| Acte | Une étape du parcours sur l'accueil : une expérience, avec lieu, dates et rôle, dans l'ordre chronologique |
| À l'affiche / En tournage / Prochainement | Statut d'un projet : terminé, en cours, à venir |
| À la une | Projet choisi par Yanis pour figurer parmi les 3 affiches de l'accueil |

## Key features

- Accueil « Générique », mis en scène comme un générique de film (GSAP) : hero, parcours en cinq actes, 3 projets à l'affiche, fiche technique des compétences, certifications et appel final.
- Catalogue `/projets` : tous les projets en affiches, avec statut et filtre par domaine.
- Une page dédiée par projet ou réalisation, écrite en MDX.
- Section veille technologique, écrite en MDX.
- CV téléchargeable en PDF.
- Formulaire de contact protégé par Turnstile, envoyé par mail via Resend, sans stockage (à venir).
- Page mentions légales et confidentialité (RGPD).
