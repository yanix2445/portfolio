import { SectionTitle } from "@/components/home/home-ui";
import { CERTIFICATIONS, SKILL_GROUPS } from "@/lib/profile";

const CERTIFICATIONS_BY_ISSUER = Object.entries(
  Object.groupBy(CERTIFICATIONS, ({ issuer }) => issuer),
).map(([issuer, entries]) => ({ issuer, titles: (entries ?? []).map(({ title }) => title) }));

// Un bloc de texte courant, dense, au lieu d'un tableau : le groupe en gris, les outils en os.
export function SkillsSection() {
  return (
    <section aria-labelledby="skills-title" className="border-t border-rule">
      <div className="page-container py-20 sm:py-28 lg:py-32">
        <SectionTitle id="skills-title">Ce que je sais faire tourner.</SectionTitle>

        <dl className="mt-12 max-w-[68rem] text-[1.375rem]/[1.45] text-bone sm:mt-16 sm:text-[1.75rem]/[1.4] lg:text-[2rem]/[1.38]">
          {SKILL_GROUPS.map(({ title, items }) => (
            // Mobile : un groupe par paragraphe. Desktop : texte courant.
            // Un nom d'un seul mot (DFS-N, TCP/IP) ne se coupe jamais ; les noms composés passent à la ligne entre leurs mots.
            <div key={title} className="mb-5 block last:mb-0 sm:mb-0 sm:inline">
              <dt className="inline font-medium text-ash">{title}&nbsp;: </dt>
              <dd className="inline tracking-[-0.01em]">
                {items.map((item, index) => (
                  <span key={item}>
                    <span className={item.includes(" ") ? undefined : "whitespace-nowrap"}>{item}</span>
                    {index < items.length - 1 ? ", " : ". "}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 border-t border-rule pt-8 sm:mt-28">
          <h3 className="text-lg font-semibold text-bone">
            Certifications <span className="font-normal text-ash">· {CERTIFICATIONS.length}</span>
          </h3>
          <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {CERTIFICATIONS_BY_ISSUER.map(({ issuer, titles }) => (
              <div key={issuer}>
                <dt className="text-sm text-ash">{issuer}</dt>
                {titles.map((title) => (
                  <dd key={title} className="mt-2 text-base/snug text-bone">
                    {title}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
