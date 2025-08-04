"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
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

// Import des composants UI existants
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import FloatingDots from "@/components/floatingDots";

// Tableau des technologies avec icônes
const technologies = [
  { name: "Next.js", icon: <RiNextjsLine className="w-4 h-4" /> },
  { name: "React", icon: <Atom className="w-4 h-4" /> },
  { name: "TailwindCSS", icon: <RiTailwindCssFill className="w-4 h-4" /> },
  { name: "shadcn/ui" },
  { name: "TypeScript", icon: <SiTypescript className="w-4 h-4" /> },
  { name: "JavaScript", icon: <SiJavascript className="w-4 h-4" /> },
  { name: "Python", icon: <SiPython className="w-4 h-4" /> },
  { name: "PostgreSQL", icon: <Database className="w-4 h-4" /> },
  { name: "Prisma", icon: <Pyramid className="w-4 h-4" /> },
  { name: "n8n", icon: <SiN8N className="w-4 h-4" /> },
  { name: "Airtable", icon: <SiAirtable className="w-4 h-4" /> },
  { name: "REST API" },
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

// Tableau des technologies en cours d'apprentissage
const currentLearning = [
  { name: "NestJS", icon: <SiNestjs className="w-4 h-4" /> },
  { name: "scripting avancé", icon: <Braces className="w-4 h-4" /> },
  { name: "monitoring", icon: <Gauge className="w-4 h-4" /> },
];

// Barre de progression
const ProgressBar = () => {
  // on utilise un état pour savoir si on est côté client
  const [isMounted, setIsMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    // --- 1. Définition des dates du projet ---
    const startDate = new Date("2025-07-15T00:00:00");
    const endDate = new Date("2025-09-15T23:59:59"); // Fin de journée pour inclure le 15
    const currentDate = new Date();
    const maxValue = 100; // Le plafond défini (100%)

    // --- 2. Calcul de la progression ---
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = currentDate.getTime() - startDate.getTime();

    // Calcul du pourcentage de temps écoulé (entre 0 et 1)
    let realProgressRatio = elapsedDuration / totalDuration;

    // On s'assure que le ratio reste entre 0 et 1
    if (realProgressRatio < 0) realProgressRatio = 0;
    if (realProgressRatio > 1) realProgressRatio = 1;

    // On mappe ce ratio à la valeur maximale de la barre (100)
    const targetValue = realProgressRatio * maxValue;

    // --- 3. Animation fluide vers la valeur cible ---
    const timer = setInterval(() => {
      setProgress((prev) => {
        // Si on est très proche de la cible, on s'arrête
        if (Math.abs(prev - targetValue) < 0.5) {
          clearInterval(timer);
          return targetValue;
        }
        // On se rapproche doucement de la cible
        return prev + (targetValue - prev) * 0.06;
      });
    }, 50); // Met à jour l'animation toutes les 50ms

    return () => clearInterval(timer);
  }, []);

  // Le rendu initial sur le serveur sera de 0%, puis la valeur réelle sera calculée côté client
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

const ComingSoonPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const socialLinks = [
    {
      id: "social-linkedin",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/yanis-harrat",
      label: "LinkedIn",
    },
    {
      id: "social-github",
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/yanix2445",
      label: "GitHub",
    },
    {
      id: "social-instagram",
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/yanix2445",
      label: "Instagram",
    },
    {
      id: "social-twitter",
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com/yanix2445",
      label: "Twitter",
    },
  ];

  // Mes hobbies reflètent mes passions pour la culture japonaise, les animés/mangas, le cinéma, les séries et les films d'animation.
  const hobbies = [
    { id: "hobby-volleyball", label: "🏐 Volleyball 8 ans" },
    { id: "hobby-gaming", label: "🎮 Gaming" },
    { id: "hobby-anime", label: "🍥 Animés, mangas & culture japonaise" },
    {
      id: "hobby-cinema",
      label: "🎬 Cinéphile, sériephile & films d'animation",
    },
    { id: "hobby-travel", label: "✈️ Voyages" },
    { id: "hobby-hardware", label: "🔧 Hardware" },
  ];

  return (
    <>

      <FloatingDots />
      <div className="min-h-screen bg-gradient-to-br from-background/95 via-background/98 to-muted/10 ">
        {/* Header flottant */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-[64px] h-[64px]">
                  <AvatarImage
                    src="/yanis-logo.png"
                    alt="Logo du site"
                    className="w-full h-full rounded-full object-cover"
                  />
                </Avatar>

                <div>
                  <div className="font-semibold text-sm">Yanis Harrat</div>
                  <div className="text-xs text-muted-foreground">
                    Développeur • Étudiant BTS SIO
                  </div>
                </div>
              </div>

              <Badge variant="outline" className="gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                En construction
              </Badge>
            </div>
          </div>
        </header>

        {/* Main content */}

        <main className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            {/* Hero Section */}
            <div
              className={`text-center backdrop-blur-sm mb-16 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Clock className="w-4 h-4" />
                Portfolio temporairement indisponible
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Salut ! <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Moi c&apos;est Yanis
                </span>
              </h1>

              <p className="xl:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Je refais entièrement mon portfolio avec du Next.js et des
                technos modernes. En attendant, laisse-moi me présenter
                rapidement !
              </p>

              <div className="max-w-md mx-auto mb-8">
                <ProgressBar />
              </div>
            </div>
            <section

              className={`mb-24 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* En-tête */}

              <div className="text-center mb-16 backdrop-blur-sm  ">
                <div className="flex flex-col justify-center items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Mieux me connaître
                  </h2>
                </div>

                <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                  Je suis Yanis — Technicien IT & Développeur informatique ,
                  orienté solutions concrètes. Sérieux, curieux et carré, je
                  cherche à progresser vite tout en restant utile. J’aime créer
                  des systèmes stables, bien pensés et sans friction.
                </p>
              </div>

              {/* Présentation perso */}
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 mb-20 text-1xl">
                {/* Profil perso */}

                <div className="space-y-5 backdrop-blur-sm ">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Mon parcours condensé
                  </h3>
                  <p className="text-muted-foreground ">
                    Issu d’un Bac Pro SN et un BTS SIO SISR , j’ai touché à la
                    fibre, au support, à la config réseau, au dev,
                    l’automatisation et a la restoration . Mon expérience :
                    terrain + code + logique. J’ai bossé sur un CRM no-code
                    hybride (n8n, JS, Python, Airtable) livré complet avec doc
                    et formation.
                  </p>

                  <p className="text-muted-foreground ">
                    8 ans de volley (3 en N2), ça forge : esprit d’équipe,
                    pression, discipline, timing. J’applique ces réflexes dans
                    mes projets tech.
                  </p>

                  <p className="text-muted-foreground">
                    Passionné de découvertes culturelles&nbsp;— Algérie, Grèce,
                    et bientôt direction le Japon&nbsp;! J’adore explorer de
                    nouveaux horizons, comprendre d’autres modes de vie et
                    m’inspirer de chaque rencontre.
                  </p>

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
                </div>

                {/* Carte alternance */}

                <div className="bg-gradient-to-br backdrop-blur-sm  from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">
                      Mode Alternance activée
                    </h3>
                  </div>

                  <div className="space-y-3 text-muted-foreground ">
                    <div className="flex flex-col md:flex-row md:items-center gap-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium">Localisation&nbsp;:</span>
                      </div>
                      <span className="ml-1 md:ml-0">Paris, Île-de-France</span>
                    </div>
                    <p>
                      Je démarre ma
                      <strong>
                        1<sup>ère</sup> année de BTS SIO SISR
                      </strong>
                      en septembre 2025 ({" "}
                      <strong>2j école / 3j entreprise</strong> ), et je
                      recherche activement une alternance jusqu’en août 2027.
                    </p>
                    <p>
                      Curieux, impliqué et déjà expérimenté sur le terrain (
                      support, réseau, dev, automatisation ), je progresse vite
                      et j’aime aller au fond des sujets.
                      <br />
                      Sérieux, fiable, à l’écoute, je m’investis à fond pour
                      apporter des solutions concrètes et faire avancer
                      l’équipe.
                    </p>
                    <p>
                      Mon objectif&nbsp;: renforcer mes compétences en
                      <strong>backend</strong>, <strong>automatisation</strong>,
                      <strong>infra réseau</strong> et <strong>support</strong>
                      tout en contribuant activement à vos projets.
                    </p>
                    <Badge variant="default" className="text-xs">
                      🎯 Disponible dès septembre 2025
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Stack technique */}

              <section className="bg-muted/30 rounded-2xl p-4 sm:p-6 border backdrop-blur-sm  border-border/50 max-w-full sm:max-w-5xl mx-auto">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Stack & outils
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  J’utilise ces technos pour automatiser, développer et
                  structurer mes projets :
                </p>

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

                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 text-xs text-muted-foreground italic">
                  <span className="shrink-0">En cours :</span>
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

            {/* Contact Section */}
            <div

              className={`text-center space-y-8 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 backdrop-blur-sm " >
                <h2 className="text-3xl font-bold mb-4">On discute ?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Portfolio en travaux, mais moi je suis toujours dispo ! Que ce
                  soit pour parler tech, alternance, projets ou juste prendre
                  des nouvelles.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button className="gap-2" asChild>
                    <a href="mailto:yanis.amine.harrat@gmail.com">
                      <Mail className="w-4 h-4" />
                      yanis.amine.harrat@gmail.com
                    </a>
                  </Button>
                  <Button variant="outline" className="gap-2" asChild>
                    <a href="tel:+33603059829">
                      <Phone className="w-4 h-4" />
                      06.03.05.98.29
                    </a>
                  </Button>
                </div>

                {/* Bouton CV */}
                <div className="mb-8">
                  <Button
                    variant="default"
                    size="lg"
                    className="gap-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    asChild
                  >
                    <a
                      href="/cv-yanis-harrat.pdf"
                      download="CV-Yanis-Harrat.pdf"
                    >
                      <Download className="w-5 h-5" />
                      Récupérer mon CV
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF • Mise à jour récente
                  </p>
                </div>

                {/* CTA vers page contact */}
                <div className="bg-background/50  rounded-xl p-6 border border-border/50">
                  <h3 className="font-semibold mb-2">Ou en direct ?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    J&apos;ai déjà une page contact propre avec un formulaire
                    qui marche nickel !
                  </p>
                  <Button variant="outline" className="gap-2 group" asChild>
                    <Link href="/contact">
                      Voir la page contact
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              {/* Réseaux sociaux */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Mes réseaux</h3>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 bg-muted/30 hover:bg-muted/50 rounded-xl border border-border/50 hover:border-primary/30 transition-all transform hover:scale-105"
                      title={social.label}
                    >
                      <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ComingSoonPage;
