"use client";

//? Dépendances React et Next.js essentielles pour le composant
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

//? Import des icônes principales utilisées dans l'UI (lucide-react + react-icons)
//? (Permet d'avoir des icônes cohérentes et réutilisables partout)
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  Phone,
  ArrowRight,
  Clock,
  Heart,
  Code2,
  MapPin,
  Zap,
  Download,
  Atom,
  Database,
  Pyramid,
  CheckSquare,
  Figma,
  Monitor,
  Terminal,
  Workflow,
  Key,
  Cable,
  Network,
  Gauge,
  Braces,
} from "lucide-react";
import {
  RiTailwindCssFill,
  RiNextjsLine,
  RiSupabaseFill,
} from "react-icons/ri";
import {
  SiN8N,
  SiAirtable,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNestjs,
} from "react-icons/si";

//? Import des composants UI custom (badge, bouton, avatar)
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

//? Liste des technologies principales maîtrisées (affichées dans la stack)
const technologies = [
  { name: "Next.js", icon: <RiNextjsLine className="w-4 h-4" /> },
  { name: "React", icon: <Atom className="w-4 h-4" /> },
  { name: "TailwindCSS", icon: <RiTailwindCssFill className="w-4 h-4" /> },
  { name: "shadcn/ui" }, //* Pas d'icône dispo
  { name: "TypeScript", icon: <SiTypescript className="w-4 h-4" /> },
  { name: "JavaScript", icon: <SiJavascript className="w-4 h-4" /> },
  { name: "Python", icon: <SiPython className="w-4 h-4" /> },
  { name: "PostgreSQL", icon: <Database className="w-4 h-4" /> },
  { name: "Prisma", icon: <Pyramid className="w-4 h-4" /> },
  { name: "n8n", icon: <SiN8N className="w-4 h-4" /> },
  { name: "Airtable", icon: <SiAirtable className="w-4 h-4" /> },
  { name: "REST API" }, //* Pas d'icône dispo
  { name: "Supabase", icon: <RiSupabaseFill className="w-4 h-4" /> },
  { name: "Zod", icon: <CheckSquare className="w-4 h-4" /> },
  { name: "CI/CD", icon: <Workflow className="w-4 h-4" /> },
  { name: "Auth (betterAuth)", icon: <Key className="w-4 h-4" /> },
  { name: "Figma", icon: <Figma className="w-4 h-4" /> },
  { name: "VS Code", icon: <Monitor className="w-4 h-4" /> },
  { name: "Bash", icon: <Terminal className="w-4 h-4" /> },
  { name: "FTTH", icon: <Cable className="w-4 h-4" /> },
  { name: "Diagnostic réseau", icon: <Network className="w-4 h-4" /> },
];

//? Technologies en cours d'apprentissage (affichées à part)
const currentLearning = [
  { name: "NestJS", icon: <SiNestjs className="w-4 h-4" /> },
  { name: "scripting avancé", icon: <Braces className="w-4 h-4" /> },
  { name: "monitoring", icon: <Gauge className="w-4 h-4" /> },
];

