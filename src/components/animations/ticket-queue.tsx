"use client";

import { Check, Pause, Play } from "lucide-react";
import { useEffect, useReducer, useRef, useState, useSyncExternalStore, type FocusEvent } from "react";

import { cn } from "@/lib/utils";

/*
 * Démo « exemple » : une file de support N1/N2 qui se traite toute seule.
 * Les tickets sont fictifs, inspirés des environnements du CV (AD, Microsoft 365, GPO, réseau).
 * Pas de librairie : chaque ligne est positionnée par transform, la boucle est un setInterval
 * qui ne tourne que si la file est à l'écran, non survolée, non focalisée et sans mouvement réduit.
 */

type Status = "nouveau" | "qualifie" | "en-cours" | "resolu";

type Ticket = {
  id: number;
  status: Status;
  resolvedAt?: number;
};

type QueueState = {
  tickets: Ticket[];
  nextId: number;
  clock: number;
  resolvedHere: number;
  enteringId: number | null;
};

const POOL = [
  { title: "Compte AD verrouillé après un changement de mot de passe", category: "Active Directory", level: "N1" },
  { title: "Boîte partagée absente d'Outlook", category: "Microsoft 365", level: "N1" },
  { title: "Nouvel arrivant : compte, licence et poste Intune", category: "Onboarding", level: "N2" },
  { title: "Imprimante réseau introuvable sur un poste Windows", category: "Poste de travail", level: "N1" },
  { title: "Lecteur réseau absent : GPO non appliquée", category: "GPO", level: "N2" },
  { title: "VPN : échec d'authentification en télétravail", category: "Réseau", level: "N2" },
  { title: "Teams ne détecte plus le micro", category: "Microsoft 365", level: "N1" },
  { title: "Partage DFS inaccessible pour un service", category: "Réseau", level: "N2" },
] as const;

const NEXT_STATUS: Record<Status, Status> = {
  nouveau: "qualifie",
  qualifie: "en-cours",
  "en-cours": "resolu",
  resolu: "resolu",
};

const VISIBLE_ROWS = 5;
const STEP_MS = 1400;
const FIRST_ID = 2041;

// 9 h 12 : l'heure du titre de la section. L'horloge avance de quelques minutes par étape.
const INITIAL_STATE: QueueState = {
  tickets: [
    { id: 2045, status: "nouveau" },
    { id: 2044, status: "qualifie" },
    { id: 2043, status: "en-cours" },
    { id: 2042, status: "resolu", resolvedAt: 9 * 60 + 19 },
    { id: 2041, status: "resolu", resolvedAt: 9 * 60 + 14 },
  ],
  nextId: 2046,
  clock: 9 * 60 + 21,
  resolvedHere: 0,
  enteringId: null,
};

function ticketInfo(id: number) {
  return POOL[(id - FIRST_ID) % POOL.length];
}

