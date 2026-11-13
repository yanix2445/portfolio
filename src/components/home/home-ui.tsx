import { ArrowDownToLine, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { CV_PATH } from "@/components/layout/site-header";
import { CONTACT } from "@/lib/site";
import { cn } from "@/lib/utils";

/** La voix humaine : serif italique, glissée dans un titre grotesque. */
export function Voice({ children }: { children: ReactNode }) {
  return (
    <span className="font-serif font-medium tracking-[-0.015em] italic [font-stretch:100%]">
      {children}
    </span>
  );
}

/** Titre de section : grotesque serrée, même échelle partout. */
export function SectionTitle({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      className={cn(
        "text-[clamp(2.125rem,5vw,3.75rem)] leading-[0.98] font-[720] tracking-[-0.032em] text-balance text-bone [font-stretch:84%]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

const ACTION =
  "inline-flex min-h-13 items-center justify-center gap-2.5 rounded-md px-6 text-base font-semibold transition-colors duration-150 ease-out";

/** L'action principale du site : appeler. Seul aplat tungstène de la page. */
export function CallAction({ className }: { className?: string }) {
  return (
    <a
      href={`tel:${CONTACT.phoneE164}`}
      className={cn(ACTION, "bg-tungsten text-tungsten-ink hover:bg-[#f8c88c]", className)}
    >
      <Phone aria-hidden className="size-[1.1rem]" strokeWidth={2} />
      <span>
        Appeler · <span className="tabular-nums">{CONTACT.phone}</span>
      </span>
    </a>
  );
}

export function CvAction({ className }: { className?: string }) {
  return (
    <a
      href={CV_PATH}
      target="_blank"
      rel="noopener"
      className={cn(ACTION, "border border-rule-strong text-bone hover:border-bone/60", className)}
    >
      CV (PDF)
      <ArrowDownToLine aria-hidden className="size-[1.05rem] text-ash" strokeWidth={1.75} />
    </a>
  );
}

export function MailAction({ className }: { className?: string }) {
  return (
    <a
      href={`mailto:${CONTACT.email}`}
      className={cn(ACTION, "border border-rule-strong text-bone hover:border-bone/60", className)}
    >
      Écrire un e-mail
    </a>
  );
}