//? Composant ProgressBar : Affiche la progression temporelle du projet (animation fluide)
const ProgressBar = () => {
  //? Savoir si le composant est monté côté client (évite l'hydratation Next.js)
  const [isMounted, setIsMounted] = useState(false);
  //? Valeur de progression animée (0 à 100)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    //? 1. Définition des bornes temporelles du projet
    const startDate = new Date("2025-07-15T00:00:00");
    const endDate = new Date("2025-09-15T23:59:59"); //* Fin de journée incluse
    const currentDate = new Date();
    const maxValue = 100; //? Valeur max de la barre (100%)

    //? 2. Calcul du ratio de progression réel (entre 0 et 1)
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = currentDate.getTime() - startDate.getTime();
    let realProgressRatio = elapsedDuration / totalDuration;

    //? Clamp le ratio entre 0 et 1 pour éviter les débordements
    if (realProgressRatio < 0) realProgressRatio = 0;
    if (realProgressRatio > 1) realProgressRatio = 1;

    //? 3. Calcul de la valeur cible à atteindre (pour l'animation)
    const targetValue = realProgressRatio * maxValue;

    //? 4. Animation fluide vers la valeur cible (effet easing)
    const timer = setInterval(() => {
      setProgress((prev) => {
        //? Si on est très proche de la cible, on arrête l'animation
        if (Math.abs(prev - targetValue) < 0.5) {
          clearInterval(timer);
          return targetValue;
        }
        //? Sinon, on s'approche progressivement (effet smooth)
        return prev + (targetValue - prev) * 0.06;
      });
    }, 50); //* Animation toutes les 50ms

    //? Nettoyage du timer à l'unmount
    return () => clearInterval(timer);
  }, []);

  //? Affichage progressif côté client, 0% côté serveur (évite le mismatch SSR/CSR)
  const displayProgress = isMounted ? Math.round(progress) : 0;

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium">Portfolio en construction</span>
        <span className="text-sm text-primary font-bold">
          {isMounted ? `${displayProgress}%` : "0%"}
        </span>
      </div>
      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full transition-all duration-300 relative"
          style={{ width: `${isMounted ? progress : 0}%` }}
        >
          {isMounted && (
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          )}
        </div>
      </div>
    </div>
  );
};

