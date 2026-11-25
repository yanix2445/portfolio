# SEO, AEO et marketing de yanis-harrat.com

Audit du 2026-11-25. Sources : le code du dépôt, le site en ligne (`curl` de chaque page, en navigateur et sous les user-agents des robots IA), le profil GitHub public, des recherches web sur le nom et le domaine. Skills utilisés : `seo-audit`, `ai-seo`.

Rien n'a été modifié sur le site. Les changements de code sont des propositions, à valider.

**Limites de l'audit**
- PageSpeed Insights a refusé la mesure (quota partagé dépassé). Les chiffres de performance viennent de ta dernière mesure Lighthouse (2026-11-24, `testing.md`).
- Je n'ai accès ni à Google Search Console, ni à Bing Webmaster Tools, ni à LinkedIn (connexion requise), ni à un outil de volume de mots-clés. Les priorités de mots-clés sont donc qualitatives.
- Ma recherche web ne passe pas par Google. « Absent de l'index » veut dire « absent de cet index », à confirmer dans Search Console.
- Dans ce rapport, `<e-mail du site>` désigne l'adresse de `CONTACT.email` (`src/lib/site.ts`).

---

## 1. Diagnostic

### En une phrase

La base technique est saine (rendu serveur, canonicals, HTTPS, sitemap, robots ouverts aux IA). Le site manque surtout de **visibilité** (pas encore indexé, aucune image de partage) et de **signaux d'identité** (données structurées minimales, profils GitHub et LinkedIn peu reliés, contenus « à compléter » publics).

### Ce qui va bien (à ne pas toucher)

| Point | Constat |
| ----- | ------- |
| Rendu | Tout le contenu est dans le HTML servi, même sans JavaScript. Les robots IA lisent tout. |
| Robots IA | GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot : tous en 200 sur une fiche projet. |
| `robots.txt` | `Allow: /` pour tous, avec le lien vers le sitemap. |
| Sitemap | Les 10 URL indexables, `lastmod` sur les fiches. Pas d'URL parasite. |
| Canonicals | Présents et auto-référents sur les 10 pages. |
| Domaine | `www` → apex en 308, `http` → `https` en 308, HSTS 2 ans. |
| Titres | Un seul `h1` par page, `h2` logiques sur les fiches (Contexte, Objectif, Réalisation…). |
| Langue | `lang="fr"`, `og:locale` `fr_FR`. |
| URLs | Courtes, en minuscules, avec les bons mots (`lab-active-directory-windows-server`). |
| Performance | Lighthouse mobile 92 sur l'accueil, 100 sur `/contact`, accessibilité 100 (2026-11-24). LCP ~3,3 s, dû à l'intro animée (déjà documenté). |
| Mobile | Testé de 320 à 2560 px par les e2e, sans débordement. |
| Confiance | Mentions légales complètes, contact visible, e-mail sur le domaine. |

### Problèmes, par priorité

