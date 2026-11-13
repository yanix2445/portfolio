import { CertificationsSection } from "@/components/home/certifications-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { SkillsSection } from "@/components/home/skills-section";
import { TimelineSection } from "@/components/home/timeline-section";
import { WatchContactSection } from "@/components/home/watch-contact-section";
import { PersonJsonLd } from "@/components/seo/person-json-ld";

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <HeroSection />
      <SkillsSection />
      <CertificationsSection />
      <TimelineSection />
      <ProjectsSection />
      <WatchContactSection />
    </>
  );
}
