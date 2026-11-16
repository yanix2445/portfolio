import Image from "next/image";

import { CERTIFICATIONS, type Certification } from "@/lib/profile";

import { Laurel } from "./laurel";

const BODY = "relative grid w-[52%] justify-items-center";

// Le texte se dimensionne sur la couronne (`@container`, `text-wreath`) : il ne touche jamais les feuilles.
function Award({ certification }: { certification: Certification }) {
  const { issuer, title, badge, verifyUrl } = certification;
  const body = (
    <>
      {badge ? (
        <Image
          src={badge}
          alt={`Badge officiel ${issuer}`}
          width={96}
          height={96}
          className="mb-[1vh] h-auto w-[34%]"
        />
      ) : null}
      <span className="font-display text-wreath uppercase">{issuer}</span>
      <span className="mt-[1.1vh] text-caption text-soft">{title}</span>
    </>
  );

  return (
    <li
      className="@container relative grid aspect-[1.08] shrink-0 grow-0 basis-[calc((100%-1vw)/2)] place-items-center text-center md:basis-[calc((100%-3vw)/4)]"
      data-reveal="laurel"
    >
      <Laurel className="absolute inset-0 size-full text-foreground opacity-90" />
      {verifyUrl ? (
        <a href={verifyUrl} target="_blank" rel="noopener noreferrer" className={BODY} data-laurel-body>
          {body}
        </a>
      ) : (
        <div className={BODY} data-laurel-body>
          {body}
        </div>
      )}
    </li>
  );
}

// Une couronne de laurier par certification. Sans badge fourni : organisme et intitulé.
export function AwardsSection() {
  return (
    <section
      aria-labelledby="awards-title"
      className="px-gutter pt-8 pb-20 md:pt-[4vh] md:pb-[16vh]"
      data-reveal-group
    >
      <h2 id="awards-title" className="type-label mb-[5vh] text-center text-primary">
        Certifications
      </h2>
      <ul className="flex flex-wrap justify-center gap-x-[1vw] gap-y-[2vh]">
        {CERTIFICATIONS.map((certification) => (
          <Award key={`${certification.issuer}-${certification.title}`} certification={certification} />
        ))}
      </ul>
    </section>
  );
}
