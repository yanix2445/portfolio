import Link from "next/link";

import { CallAction, CvAction, MailAction, Voice } from "@/components/home/home-ui";
import { HERO } from "@/lib/profile";
import { CONTACT } from "@/lib/site";

const LINK =
  "rounded-sm text-bone underline decoration-rule-strong underline-offset-[0.3em] transition-colors duration-150 hover:decoration-bone";

// Clôture : la page se termine sur l'appel, en écho au titre.
export function CloseSection() {
  return (
    <section aria-labelledby="close-title" className="border-t border-rule">
      <div className="page-container py-28 sm:py-36 lg:py-48">
        <h2
          id="close-title"
          className="text-[clamp(2.75rem,10vw,7rem)] leading-[0.92] font-[760] tracking-[-0.04em] text-bone [font-stretch:80%]"
        >
          On en parle <Voice>lundi&#8239;?</Voice>
        </h2>
        <p className="mt-8 max-w-[38rem] text-lg/relaxed text-ash sm:text-xl/relaxed">
          Je cherche une alternance de {HERO.role.toLowerCase()}, {HERO.rhythm}, à {HERO.location.split(",")[0]}. Un appel
          suffit pour commencer.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <CallAction />
          <MailAction />
          <CvAction />
        </div>
        <p className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-base">
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer me" className={LINK}>
            LinkedIn
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer me" className={LINK}>
            GitHub
          </a>
          <Link href="/veille" className={LINK}>
            Veille technologique
          </Link>
        </p>
      </div>
    </section>
  );
}
