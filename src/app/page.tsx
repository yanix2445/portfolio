import type { Metadata } from "next";

import { ActsScroll } from "@/components/animations/acts-scroll";
import { HeroScroll } from "@/components/animations/hero-scroll";
import { Reveal } from "@/components/animations/reveal";
import { ActsSection } from "@/components/home/acts-section";
import { AwardsSection } from "@/components/home/awards-section";
import { BillSection } from "@/components/home/bill-section";
import { FinaleSection } from "@/components/home/finale-section";
import { HeroSection } from "@/components/home/hero-section";
import { SheetSection } from "@/components/home/sheet-section";
import { JsonLd } from "@/components/seo/json-ld";
import { profileGraph } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Les sections sont rendues côté serveur ; la mise en scène est ajoutée par des enveloppes client.
export default function HomePage() {
  return (
    <>
      <JsonLd data={profileGraph()} />
      <HeroScroll>
        <HeroSection />
      </HeroScroll>
      <ActsScroll>
        <ActsSection />
      </ActsScroll>
      <Reveal>
        <BillSection />
        <SheetSection />
        <AwardsSection />
        <FinaleSection />
      </Reveal>
    </>
  );
}
