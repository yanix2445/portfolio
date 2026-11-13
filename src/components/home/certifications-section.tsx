import { Marquee } from "@/components/animations/marquee";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { CONTAINER, SectionHeading } from "@/components/home/section-heading";
import { CERTIFICATIONS } from "@/lib/profile";

function CertificationBadges() {
  return CERTIFICATIONS.map((certification) => (
    <li
      key={`${certification.issuer}-${certification.title}`}
      className="flex max-w-full shrink-0 items-center gap-3 whitespace-nowrap motion-reduce:whitespace-normal rounded-full border border-white/10 bg-white/[0.04] py-3 pr-6 pl-3"
    >
      <span className="rounded-full bg-brand/15 px-2.5 py-1 font-mono text-[11px] tracking-[0.15em] text-brand uppercase">
        {certification.issuer}
      </span>
      <span className="text-base font-medium md:text-lg">{certification.title}</span>
    </li>
  ));
}

export function CertificationsSection() {
  return (
    <section aria-labelledby="certifications-title" className="overflow-x-clip py-24 md:py-36">
      <ScrollReveal>
        <div className={CONTAINER}>
          <SectionHeading
            id="certifications-title"
            index="02"
            title="Certifications"
            lead="Cybersécurité, support IT, analyse de risque et IA."
          />
        </div>

        <div data-reveal className="mt-14">
          <Marquee label="Certifications obtenues" className="[--marquee-duration:45s]">
            <CertificationBadges />
          </Marquee>
        </div>
      </ScrollReveal>
    </section>
  );
}