function formatClock(minutes: number) {
  const hours = Math.floor(minutes / 60) % 24;
  return `${String(hours).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function reducer(state: QueueState, action: "step" | "settle"): QueueState {
  if (action === "settle") return { ...state, enteringId: null };

  // On traite toujours le plus ancien ticket ouvert (le plus bas de la file).
  const index = state.tickets.findLastIndex((ticket) => ticket.status !== "resolu");
  if (index === -1) return state;

  const clock = state.clock + 2 + (state.nextId % 3);
  const status = NEXT_STATUS[state.tickets[index].status];
  const tickets = state.tickets.map((ticket, i) =>
    i === index ? { ...ticket, status, resolvedAt: status === "resolu" ? clock : undefined } : ticket,
  );

  if (status !== "resolu") return { ...state, tickets, clock };

  // Un ticket résolu en appelle un nouveau en haut ; la ligne du bas sort par le bas puis disparaît.
  return {
    tickets: [{ id: state.nextId, status: "nouveau" } satisfies Ticket, ...tickets].slice(0, VISIBLE_ROWS + 1),
    nextId: state.nextId + 1,
    clock,
    resolvedHere: state.resolvedHere + 1,
    enteringId: state.nextId,
  };
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

const noopSubscribe = () => () => {};

function StatusCell({ ticket }: { ticket: Ticket }) {
  switch (ticket.status) {
    case "nouveau":
      return (
        <span className="flex items-center gap-2 text-ash">
          <span aria-hidden className="size-2 rounded-full border border-ash" />À qualifier
        </span>
      );
    case "qualifie":
      return (
        <span className="flex items-center gap-2 text-ash">
          <span aria-hidden className="size-2 rounded-full bg-ash" />
          Qualifié
        </span>
      );
    case "en-cours":
      return (
        <span className="flex items-center gap-2 text-bone">
          <span aria-hidden className="size-2 rounded-full bg-tungsten" />
          En cours
        </span>
      );
    case "resolu":
      return (
        <span className="flex items-center gap-1.5 text-bone">
          <Check aria-hidden className="size-3.5" strokeWidth={2.25} />
          Résolu
          <span className="pixel ml-1 text-[11px] text-ash">{formatClock(ticket.resolvedAt ?? 0)}</span>
        </span>
      );
  }
}

export function TicketQueue() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const panelRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => true,
  );
  const pageHidden = useSyncExternalStore(subscribeVisibility, () => document.hidden, () => true);
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const [onScreen, setOnScreen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  // « Lecture » pressé pendant un survol ou un focus : la démo tourne quand même.
  const [forcePlay, setForcePlay] = useState(false);

  const interrupted = (hovered || focused) && !forcePlay;
  const running = hydrated && !reducedMotion && !pageHidden && onScreen && !userPaused && !interrupted;

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.01,
    });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => dispatch("step"), STEP_MS);
    return () => window.clearInterval(timer);
  }, [running]);

  // Le nouveau ticket est posé au-dessus de la file, puis glisse à sa place à l'image suivante.
  useEffect(() => {
    if (state.enteringId === null) return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => dispatch("settle")));
    return () => cancelAnimationFrame(frame);
  }, [state.enteringId]);

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setFocused(false);
    if (!hovered) setForcePlay(false);
  }

  function handlePointerLeave() {
    setHovered(false);
    if (!focused) setForcePlay(false);
  }

  function toggle() {
    if (running) {
      setUserPaused(true);
      setForcePlay(false);
    } else {
      setUserPaused(false);
      setForcePlay(true);
    }
  }

  return (
    <div
      ref={panelRef}
      data-ticket-queue
      data-state={running ? "running" : "paused"}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={handlePointerLeave}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
      className="overflow-hidden rounded-md border border-rule bg-raised"
    >
      <div className="flex min-h-13 items-center justify-between gap-3 border-b border-rule px-4 sm:px-5">
        <p className="flex items-center gap-3 text-sm">
          <span className="font-semibold text-bone">File de support</span>
          <span className="rounded-sm border border-rule-strong px-1.5 py-0.5 text-xs text-ash">exemple</span>
        </p>
        {hydrated && !reducedMotion ? (
          <button
            type="button"
            onClick={toggle}
            className="-mr-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ash transition-colors duration-150 hover:text-bone"
          >
            <span aria-hidden className={cn("size-2 rounded-full", running ? "bg-tungsten" : "border border-ash")} />
            <span className="w-[4.25rem] text-left">{running ? "En direct" : "En pause"}</span>
            {running ? (
              <Pause aria-hidden className="size-4" strokeWidth={1.75} />
            ) : (
              <Play aria-hidden className="size-4" strokeWidth={1.75} />
            )}
            <span className="sr-only">{running ? " : mettre la démo en pause" : " : relancer la démo"}</span>
          </button>
        ) : null}
      </div>

      {/* Mobile : quatre lignes hautes, titre sur deux lignes et statut sur la ligne méta. Desktop : cinq lignes. */}
      <ol
        aria-label="Tickets d'exemple"
        className="relative h-[calc(var(--row)*4)] overflow-hidden [--row:5.75rem] sm:h-[calc(var(--row)*5)] sm:[--row:4.25rem]"
      >
        {state.tickets.map((ticket, index) => {
          const info = ticketInfo(ticket.id);
          const entering = ticket.id === state.enteringId;
          const qualified = ticket.status !== "nouveau";
          return (
            <li
              key={ticket.id}
              data-status={ticket.status}
              aria-hidden={index >= VISIBLE_ROWS || undefined}
              style={{ transform: `translateY(${(entering ? -1 : index) * 100}%)` }}
              className={cn(
                "absolute inset-x-0 top-0 grid h-(--row) content-center items-center gap-x-4 gap-y-1.5 border-b border-rule px-4 sm:px-5",
                "grid-cols-[minmax(0,1fr)_auto] [grid-template-areas:'title_title'_'meta_status']",
                "sm:grid-cols-[4.75rem_minmax(0,1fr)_8.5rem] sm:gap-y-1 sm:[grid-template-areas:'id_title_status'_'id_meta_status']",
                "motion-safe:transition-[transform,opacity] motion-safe:duration-700 motion-safe:ease-out-expo",
                (entering || index >= VISIBLE_ROWS) && "opacity-0",
              )}
            >
              <span className="pixel hidden text-[11px] text-ash [grid-area:id] sm:block">INC-{ticket.id}</span>
              <span className="line-clamp-2 text-[0.9375rem]/snug text-bone [grid-area:title] sm:line-clamp-none sm:truncate">
                {info.title}
              </span>
              <span className="flex min-w-0 items-center gap-2 text-[0.8125rem] whitespace-nowrap text-ash [grid-area:meta]">
                <span className="pixel shrink-0 text-[11px] sm:hidden">INC-{ticket.id}</span>
                {qualified ? (
                  <>
                    <span className="pixel shrink-0 text-[11px]">{info.level}</span>
                    <span className="truncate">{info.category}</span>
                  </>
                ) : (
                  <span>à qualifier</span>
                )}
              </span>
              <span className="text-[0.8125rem] [grid-area:status] sm:text-sm">
                <StatusCell ticket={ticket} />
              </span>
            </li>
          );
        })}
      </ol>

      <p className="flex min-h-12 flex-col justify-center gap-1 border-t border-rule px-4 py-3 text-[0.8125rem] text-ash sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-0">
        <span>{reducedMotion && hydrated ? "Démo figée : mouvement réduit." : "Tickets fictifs, environnements réels."}</span>
        {state.resolvedHere > 0 ? (
          <span>
            <span className="pixel text-bone">{state.resolvedHere}</span> résolu{state.resolvedHere > 1 ? "s" : ""} depuis
            votre arrivée
          </span>
        ) : null}
      </p>
    </div>
  );
}