| # | Problème | Impact | Preuve | Qui corrige |
| - | -------- | ------ | ------ | ----------- |
| 1 | **Site absent de l'index de recherche** | Critique | `"Yanis Harrat"` et `site:yanis-harrat.com` ne renvoient aucune page du site. Normal 8 jours après le lancement (2026-11-17), mais rien ne garantit l'indexation sans soumission. | Toi (Search Console, Bing) |
| 2 | **Aucune image de partage (`og:image`)** | Haut | Aucune page n'a d'`og:image` ; `twitter:card` = `summary`. Un lien partagé sur LinkedIn s'affiche sans visuel, alors que LinkedIn est ton canal principal. | Automatisable |
| 3 | **Contenus « *à compléter* » visibles en production** | Haut | 7 occurrences dans le homelab, 5 dans le lab AD (matériel, période, schémas, VLAN, GPO). Ce sont 2 des 3 projets à la une : un recruteur les voit, une IA peut les citer. | Toi (contenu) |
| 4 | **Données structurées minimales** | Haut (AEO) | Seul l'accueil a un `Person`, sans photo, ville, formation, compétences ni certifications. Aucun `WebSite`, `ProfilePage`, `BlogPosting` (veille) ni fil d'Ariane. | Automatisable |
| 5 | **Faits contradictoires** | Haut (AEO) | Le lab AD dit « né d'un TP du BTS SIO SISR à AURLOM », alors que tu n'y entres qu'en septembre 2027 (1re année à Fénelon Sup). Le `jobTitle` du balisage dit « en alternance » alors que tu la cherches. Une IA reprendra l'une ou l'autre version. | Automatisable (école du TP à confirmer) |
| 6 | **Identité incohérente entre profils** | Moyen | GitHub : bio vide, pas de README de profil, entreprise « Black Rise », dépôt AppKite sans description ni topics. Nom écrit « Yanis HARRAT » et « Yanis Harrat » selon les pages. Un site `yanis-harrat.netlify.app` (aujourd'hui 404, pas à toi) est encore dans l'index et décrit « un étudiant en développement web à l'ETNA » : un homonyme que les moteurs et les IA peuvent confondre avec toi. | Toi |
| 7 | **Titres de pages sans mot-clé** | Moyen | « Projets · Yanis Harrat », « Veille · Yanis Harrat », « Contact · Yanis Harrat ». | Automatisable |
| 8 | **Meta descriptions trop longues** | Moyen | AppKite 254 caractères, article de veille 220, `/veille` 211, `/projets` 171 (cible : 150-160). | Automatisable |
| 9 | **Titre d'article trop long** | Moyen | « L'IA copilote de dépannage : … · Yanis Harrat » : 91 caractères, coupé dans Google. | Automatisable |
| 10 | **Pas de réponses directes aux questions d'un recruteur** | Moyen (AEO) | Les faits sont là (phrase d'accroche, actes, fiche technique) mais dispersés dans une mise en scène. Aucun bloc « question → réponse » qu'une IA peut extraire tel quel. | Automatisable, après ton accord sur le design |
| 11 | **Certifications non vérifiables** | Moyen | Le champ `verifyUrl` existe dans `profile.ts` mais aucune certification n'a de lien de vérification. | Toi (liens Credly, Coursera…) |
| 12 | **Pas de `llms.txt`** | Bas | 404. Aucun gain prouvé pour Google ; utile pour ChatGPT, Claude, Perplexity, coût quasi nul. | Automatisable |
| 13 | **Métadonnées du CV PDF** | Bas | Titre « CV Yanis HARRAT  » (espace final), auteur « Canva ». Google indexe les PDF et affiche ce titre. | Automatisable (exiftool) ou toi (Canva) |
| 14 | **Pas de favicon moderne** | Bas | Seul `favicon.ico` existe (pas d'`icon.png`, `apple-icon.png`). Google affiche le favicon dans ses résultats mobiles. | Automatisable |

### Hors-page (autorité)

- Liens entrants connus : ton profil GitHub (champ site web) et les dépôts `portfolio` et `portfolio-page-attente`. LinkedIn : à vérifier (champ « site web » du profil).
- Aucune mention sur un site tiers (école, jobboard, blog, forum).
- Pour une IA, l'entité « Yanis Harrat » n'existe pas encore : aucune source tierce ne la décrit. C'est le levier principal de l'AEO pour un profil personnel.

---

## 2. Mots-clés : ce que le site peut réellement gagner

**Je ne te recommande pas de viser « portfolio développeur » ni « projets web ».** Ton site, ton CV et ta recherche portent sur un poste de technicien systèmes et réseaux (SISR). Viser « développeur » attirerait des offres hors cible et brouillerait ce que Google et les IA comprennent de toi. AppKite et Claude Code restent un atout secondaire (« un technicien qui sait automatiser »), pas une cible.

**Constat honnête sur les requêtes de recrutement.** Sur « alternance technicien systèmes et réseaux Paris », les premières places sont tenues par les jobboards et les écoles. Un portfolio personnel n'y passera pas devant. Les recruteurs te trouveront par LinkedIn, les jobboards et ta candidature, puis **taperont ton nom**. Le rôle du SEO est donc :

1. **Posséder la page de résultats de ton nom** (site, LinkedIn, GitHub en tête, informations cohérentes).
2. **Être crédible quand on lit tes fiches** (contenu complet, daté, technique).
3. **Gagner de la longue traîne technique** avec les projets et la veille : peu de volume, mais peu de concurrence, et ce sont les pages qu'une IA cite.

| Intention | Mots-clés | Page cible |
| --------- | --------- | ---------- |
| Nom (priorité 1) | Yanis Harrat, Yanis Harrat portfolio, Yanis Harrat BTS SIO, Yanis Harrat alternance | Accueil |
| Recrutement (signal, pas classement) | alternance technicien systèmes et réseaux Paris, alternant BTS SIO SISR, alternance administrateur systèmes et réseaux septembre 2027 | Accueil, `/contact` |
| Technique, AD | lab Active Directory Windows Server 2025, réplication DFS-R deux serveurs, modèle AGDLP exemple, GPO lab | Lab AD |
| Technique, homelab | homelab Proxmox OPNsense VLAN, Docker Traefik WireGuard homelab, Proxmox Debian 13 Docker | Homelab |
| Veille | veille technologique BTS SIO SISR IA, IA agentique ANSSI, agent IA dépannage réseau, injection de prompt journaux | `/veille`, articles |
| Secondaire | app macOS barre de menus, historique presse-papiers macOS, Claude Code projet | AppKite |

Après 4 semaines d'indexation, Search Console te donnera les vraies requêtes : c'est là qu'on ajustera.

---

## 3. Modifications proposées

### 3.1 Ce qui peut être automatisé (je peux le faire après ton accord)

Une PR `claude/seo-aeo`, vérifiée par `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` et `pnpm test:e2e`.

#### a. Image de partage pour tout le site

Nouveau fichier `src/app/opengraph-image.tsx`, généré au build avec `next/og` : fond `#0b0a09`, « YANIS HARRAT » en grandes lettres crème, la phrase d'accroche, une ligne orange « Alternance · Paris · sept. 2027 ». Le fichier à la racine s'applique à toutes les pages (les métadonnées par fichier priment sur l'objet `metadata`, doc Next 16.4). Une fiche avec `cover` gardera son image.

À savoir : `next/og` ne lit pas le `woff2` (seulement `ttf`, `otf`, `woff`). Il faut ajouter Big Shoulders en `.ttf` (licence OFL) dans `src/app/fonts/`, pour l'image seulement.

Dans `src/app/layout.tsx` :

```diff
   description: DESCRIPTION,
   openGraph: { ...BASE_OPEN_GRAPH, type: "website" },
+  twitter: { card: "summary_large_image" },
 };
```

#### b. Données structurées de l'accueil

Remplacer le `Person` actuel (`src/components/seo/person-json-ld.tsx`) par un graphe relié, construit depuis `site.ts` et `profile.ts` (aucun texte en double) :

```ts
const PERSON_ID = `${SITE_URL}/#person`;

const GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "fr-FR",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Yanis Harrat",
      alternateName: "Yanis HARRAT",
      givenName: "Yanis",
      familyName: "Harrat",
      jobTitle: "Futur alternant technicien systèmes et réseaux (BTS SIO SISR)",
      description:
        "Après une 1re année de BTS SIO à Fénelon Sup, Yanis Harrat entre en BTS SIO option SISR à l'AURLOM en septembre 2027 et cherche une alternance de deux ans comme technicien systèmes et réseaux à Paris et en Île-de-France (3 jours en entreprise, 2 jours à l'école).",
      url: SITE_URL,
      image: `${SITE_URL}/images/yanis-harrat.jpg`,
      email: `mailto:${CONTACT.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
      alumniOf: [
        { "@type": "EducationalOrganization", name: "Fénelon Sup" },
        { "@type": "EducationalOrganization", name: "École 42" },
        { "@type": "EducationalOrganization", name: "Lycée Newton" },
      ],
      knowsAbout: [
        "Active Directory", "Windows Server", "Microsoft 365", "Entra ID", "Intune",
        "Proxmox", "OPNsense", "Docker", "VLAN", "TCP/IP", "DNS", "DHCP", "Python", "n8n",
      ],
      hasCredential: CERTIFICATIONS.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.title,
        credentialCategory: "certificate",
        recognizedBy: { "@type": "Organization", name: c.issuer },
        ...(c.verifyUrl ? { url: c.verifyUrl } : {}),
      })),
      sameAs: [CONTACT.linkedin, CONTACT.github],
    },
  ],
};
```

L'AURLOM n'est pas dans le balisage : tu n'y entres qu'en septembre 2027, et schema.org n'a pas de propriété pour une école à venir. La description le dit en clair.

#### c. Données structurées des fiches

Dans `entry-page.tsx`, un `BlogPosting` (veille) ou `TechArticle` (projets) et un fil d'Ariane, avec l'auteur relié au `Person` de l'accueil par son `@id` :

```ts
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": collection === "veille" ? "BlogPosting" : "TechArticle",
      headline: title,
      description: summary,
      datePublished: date,
      inLanguage: "fr-FR",
      keywords: tags,
      url: `${SITE_URL}/${collection}/${slug}`,
      author: { "@id": `${SITE_URL}/#person` },
      ...(cover ? { image: `${SITE_URL}${cover}` } : {}),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: collection === "veille" ? "Veille" : "Projets", item: `${SITE_URL}/${collection}` },
        { "@type": "ListItem", position: 3, name: title },
      ],
    },
  ],
}
```

#### d. Titre et description propres au référencement

Deux champs facultatifs dans le `metadata` des MDX, `seoTitle` et `description`, lus par `entryMetadata` avec repli sur `title` et `summary`. Le titre et le résumé affichés sur le site ne changent pas.

```diff
-  const { title, summary, cover, coverAlt } = entry.metadata;
+  const { title, summary, cover, coverAlt, seoTitle, description = summary } = entry.metadata;
   const url = `/${collection}/${slug}`;
   return {
-    title,
-    description: summary,
+    title: seoTitle ?? title,
+    description,
```

#### e. `public/llms.txt`

```markdown
# Yanis Harrat

> Après une 1re année de BTS SIO à Fénelon Sup, Yanis Harrat entre en BTS SIO option SISR (systèmes et réseaux) à l'AURLOM en septembre 2027. Il cherche une alternance de deux ans comme technicien systèmes et réseaux à Paris et en Île-de-France (3 jours en entreprise, 2 jours à l'école).

