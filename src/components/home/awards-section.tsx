import Image from "next/image";

import { CERTIFICATIONS, type Certification } from "@/lib/profile";
import { cn } from "@/lib/utils";

import s from "./home.styles";
import { Laurel } from "./laurel";

function Award({ certification }: { certification: Certification }) {
  const { issuer, title, badge, verifyUrl } = certification;
  const body = (
    <>
      {badge ? (
        <Image src={badge} alt={`Badge officiel ${issuer}`} width={96} height={96} className={s.badge} />
      ) : null}
      <span className={cn(s.poster, s.issuer)}>{issuer}</span>
      <span className={s.certTitle}>{title}</span>
    </>
  );

  return (
    <li className={s.laurel} data-reveal="laurel">
      <Laurel />
      {verifyUrl ? (
        <a href={verifyUrl} target="_blank" rel="noopener noreferrer" className={s.laurelBody}>
          {body}
        </a>
      ) : (
        <div className={s.laurelBody}>{body}</div>
      )}
    </li>
  );
}

// Une couronne de laurier par certification. Sans badge fourni : organisme et intitulé.
export function AwardsSection() {
  return (
    <section aria-labelledby="awards-title" className={s.awards} data-reveal-group>
      <h2 id="awards-title" className={cn(s.label, s.awardsTitle)}>
        Certifications
      </h2>
      <ul className={s.laurels}>
        {CERTIFICATIONS.map((certification) => (
          <Award key={`${certification.issuer}-${certification.title}`} certification={certification} />
        ))}
      </ul>
    </section>
  );
}
