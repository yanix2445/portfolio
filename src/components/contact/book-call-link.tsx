"use client";

import { getCalApi } from "@calcom/embed-react";
import type { ComponentProps, MouseEvent } from "react";

import { BOOKING } from "@/lib/site";

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

// Le script de Cal.com n'est chargé qu'au premier survol, focus ou clic du bouton : aucune
// requête vers Cal.com tant que le visiteur ne s'y intéresse pas. Une seule fois par page.
let calApi: Promise<CalApi> | null = null;

function loadCal(): Promise<CalApi> {
  calApi ??= getCalApi({ namespace: BOOKING.namespace }).then((cal) => {
    // Les couleurs viennent du thème : rien n'est écrit en dur ici.
    const theme = getComputedStyle(document.documentElement);
    const brand = { "cal-brand": theme.getPropertyValue("--primary").trim() };
    cal("ui", {
      theme: "dark",
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: { light: brand, dark: brand },
    });
    return cal;
  });
  return calApi;
}

function warmUp() {
  // Un échec de chargement sera traité au clic, par le lien de secours.
  loadCal().catch(() => {});
}

// Lien vers la page de réservation Cal.com. Avec JavaScript, le calendrier s'ouvre dans une
// fenêtre par-dessus le site ; sans JavaScript, ou si Cal.com ne répond pas, la page Cal.com
// s'ouvre dans un nouvel onglet. Un clic avec Cmd, Ctrl ou Maj garde le comportement du lien.
export function BookCallLink({ children = BOOKING.label, ...props }: ComponentProps<"a">) {
  function open(event: MouseEvent<HTMLAnchorElement>) {
    props.onClick?.(event);
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    loadCal()
      .then((cal) =>
        cal("modal", {
          calLink: BOOKING.calLink,
          config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        }),
      )
      .catch(() => window.open(BOOKING.url, "_blank", "noopener"));
  }

  return (
    <a
      href={BOOKING.url}
      target="_blank"
      rel="noopener"
      {...props}
      onPointerEnter={(event) => {
        props.onPointerEnter?.(event);
        warmUp();
      }}
      onFocus={(event) => {
        props.onFocus?.(event);
        warmUp();
      }}
      onClick={open}
    >
      {children}
    </a>
  );
}
