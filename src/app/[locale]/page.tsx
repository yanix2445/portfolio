import React, { Suspense } from "react";
import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { Experience, getExperience } from "@/features/experience";
import { SchoolProjects, PersonalProjects, getSchoolProjects, getPersonalProjects } from "@/features/projects";
import { Skills, getSkillsData } from "@/features/skills";
import { Contact } from "@/features/contact";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Parallel data fetching with locale
  const [jobs, skillsData, schoolProjects, personalProjects] = await Promise.all([
    getExperience(locale),
    getSkillsData(locale),
    getSchoolProjects(),
    getPersonalProjects()
  ]);

  return (
    <main className="relative bg-[#050505] text-white overflow-hidden selection:bg-[#CC9400] selection:text-black">
      {/* Header with Open to Work + Download CV + Language Toggle */}
      <Header />

      {/* Navigation Flottante (Client) */}
      <FloatingNav />

      {/* Hero Section (Server - Fast Shell) */}
      <Hero />

      {/* About / Summary Section (Server) */}
      <About />

      {/* Heavy Sections wrapped in Suspense for PPR streaming */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-white/20">...</div>}>
        <Experience jobs={jobs} />
      </Suspense>

      <Suspense fallback={<div className="h-96 flex items-center justify-center text-white/20">...</div>}>
        <SchoolProjects projects={schoolProjects} />
      </Suspense>

      <Suspense fallback={<div className="h-96 flex items-center justify-center text-white/20">...</div>}>
        <PersonalProjects projects={personalProjects} />
      </Suspense>

      <Suspense fallback={<div className="h-96 flex items-center justify-center text-white/20">...</div>}>
        <Skills
          categories={skillsData.categories}
          languages={skillsData.languages}
          education={skillsData.education}
        />
      </Suspense>

      <Suspense fallback={<div className="h-40 flex items-center justify-center text-white/20">...</div>}>
        <Contact />
      </Suspense>

      {/* Footer */}
      <Footer />
    </main>
  );
}
