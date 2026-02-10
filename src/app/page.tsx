import { Header } from "@/components/layout/Header";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { Hero } from "@/components/sections/Hero";
import { Summary } from "@/components/sections/Summary";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { SchoolProjects } from "@/components/sections/SchoolProjects";
import { Links } from "@/components/sections/Links";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#CC9400] selection:text-black">
      <Header />

      <main className="flex flex-col">
        <Hero />
        <Summary />
        <Experience />
        <SchoolProjects />
        <Skills />
        <Links />
      </main>

      <Footer />
      <FloatingNav />
    </div>
  );
}
