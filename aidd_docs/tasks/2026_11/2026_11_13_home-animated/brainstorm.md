---
status: approved
---

# Accueil complet et animé du portfolio

Une page d'accueil audacieuse et très animée, pour qu'un recruteur ou un prof voie en un passage qui est Yanis HARRAT, ce qu'il sait faire et comment le contacter pour une alternance de technicien systèmes et réseaux.

## Clear

- **Structure, de haut en bas :**
  1. **Hero** : photo, nom, accroche « Recherche d'alternance · Technicien systèmes & réseaux · BTS SIO SISR · 3 j entreprise / 2 j école », boutons Projets et CV.
  2. **Compétences**.
  3. **Certifications**, sous forme d'une bande de badges.
  4. **Parcours**, en timeline.
  5. **Projets phares** : les 3 derniers projets MDX.
  6. **Veille et contact** : le dernier article de veille, puis un appel à l'action vers `/contact`.
- **Contenu** : tiré du CV (`public/cv/yanis-harrat-cv.pdf`) et centralisé dans un seul fichier de données, facile à modifier.
- **Compétences**, groupées comme dans le CV :
  - Systèmes (Linux Debian/Ubuntu Server, Windows, Windows Server 2019/2022/2025, macOS) ;
  - Administration Microsoft (AD DS, GPO, Entra ID, Intune, Microsoft 365, Autopilot, AGDLP) ;
  - Réseaux (LAN, TCP/IP, OSI, VLAN, routage, NAT, HSRP, VPN, DHCP, DNS, DFS-N/DFS-R) ;
  - Sécurité réseau (OPNsense, pfSense) ;
  - Virtualisation et conteneurs (Proxmox, VMware, Docker) ;
  - Maintenance et diagnostic (support N1/N2, équipements FTTH, tests TCP/IP LAN/WAN, réflectométrie, Packet Tracer).
- **Certifications** : Cisco Introduction to Cybersecurity, Google IT Support, Google Cybersécurité, EBIOS Risk Manager (MOOC), Anthropic (AI Fluency, Claude Code in Action, Claude 101).
- **Parcours** :
  - Bac Pro SN ARED, Lycée Newton, Clichy (2022) ;
  - Piscine École 42, Paris (2023) ;
  - Chef de rang chez Coco Rocco (sept. 2023 – janv. 2025), présenté comme expérience de soft skills : relation client, gestion de la pression, encadrement ;
  - Consultant IT junior et développeur à l'IUT Meaux (janv. – mars 2025) ;
  - BTS SIO SISR à l'AURLOM, Paris (2026) ;
  - Technicien Helpdesk N1/N2 au Secours Catholique Caritas France (juin – sept. 2026).
- **Photo** : fournie dans `public/yanis_3.png` (1122×1402, fond sombre, bokeh ambré).
- **Ambiance** : moderne et audacieuse, avec de gros titres, des dégradés et des effets de scroll marqués (sections épinglées, parallaxe, texte qui se décompose).
- **Animation** : riche. GSAP gère le hero et le scroll, Motion les micro-interactions. Un même élément n'est jamais animé par les deux.
- **Arbitrage** : l'effet passe avant la performance. On garde les effets même si le score Lighthouse mobile descend jusqu'à environ 75.
- **Garde-fous non négociables** :
  - le H1 reste visible dès le rendu serveur ;
  - avec `prefers-reduced-motion`, la page est statique mais complète ;
  - la navigation au clavier fonctionne ;
  - `pnpm test` et `pnpm test:e2e` restent verts.

## Assumed

- **Thème** : sombre par défaut sur l'accueil, avec un accent ambre ou orangé qui reprend la lumière de la photo.
- **Expériences** : l'accueil n'en montre qu'un résumé d'une ligne par étape. Le détail reste dans le CV.
- **Pages concernées** : seule l'accueil change. Les autres pages gardent leur style actuel.

## Open

- **CV public** : le PDF en ligne affiche l'e-mail et le téléphone perso. Il faut le régénérer avec `yanis@yanis-harrat.com` et `07 68 18 79 34` avant le lancement. C'est hors périmètre de cette feature.
