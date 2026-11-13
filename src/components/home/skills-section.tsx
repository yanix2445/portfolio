import { SectionTitle, Voice } from "@/components/home/home-ui";
import { CERTIFICATIONS, SKILL_GROUPS } from "@/lib/profile";

// Index typographique : un groupe par ligne, les outils en texte courant, sans badges.
export function SkillsSection() {
  return (
    <section aria-labelledby="skills-title" className="border-t border-rule">
      <div className="page-container py-20 sm:py-28 lg:py-32">
        <SectionTitle id="skills-title" className="max-w-[18ch]">
          Ce que je sais <Voice>faire tourner.</Voice>
        </SectionTitle>

        <dl className="mt-14 border-t border-rule sm:mt-20">
          {SKILL_GROUPS.map(({ title, items }) => (
            <div
              key={title}
              className="grid gap-2 border-b border-rule py-6 sm:py-7 lg:grid-cols-12 lg:gap-x-12"
            >
              <dt className="font-serif text-[1.375rem] leading-tight font-medium text-bone italic lg:col-span-4">
                {title}
              </dt>
              <dd className="lg:col-span-8">
                <ul className="flex flex-wrap gap-x-2 text-lg/relaxed text-bone sm:text-xl/relaxed [&>li:not(:last-child)]:after:ml-2 [&>li:not(:last-child)]:after:text-ash [&>li:not(:last-child)]:after:content-['·']">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 grid gap-6 lg:grid-cols-12 lg:gap-x-12">
          <h3 className="text-2xl font-[680] tracking-[-0.02em] text-bone [font-stretch:88%] lg:col-span-4">
            Certifications
          </h3>
          <ul className="border-t border-rule lg:col-span-8">
            {CERTIFICATIONS.map(({ issuer, title }) => (
              <li
                key={title}
                className="grid grid-cols-[6.5rem_1fr] gap-x-6 border-b border-rule py-4 text-base sm:grid-cols-[9rem_1fr] sm:text-lg"
              >
                <span className="text-ash">{issuer}</span>
                <span className="text-bone">{title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
