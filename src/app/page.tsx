'use cache'

import { Header } from "@/components/layout/Header";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { Hero } from "@/components/sections/Hero";
import { Summary } from "@/components/sections/Summary";
import { Footer } from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const Experience = dynamic(() => import("@/components/sections/Experience").then(mod => mod.Experience));
const SchoolProjects = dynamic(() => import("@/components/sections/SchoolProjects").then(mod => mod.SchoolProjects));
const Skills = dynamic(() => import("@/components/sections/Skills").then(mod => mod.Skills));
const Links = dynamic(() => import("@/components/sections/Links").then(mod => mod.Links));

export default async function Home() {
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