//? Composant principal de la page "Coming Soon"
const ComingSoonPage = () => {
  //? Contrôle l'animation d'apparition des sections (fade/slide)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  //? Liste des liens vers les réseaux sociaux (affichés en bas de page)
  const socialLinks = [
    {
      id: "social-linkedin",
      icon: <Linkedin className="w-5 h-5" />, //? Icône LinkedIn
      href: "https://www.linkedin.com/in/yanis-harrat", //? Lien LinkedIn
      label: "LinkedIn", //? Accessibilité
    },
    {
      id: "social-github",
      icon: <Github className="w-5 h-5" />, //? Icône GitHub
      href: "https://github.com/yanix2445",
      label: "GitHub",
    },
    {
      id: "social-instagram",
      icon: <Instagram className="w-5 h-5" />, //? Icône Instagram
      href: "https://instagram.com/yanix2445",
      label: "Instagram",
    },
    {
      id: "social-twitter",
      icon: <Twitter className="w-5 h-5" />, //? Icône Twitter
      href: "https://twitter.com/yanix2445",
      label: "Twitter",
    },
  ];

  //? Liste des hobbies (affichés sous forme de badges)
  const hobbies = [
    { id: "hobby-volleyball", label: "🏐 Volleyball 8 ans" }, //? Sport collectif, persévérance
    { id: "hobby-gaming", label: "🎮 Gaming" }, //? Passion jeux vidéo
    { id: "hobby-anime", label: "🍥 Animés, mangas & culture japonaise" }, //? Culture pop japonaise
    {
      id: "hobby-cinema",
      label: "🎬 Cinéphile, sériephile & films d'animation", //? Goût pour l'image et la narration
    },
    { id: "hobby-travel", label: "✈️ Voyages" }, //? Ouverture d'esprit, découverte
    { id: "hobby-hardware", label: "🔧 Hardware" }, //? Intérêt pour la technique et le DIY
  ];

  //? Données structurées JSON-LD pour le SEO (améliore la compréhension par Google)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yanis Harrat",
    jobTitle: "Développeur Full-Stack & Technicien IT",
    description:
      "Étudiant BTS SIO SISR, développeur JavaScript/Python, spécialisé en automatisation et infrastructure réseau. Recherche alternance Paris 2025-2027.",
    url: "https://yanis-harrat.vercel.app",
    sameAs: [
      "https://www.linkedin.com/in/yanis-harrat",
      "https://github.com/yanix2445",
      "https://instagram.com/yanix2445",
      "https://twitter.com/yanix2445",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Next.js",
      "React",
      "PostgreSQL",
      "n8n",
      "Automatisation",
      "Réseau",
      "FTTH",
    ],
  };

  return (
    <>
      {/* 
        //? Script JSON-LD pour le SEO 
        //? (Permet aux moteurs de recherche de mieux comprendre le contenu de la page)
      */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 
        //? Wrapper principal : fond dégradé sur toute la hauteur de l'écran 
      */}
      <div className="min-h-screen bg-gradient-to-br from-background/95 via-background/98 to-muted/10">

        {/* 
          //? Header flottant : avatar, nom, titre, badge "En construction"
        */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* 
                //? Bloc avatar + nom + sous-titre 
              */}
              <div className="flex items-center gap-3">
                <Avatar className="w-[64px] h-[64px]">
                  <AvatarImage
                    src="/yanis-logo.png"
                    alt="Yanis Harrat - Développeur full-stack et technicien IT"
                    className="w-full h-full rounded-full object-cover"
                  />
                </Avatar>
                <div>
                  <h1 className="font-semibold text-sm">Yanis Harrat</h1>
                  <p className="text-xs text-muted-foreground">
                    Développeur • Étudiant BTS SIO
                  </p>
                </div>
              </div>

              {/* //? Badge d'état du site */}
              <Badge variant="outline" className="gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                En construction
              </Badge>
            </div>
          </div>
        </header>

        {/* 
          //? Contenu principal de la page 
        */}
        <main className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-4xl backdrop-blur-sm">
            {/* 
              //? Section Hero : présentation rapide, message d'indisponibilité, barre de progression
            */}
            <section
              className={`text-center backdrop-blur-sm mb-16 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              aria-label="Présentation Yanis Harrat développeur"
            >
              {/* //? Message d'indisponibilité du portfolio */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Clock className="w-4 h-4" />
                Portfolio temporairement indisponible
              </div>

              {/* //? Titre principal */}
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Salut ! <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Moi c&apos;est Yanis
                </span>
              </h2>

              {/* //? Description courte */}
              <p className="xl:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Développeur full-stack passionné, je refais entièrement mon
                portfolio avec du Next.js et des technos modernes. En attendant,
                laisse-moi me présenter rapidement !
              </p>

              {/* //? Barre de progression (animation ou indicateur d'avancement) */}
              <div className="max-w-md mx-auto mb-8">
                <ProgressBar />
              </div>
            </section>

            {/* 
              //? Section "À propos" : présentation détaillée, parcours, hobbies, alternance
            */}
            <section
              className={`mb-24 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              aria-label="À propos de Yanis Harrat"
            >
              {/* 
                En-tête de la section "À propos" 
              */}
              <header className="text-center mb-16 backdrop-blur-sm">
                <div className="flex flex-col justify-center items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">
                    Mieux me connaître
                  </h3>
                </div>

                {/* Texte d'intro sur la personnalité et la philosophie */}
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                  Je suis Yanis — Technicien IT & Développeur full-stack,
                  orienté solutions concrètes. Sérieux, curieux et carré, je
                  cherche à progresser vite tout en restant utile. J&apos;aime
                  créer des systèmes stables, bien pensés et sans friction.
                </p>
              </header>

              {/* 
                Grille de présentation : 
                - À gauche : parcours, expériences, hobbies
                - À droite : carte alternance
              */}
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 mb-20 text-1xl">
                {/* 
                  Bloc parcours et hobbies 
                */}
                <article className="space-y-5 backdrop-blur-sm">
                  {/* Titre du parcours */}
                  <h4 className="text-xl font-semibold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Mon parcours condensé
                  </h4>
                  {/* Description du parcours scolaire et professionnel */}
                  <p className="text-muted-foreground">
                    Issu d&apos;un <strong>Bac Pro SN</strong> et actuellement
                    en <strong>BTS SIO SISR</strong>, j&apos;ai touché à la
                    fibre optique, au support informatique, à la configuration
                    réseau, au développement web, l&apos;automatisation et la
                    restauration. Mon expérience : terrain + code + logique.
                    J&apos;ai développé un <strong>CRM no-code hybride</strong>{" "}
                    (n8n, JavaScript, Python, Airtable) livré complet avec
                    documentation et formation utilisateur.
                  </p>

                  {/* Expérience sportive et soft skills */}
                  <p className="text-muted-foreground">
                    <strong>8 ans de volleyball</strong> (3 en Nationale 2), ça
                    forge : esprit d&apos;équipe, gestion de la pression,
                    discipline, timing. J&apos;applique ces réflexes dans mes
                    projets tech.
                  </p>

                  {/* Ouverture culturelle */}
                  <p className="text-muted-foreground">
                    Passionné de découvertes culturelles&nbsp;— Algérie, Grèce,
                    et bientôt direction le Japon&nbsp;! J&apos;adore explorer
                    de nouveaux horizons, comprendre d&apos;autres modes de vie
                    et m&apos;inspirer de chaque rencontre.
                  </p>

                  {/* Liste des hobbies sous forme de badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {hobbies.map((hobby) => (
                      <Badge
                        key={hobby.id}
                        variant="secondary"
                        className="text-xs px-3 py-1"
                      >
                        {hobby.label}
                      </Badge>
                    ))}
                  </div>
                </article>

                {/* 
                  Carte alternance : 
                  Met en avant la recherche d'alternance avec infos clés pour le SEO
                */}
                <aside className="bg-gradient-to-br backdrop-blur-sm from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold">
                      🎯 Recherche Alternance BTS SIO
                    </h4>
                  </div>

                  <div className="space-y-3 text-muted-foreground">
                    {/* Localisation de l'alternance */}
                    <div className="flex flex-col md:flex-row md:items-center gap-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium">Localisation&nbsp;:</span>
                      </div>
                      <span className="ml-1 md:ml-0">
                        <strong>Paris, Île-de-France</strong>
                      </span>
                    </div>
                    {/* Détail du cursus et de la période d'alternance */}
                    <p>
                      Je démarre ma{" "}
                      <strong>
                        1<sup>ère</sup> année de BTS SIO SISR{" "}
                      </strong>
                      en <strong>septembre 2025</strong> ({" "}
                      <strong>2j école / 3j entreprise</strong> ), et je
                      recherche activement une{" "}
                      <strong>alternance jusqu&apos;en août 2027</strong>.
                    </p>
                    {/* Soft skills et motivation */}
                    <p>
                      Curieux, impliqué et déjà expérimenté sur le terrain (
                      support IT, réseau, développement full-stack,
                      automatisation ), je progresse vite et j&apos;aime aller
                      au fond des sujets.
                      <br />
                      Sérieux, fiable, à l&apos;écoute, je m&apos;investis à
                      fond pour apporter des solutions concrètes et faire
                      avancer l&apos;équipe.
                    </p>
                    {/* Objectifs professionnels */}
                    <p>
                      Mon objectif&nbsp;: renforcer mes compétences en
                      <strong> backend</strong>, <strong>automatisation</strong>
                      ,<strong> infrastructure réseau</strong> et{" "}
                      <strong>support informatique</strong>
                      tout en contribuant activement à vos projets.
                    </p>
                    {/* Badge de disponibilité */}
                    <Badge variant="default" className="text-xs">
                      🚀 Disponible dès septembre 2025
                    </Badge>
                  </div>
                </aside>
              </div>

              {/* 
                Section stack technique : 
                Liste des technologies maîtrisées et en cours d'apprentissage
              */}
              <section className="bg-muted/30 rounded-2xl p-4 sm:p-6 border backdrop-blur-sm border-border/50 max-w-full sm:max-w-5xl mx-auto">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold">
                    Technologies & Stack technique
                  </h4>
                </div>

                {/* Description de la stack */}
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  Technologies que je maîtrise pour automatiser, développer des
                  applications web et structurer mes projets full-stack :
                </p>

                {/* Liste des technologies principales sous forme de badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {technologies.map((tech, i) => (
                    <Badge
                      key={tech.name + i}
                      variant="outline"
                      className="flex items-center gap-1 py-1.5 sm:gap-1.5 sm:py-2 text-xs"
                    >
                      {tech.icon && tech.icon}
                      {tech.name}
                    </Badge>
                  ))}
                </div>

                {/* Liste des technologies en cours d'apprentissage */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 text-xs text-muted-foreground italic">
                  <span className="shrink-0">
                    Technologies en apprentissage :
                  </span>
                  <ul className="flex flex-wrap gap-1.5 sm:gap-2 font-bold not-italic">
                    {currentLearning.map((tech, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-1 bg-muted/60 rounded px-1.5 py-0.5 sm:px-2 shadow-sm border border-border/30"
                      >
                        {tech.icon}
                        <span>{tech.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </section>

            {/* 
              //? Section contact : 
              //? Propose plusieurs moyens de contact et accès au CV
            */}
            <section
              className={`text-center space-y-8 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              aria-label="Contact Yanis Harrat"
            >
              {/* 
                Bloc principal de contact : 
                Email, téléphone, bouton de téléchargement du CV, lien vers page contact
              */}
              <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 backdrop-blur-sm">
                {/* Titre de la section contact */}
                <h3 className="text-3xl font-bold mb-4">
                  Discutons ensemble 💬
                </h3>
                {/* Message d'ouverture */}
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Portfolio en travaux, mais moi je suis toujours disponible !
                  Que ce soit pour parler tech, alternance BTS SIO, projets de
                  développement ou juste prendre des nouvelles.
                </p>

                {/* Boutons de contact direct (email et téléphone) */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button className="gap-2" asChild>
                    <Link
                      href="mailto:yanis.amine.harrat@gmail.com"
                      aria-label="Contacter Yanis Harrat par email"
                    >
                      <Mail className="w-4 h-4" />
                      yanis.amine.harrat@gmail.com
                    </Link>
                  </Button>
                  <Button variant="outline" className="gap-2" asChild>
                    <Link
                      href="tel:+33603059829"
                      aria-label="Appeler Yanis Harrat"
                    >
                      <Phone className="w-4 h-4" />
                      06.03.05.98.29
                    </Link>
                  </Button>
                </div>

                {/* 
                  Bouton de téléchargement du CV : 
                  Nom de fichier optimisé pour le SEO
                */}
                <div className="mb-8">
                  <Button
                    variant="default"
                    size="lg"
                    className="gap-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    asChild
                  >
                    <Link
                      href="/cv-yanis-harrat.pdf"
                      download="CV-Yanis-Harrat-Developpeur-BTS-SIO.pdf"
                      aria-label="Télécharger le CV de Yanis Harrat développeur BTS SIO"
                    >
                      <Download className="w-5 h-5" />
                      Télécharger mon CV
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF • Mise à jour récente • Développeur & BTS SIO
                  </p>
                </div>

                {/* 
                  Lien vers la page de contact avec formulaire 
                */}
                <div className="bg-background/50 rounded-xl p-6 border border-border/50">
                  <h4 className="font-semibold mb-2">Formulaire de contact</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    J&apos;ai déjà une page contact fonctionnelle avec un
                    formulaire qui marche nickel !
                  </p>
                  <Button variant="outline" className="gap-2 group" asChild>
                    <Link
                      href="/contact"
                      aria-label="Accéder au formulaire de contact de Yanis Harrat"
                    >
                      Voir la page contact
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* 
                Bloc réseaux sociaux : 
                Affiche les liens vers les différents réseaux avec icônes
              */}
              <div>
                <h4 className="text-xl font-semibold mb-6">
                  Mes réseaux sociaux
                </h4>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 bg-muted/30 hover:bg-muted/50 rounded-xl border border-border/50 hover:border-primary/30 transition-all transform hover:scale-105"
                      title={social.label}
                      aria-label={social.label}
                    >
                      <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        {social.icon}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default ComingSoonPage;