- Expérience : technicien helpdesk N1/N2 au Secours Catholique (juin à septembre 2026) : Microsoft 365, Entra ID, Intune, Autopilot, Active Directory, tickets sous SLA.
- Compétences : Windows Server, Active Directory, GPO, Microsoft 365, Intune, Proxmox, OPNsense, Docker, VLAN, TCP/IP, DNS, DHCP, Python, n8n.
- Contact : https://yanis-harrat.com/contact

## Projets
- [Lab Active Directory sous Windows Server 2025](https://yanis-harrat.com/projets/lab-active-directory-windows-server) : AD DS, DNS, DHCP, AGDLP, GPO, DFS-R.
- [Homelab Proxmox et Docker](https://yanis-harrat.com/projets/homelab-proxmox-docker) : OPNsense, VLAN, Traefik, WireGuard.
- [AppKite](https://yanis-harrat.com/projets/appkite-app-macos) : app macOS en SwiftUI, pilotée avec Claude Code.

## Veille technologique
- [Présentation](https://yanis-harrat.com/veille) : l'IA comme assistant de l'administrateur systèmes et réseaux, sans perdre la sécurité ni la traçabilité.

## Profils
- [LinkedIn](https://www.linkedin.com/in/yanis-harrat/)
- [GitHub](https://github.com/yanix2445)
- [CV (PDF)](https://yanis-harrat.com/cv/yanis-harrat-cv.pdf)
```

Fichier statique à tenir à jour à chaque nouveau projet. Si tu préfères zéro entretien, une route `llms.txt/route.ts` le générerait depuis le contenu MDX (un peu plus de code).

#### f. Bloc « En bref » sur l'accueil (AEO)

C'est le seul changement visible : il touche au design et aux e2e (ordre des six sections). **À valider avant tout.**

Une section courte avant le final, dans le style de la fiche technique (rangées, légende mono à gauche, réponse à droite). Chaque réponse se suffit à elle-même : c'est ce qu'une IA extrait.

| Question | Réponse |
| -------- | ------- |
| Quel poste cherches-tu ? | Une alternance de technicien systèmes et réseaux, de deux ans, en BTS SIO option SISR. |
| À partir de quand, et à quel rythme ? | À partir de septembre 2027, 3 jours en entreprise et 2 jours à l'école. |
| Où ? | À Paris et en Île-de-France. |
| Quelle expérience as-tu déjà ? | Quatre mois de helpdesk N1/N2 au Secours Catholique : Microsoft 365, Entra ID, Intune, Autopilot, Active Directory, tickets sous SLA sur Zendesk. |
| Sur quoi t'entraînes-tu en dehors ? | Un homelab Proxmox avec pare-feu OPNsense, VLAN et services Docker, et un lab Active Directory sous Windows Server 2025. |
| Comment te contacter ? | Par le formulaire de contact, un appel de 15 minutes sur Cal.com, ou par e-mail. |

Avec un balisage `FAQPage`. Google n'affiche plus ces encarts que pour les sites officiels et de santé (depuis 2023) : le gain vise ChatGPT, Perplexity et Claude, pas Google.

Zone confirmée : toute l'Île-de-France. `Person` n'a pas de propriété de zone de recherche d'emploi : la zone passe par la description du balisage et par ce bloc.

#### g. Petites corrections

- `alt` des badges : `Badge officiel ${issuer}` donne deux fois « Badge officiel Google ». Le texte voisin nomme déjà la certification ; `alt=""` (image décorative) est le plus juste pour l'accessibilité. Gain SEO nul dans les deux cas.
- Favicons : ajouter `src/app/icon.png` et `src/app/apple-icon.png` (le monogramme du site).
- Sitemap : ajouter le CV (`/cv/yanis-harrat-cv.pdf`). Gain faible, coût nul.
- CV PDF : `exiftool -Title="CV Yanis Harrat, alternance technicien systèmes et réseaux" -Author="Yanis Harrat"`. À refaire après chaque export Canva : mieux vaut le régler dans Canva.

### 3.2 Textes SEO prêts à copier

| Page | Title (avec « · Yanis Harrat ») | Meta description |
| ---- | ------------------------------- | ---------------- |
| Accueil | Yanis Harrat · Technicien systèmes & réseaux, alternance Paris (61) | Étudiant en BTS SIO SISR, je cherche une alternance de technicien systèmes et réseaux à Paris dès septembre 2027 : Active Directory, Microsoft 365, Proxmox. (156) |
| `/projets` | Projets systèmes et réseaux · Yanis Harrat (42) | Lab Active Directory sous Windows Server 2025, homelab Proxmox et OPNsense, app macOS : mes projets d'étudiant BTS SIO SISR, chacun avec sa fiche détaillée. (156) |
| `/veille` | Veille technologique : l'IA et l'admin réseau · Yanis Harrat (60) | Veille technologique BTS SIO SISR : l'IA comme assistant de l'administrateur systèmes et réseaux, sans perdre sécurité ni traçabilité. Une fiche par semaine. (159) |
| `/contact` | Proposer une alternance · Yanis Harrat (38) | Proposer une alternance de technicien systèmes et réseaux à Yanis Harrat (BTS SIO SISR, Paris, septembre 2027) : formulaire, appel de 15 min ou e-mail. (151) |
| Lab AD | inchangé (60) | inchangée (144) |
| Homelab | `seoTitle` : Homelab Proxmox, OPNsense et Docker (50) | Un ancien PC devenu serveur Proxmox : pare-feu OPNsense, VLAN, VM Windows Server et services Docker sous Debian 13, derrière Traefik et WireGuard. (146) |
| AppKite | inchangé (55) | AppKite, une app macOS gratuite pour la barre de menus : historique du presse-papiers en SwiftUI, piloté de la spec à la revue avec Claude Code. (144) |
| Veille, dépannage | `seoTitle` : Agent IA de dépannage et guide ANSSI (51) | Un agent IA pour diagnostiquer une panne Proxmox et OPNsense : son apport, les règles du guide ANSSI sur l'IA agentique et le piège des journaux. (145) |
| Veille, copilote | inchangé (61) | Développer, administrer et dépanner un homelab avec un agent IA : ce que je lui confie, ce que disent l'ANSSI et l'OWASP, et où placer la limite. (145) |

Le titre de l'accueil n'utilise pas le gabarit : il s'écrit en entier dans `title.default`.

**`h1` et `h2`** : je ne propose pas de les changer. Le `h1` de l'accueil (ton nom, avec `aria-label`) est le bon pour une requête de marque. Les `h2` « À l'affiche » ou « Fiche technique » sont peu descriptifs, mais le contenu dessous porte les mots-clés ; les renommer casserait la direction « Générique » pour un gain marginal.

### 3.3 Ce que tu dois faire toi-même

1. **Google Search Console** : ajouter la propriété de domaine `yanis-harrat.com` (vérification par TXT chez Cloudflare), soumettre `https://yanis-harrat.com/sitemap.xml`, demander l'indexation de l'accueil, `/projets`, `/veille` et des 5 fiches.
2. **Bing Webmaster Tools** : importer la propriété depuis Search Console. Bing alimente ChatGPT et Copilot.
3. **Compléter les 12 « *à compléter* »** du homelab et du lab AD. Un schéma réseau par projet (en image, avec `coverAlt`) donne en plus l'image de partage de la fiche. Si une info manque encore, retirer la ligne plutôt que l'afficher vide.
4. **Confirmer l'école du TP Active Directory** (section 7).
5. **Liens de vérification des certifications** (Credly pour Cisco, Coursera pour Google…) à me donner pour `verifyUrl`.
6. **Site Netlify homonyme** : la page renvoie 404, donc n'importe qui peut demander son retrait des résultats avec l'outil Google « Supprimer du contenu obsolète » (sans compte Search Console), et l'outil équivalent de Bing. Pour le reste, la cohérence de tes propres profils suffit à te départager.
7. **LinkedIn et GitHub** : section 4.

### 3.4 Récapitulatif

| Action | Automatisable | Toi |
| ------ | :-----------: | :-: |
| Image de partage, `summary_large_image` | ✓ | |
| Données structurées (accueil, fiches, fil d'Ariane) | ✓ | |
| Titles et descriptions | ✓ | relire |
| `llms.txt`, favicons, CV dans le sitemap | ✓ | |
| Bloc « En bref » + `FAQPage` | ✓ | valider le design |
| Métadonnées du CV | ✓ (exiftool) | ou Canva |
| Search Console, Bing, demandes d'indexation | | ✓ |
| Contenus « à compléter », schémas réseau | | ✓ |
| Faits contradictoires, liens de certification | | ✓ |
| Profils LinkedIn et GitHub, posts | rédaction ✓ | publication ✓ |
| README de profil GitHub, dépôts de scripts | ✓ (rédaction) | relire, publier |
| Suivi mensuel des réponses IA | | ✓ (10 min/mois) |

---

## 4. Plan marketing

### Positionnement (une phrase, partout pareille)

> Futur alternant technicien systèmes & réseaux (BTS SIO SISR, Paris, septembre 2027), déjà passé par la production sur Microsoft 365 et Intune, et qui utilise l'IA pour administrer, sous contrôle.

Ton angle différenciant : **la production réelle** (helpdesk N1/N2) + **un homelab documenté** + **une veille sur l'IA agentique cadrée par l'ANSSI**. Beaucoup de portfolios BTS SIO ont une veille IA ; peu la confrontent à leur propre homelab et à un guide ANSSI d'octobre 2026. C'est ce qu'il faut répéter.

Les IA recommandent sur la base du **consensus** : le même titre, la même ville, la même date, les mêmes compétences sur le site, LinkedIn, GitHub, le CV et les jobboards.

### LinkedIn (canal n° 1)

- **Titre** (195 caractères) : `Futur alternant technicien systèmes & réseaux · BTS SIO SISR · Paris, sept. 2027 · Active Directory, Microsoft 365, Intune · Homelab Proxmox / OPNsense · L'IA au service de l'admin, sous contrôle`
- **Infos** (à adapter avec tes mots) :
  > Je cherche une alternance de deux ans comme technicien systèmes et réseaux à Paris, à partir de septembre 2027 (3 jours en entreprise, 2 jours à l'école, BTS SIO SISR).
  >
  > En production, au Secours Catholique, j'ai traité des tickets N1/N2 sous SLA, administré Microsoft 365 et Entra ID, déployé des postes avec Autopilot et Intune.
  >
  > Chez moi, je fais tourner un homelab Proxmox : pare-feu OPNsense, VLAN, services Docker derrière Traefik et WireGuard, et un lab Active Directory sous Windows Server 2025.
  >
  > Ma veille porte sur l'IA comme assistant de l'administrateur : ce qu'on peut lui confier sans perdre la sécurité ni la traçabilité.
  >
  > Projets, veille et CV : yanis-harrat.com
- **Site web** : `https://yanis-harrat.com`, libellé « Portfolio ».
- **Sélection (Featured)** : le portfolio, le CV, le lab AD, la dernière fiche de veille.
- **« Open to work »** visible des recruteurs seulement, poste « Technicien systèmes et réseaux », type « Alternance », lieu Paris.
- **Compétences** : les 5 premières = Active Directory, Microsoft 365, Windows Server, Réseaux TCP/IP, Proxmox.
- **Certifications** : les 7, avec leur lien de vérification.
- **Bannière** : reprendre le visuel de l'image de partage (cohérence visuelle).

### GitHub

- **Bio** (110 caractères) : `BTS SIO SISR · futur alternant technicien systèmes & réseaux (Paris, sept. 2027). AD, M365, Proxmox, OPNsense.`
- **Entreprise** : « Black Rise » est à toi. Garde-le seulement si un recruteur peut comprendre ce que c'est : la même ligne dans ton expérience LinkedIn, et un lien (site ou organisation GitHub). Sinon, c'est un signal inexpliqué à côté d'une recherche d'alternance.
- **README de profil** (dépôt `yanix2445/yanix2445`) : 5 lignes (qui, ce que tu cherches, stack, liens vers le site et LinkedIn).
- **Épingler** : `portfolio`, `AppKite`, puis deux dépôts à créer, tes meilleures preuves pour un poste SISR :
  - `homelab` : les fichiers `docker compose` nettoyés (aucun secret), le plan d'adressage des VLAN, un schéma.
  - `lab-active-directory` : les scripts PowerShell du lab (OU, groupes AGDLP, GPO), avec un README.
- **AppKite** : ajouter une description et des topics (`macos`, `swiftui`, `menu-bar`, `clipboard-manager`, `claude-code`).

### Autres canaux, par rentabilité

1. **Jobboards d'alternance** (là où les recruteurs cherchent) : La bonne alternance, HelloWork, Indeed, Welcome to the Jungle. Le lien du portfolio dans chaque profil et chaque candidature.
2. **Tes écoles** : demander à Fénelon Sup et à l'AURLOM si elles relaient les profils de leurs étudiants (CVthèque, page « nos étudiants »). Un lien depuis un site d'école est le lien entrant le plus crédible auquel tu as accès.
3. **Reddit r/homelab, forums francophones (IT-Connect)** : partager ton homelab quand la fiche est complète, en demandant des retours, sans spam.
4. **dev.to ou Medium** : republier une fiche de veille avec le lien canonique vers ton site (`canonical_url` sur dev.to), pour gagner un lien sans dupliquer.

À éviter : annuaires de liens, échanges de liens, faux avis, publication de masse générée par IA. Ça nuit auprès de Google comme des IA.

### 5 idées de posts

Règles communes : la phrase clé dans les premiers mots (elle devient l'URL du post), 150-300 mots, un fait technique précis par post, pas de gras Unicode, le lien du site dans le post.

1. **Lancement : « Alternance systèmes et réseaux dès septembre 2027 : voici mon portfolio »**
   Ce que tu cherches (poste, rythme, Paris), 3 preuves (helpdesk en production, homelab, lab AD), le lien. Demande explicite : « un partage aide ». Image : l'image de partage du site.
2. **« Homelab Proxmox + OPNsense : la panne de VLAN qui m'a pris un week-end »**
   Le symptôme, les fausses pistes, la cause, la règle qui l'a résolue, ce que tu en retiens. Lien vers la fiche homelab. C'est le format qui montre le mieux un raisonnement de technicien.
3. **« Ce que 4 mois de helpdesk N1/N2 m'ont appris sur Intune et Autopilot »**
   3 leçons concrètes (sans données internes du Secours Catholique), une erreur que tu ne referas pas. Lien vers l'accueil. Montre la production, ton atout le plus rare.
4. **« Le guide ANSSI sur l'IA agentique, lu par un étudiant SISR »**
   La règle qui t'a le plus marqué, comment tu l'appliques dans ton homelab (actions classées : seul, proposé, validé, interdit), une question ouverte aux admins. Lien vers la fiche de veille. Sujet récent et citable, qui t'associe à « IA + sécurité ».
5. **GitHub, puis LinkedIn : « Lab Active Directory : mes scripts PowerShell AGDLP en open source »**
   Publier le dépôt `lab-active-directory`, puis le post : ce que fait chaque script, une capture du résultat, le lien du dépôt et de la fiche. Un dépôt public est une preuve qu'un recruteur technique peut ouvrir.

Rythme réaliste : 1 post par semaine, plus des commentaires utiles sous les posts d'admins systèmes et de recruteurs IT (10 minutes par jour).

---

## 5. Plan d'action sur 30 jours

| Semaine | Toi | Automatisable (avec ton accord) |
| ------- | --- | ------------------------------- |
| **S1 (J1-7) : fondations** | Search Console + Bing, sitemap, demandes d'indexation. Trancher les faits (question 2). Profil LinkedIn (titre, infos, site, sélection, open to work). Bio GitHub. | PR `claude/seo-aeo` : image de partage, données structurées, titles et descriptions, `llms.txt`, favicons, CV dans le sitemap. |
| **S2 (J8-14) : crédibilité** | Compléter homelab et lab AD (matériel, période, schémas). Liens de vérification des certifications. Post 1 (lancement). | README de profil GitHub, dépôt `homelab` préparé (tu relis et publies). Métadonnées du CV. |
| **S3 (J15-21) : preuves** | Post 2 (panne VLAN). Profils sur 2 jobboards d'alternance. Contacter les deux écoles. Fiche de veille de la semaine. | Bloc « En bref » si le design est validé. Dépôt `lab-active-directory` préparé. |
| **S4 (J22-30) : diffusion et mesure** | Posts 3 et 4. Homelab sur r/homelab. Premier relevé (ci-dessous). | Post 5 + publication du dépôt de scripts. Ajustement des titles d'après les requêtes Search Console. |

**Relevé à J30** (10 minutes, à refaire chaque mois) :

- Google : `Yanis Harrat` (le site, LinkedIn et GitHub sont-ils en première page ?) et `site:yanis-harrat.com` (10 pages indexées ?).
- Search Console : pages indexées, impressions, premières requêtes.
- ChatGPT, Perplexity et Claude, 3 fois chacun : « Qui est Yanis Harrat ? », « Yanis Harrat BTS SIO SISR », « Portfolio BTS SIO SISR avec un homelab Proxmox ». Noter si le site est cité et si les faits sont justes (ex. « cité 2 fois sur 3 »).
- Vercel Analytics : visites venant de LinkedIn, de Google et des IA (`chatgpt.com`, `perplexity.ai`).

Objectifs réalistes à 30 jours : 10/10 pages indexées, ton nom en tête de ses résultats Google, des faits justes dans les réponses des IA qui te trouvent. Les citations par les IA sur des requêtes génériques prendront plutôt 2 à 3 mois.

---

## 6. Ce que ça ne réglera pas

- Le SEO ne fera pas venir les recruteurs à lui seul : les candidatures et LinkedIn restent la source principale d'entretiens. Le site sert à **convaincre** ceux qui arrivent.
- Le budget de 0 €/mois et l'offre Vercel Hobby (usage non commercial) ne changent pas : rien ici n'est payant ni commercial.

---

## 7. Questions à trancher avant la PR

Réponses de Yanis (2026-11-25) :

- Entrée à l'AURLOM en septembre 2027 : le parcours de l'accueil (`profile.ts`) est juste.
- Zone : toute l'Île-de-France.
- « Black Rise » est à lui ; `yanis-harrat.netlify.app` ne lui appartient pas (ou plus).

Ce qui reste faux, à corriger dans la PR :

- `lab-active-directory-windows-server.mdx` : « Ce lab est né d'un TP du BTS SIO SISR à AURLOM » ne peut pas être vrai. Probablement « à Fénelon Sup » : à confirmer.
- `aidd_docs/memory/project-brief.md` : « étudiant en 1re année de BTS SIO SISR à l'AURLOM » est faux aussi. Ce n'est pas public, mais c'est la source que je relis à chaque session.
- Le `jobTitle` actuel (« … en alternance ») : remplacé par le balisage de 3.1 b.

Reste ouverte : **valides-tu la PR automatisable (3.1 a à e, g, plus ces corrections) ?** Le bloc « En bref » (f) à part, car il touche au design.
