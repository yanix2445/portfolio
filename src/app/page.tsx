import { CloseSection } from "@/components/home/close-section";
import { DemoSection } from "@/components/home/demo-section";
import { FiguresSection } from "@/components/home/figures-section";
import { HeroSection } from "@/components/home/hero-section";
import { PathSection } from "@/components/home/path-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { SkillsSection } from "@/components/home/skills-section";
import { PersonJsonLd } from "@/components/seo/person-json-ld";

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <HeroSection />
      <DemoSection />
      <FiguresSection />
      <SkillsSection />
      <PathSection />
      <ProjectsSection />
      <CloseSection />
    </>
  );
}
