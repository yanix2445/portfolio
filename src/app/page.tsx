import { ActsSection } from "@/components/home/acts-section";
import { AwardsSection } from "@/components/home/awards-section";
import { BillSection } from "@/components/home/bill-section";
import { FinaleSection } from "@/components/home/finale-section";
import { HeroSection } from "@/components/home/hero-section";
import { SheetSection } from "@/components/home/sheet-section";
import { PersonJsonLd } from "@/components/seo/person-json-ld";

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <HeroSection />
      <ActsSection />
      <BillSection />
      <SheetSection />
      <AwardsSection />
      <FinaleSection />
    </>
  );
}
