import { TicketQueue } from "@/components/animations/ticket-queue";
import { HELPDESK_MONTHS_WORD } from "@/components/home/facts";
import { SectionTitle, Voice } from "@/components/home/home-ui";

// La file dépasse du premier écran : le haut du panneau est visible avant de défiler.
export function DemoSection() {
  return (
    <section
      aria-labelledby="demo-title"
      className="page-container grid gap-10 pb-24 sm:pb-32 lg:grid-cols-12 lg:gap-x-12 lg:pb-40"
    >
      <div className="lg:order-2 lg:col-span-7">
        <TicketQueue />
      </div>
      <div className="lg:order-1 lg:col-span-5 lg:pt-28">
        <SectionTitle id="demo-title">
          Lundi, 9&nbsp;h&nbsp;12&nbsp;: <Voice>je prends la file.</Voice>
        </SectionTitle>
        <p className="mt-6 max-w-[34rem] text-lg/relaxed text-ash">
          Qualifier, résoudre, noter l&apos;heure&nbsp;: {HELPDESK_MONTHS_WORD.toLowerCase()} mois de ce travail en
          production. Cette file le rejoue avec des tickets d&apos;exemple, dans les outils que j&apos;ai
          administrés.
        </p>
      </div>
    </section>
  );
}
