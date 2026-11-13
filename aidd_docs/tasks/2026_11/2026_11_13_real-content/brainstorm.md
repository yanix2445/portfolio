---
status: approved
---

# Contenu réel : trois projets et une veille

Remplacer les MDX d'exemple par trois fiches projets et un article de veille tirés de l'expérience réelle de Yanis HARRAT, pour qu'un recruteur ou le jury BTS lise des preuves vérifiables plutôt que des gabarits.

## Clear

- **Règle de rédaction** : chaque fait vient de l'interview du 2026-11-13 ou de fichiers montrés par Yanis. Ce qui manque est écrit « à compléter », jamais comblé.
- **Projet 1, lab Windows Server / Active Directory**
  - Cadre : TP du BTS SIO (AURLOM) et reprise en homelab perso.
  - Environnement : Windows Server 2025 ; VMware Workstation pour le TP, Proxmox pour la version perso ; clients Windows 10 et Windows 11 joints au domaine.
  - Scénario : 1 contrôleur de domaine, 1 site, plus 2 serveurs de fichiers membres.
  - Réalisé par Yanis : forêt/domaine AD DS et DNS, OU, groupes selon AGDLP et droits NTFS, GPO, DFS-N et DFS-R entre les 2 serveurs de fichiers, DHCP.
  - Difficulté : la réplication DFS-R ; le détail du problème et de sa résolution est à compléter.
  - Livrables existants (non montrés) : procédure écrite, scripts PowerShell, schéma réseau.
  - Captures : à refaire par Yanis.
- **Projet 2, homelab Proxmox / Docker**
  - Matériel : un ancien PC fixe (modèle, CPU, RAM, stockage à compléter).
  - Proxmox héberge : les VM Windows Server du lab AD, un pare-feu OPNsense, un serveur Docker sous Debian 13.
  - Services Docker cités : n8n, Home Assistant, Cal.com, Traefik, Jellyfin, Nextcloud, Dub (liste non exhaustive).
  - Déploiement : docker compose ; Traefik en reverse proxy ; accès distant par WireGuard.
  - Réseau : VLAN séparés ; exposition mixte (certains services publics via Traefik, d'autres seulement via VPN ; répartition à compléter).
  - Difficulté : VLAN / OPNsense ; détail à compléter.
- **Projet 3, AppKite (app macOS)**
  - App native et gratuite de barre de menus macOS : réunir des outils du quotidien, sans compte, en local, hors ligne.
  - Stack (lue dans le repo) : Swift 6, SwiftUI, AppKit pour l'intégration système, SwiftData, Clean Architecture par fonctionnalité, tests Swift Testing et XCUITest ; Apple Silicon, macOS 26 minimum.
  - Repo public : `github.com/yanix2445/AppKite`, démarré le 2026-11-07.
  - Livré dans `main` : le socle de barre de menus (PR #1, 2026-11-09). En cours : l'historique du presse-papiers (recherche, épingles, collections, exclusions), spécifié et planifié en 4 phases.
  - Feuille de route : fermeture groupée d'apps, switcher de fenêtres, captures et enregistrement d'écran.
  - Méthode : Yanis applique strictement la méthode AIDD (brainstorm, spec, plan, revue) avec Claude Code, qui écrit l'essentiel du code ; Yanis code lui-même les petites modifications.
  - Captures : Yanis en fera une meilleure ; à compléter.
- **Veille : « L'IA comme copilote du technicien informatique »**
  - Problématique (de Yanis) : jusqu'où collaborer avec une IA pour développer, administrer et dépanner une infrastructure, tout en gardant la maîtrise des actions et de la sécurité ?
  - Pratique réelle de Yanis : l'IA écrit des docker compose, aide à diagnostiquer des pannes, génère des scripts PowerShell/Bash, et agit en agent via SSH sur ses serveurs.
  - Garde-fous réels : snapshot avant changement, aucun secret donné à l'IA, branches + PR + hooks (pas de travail sur `main`).
  - Sources vérifiées : ANSSI, *Recommandations de sécurité pour un système d'IA générative* (29 avril 2024 ; R9, R27, R29, R30) ; ANSSI/BSI, *AI Coding Assistants* (4 octobre 2024) ; OWASP, LLM06:2025 Excessive Agency ; documentation sécurité de Claude Code.

## Assumed

- **Date des fiches** : les projets s'étalent « entre mi-2024 et aujourd'hui » sans date précise. Le champ `date` porte la date de publication (2026-11-13), le seul fait connu ; la période par projet est à compléter.
- **Compétences BTS** : rattachées au bloc 2 SISR et au bloc 1 du référentiel par interprétation des tâches décrites ; à confirmer par Yanis.
- **Pas d'image** dans cette première version : aucune capture validée n'est disponible.

## Open

- Période exacte de chaque projet.
- Détail des difficultés DFS-R et VLAN/OPNsense, et de leur résolution.
- Services exposés publiquement vs via VPN.
- Matériel du homelab.
- Captures (lab AD, homelab, AppKite).
