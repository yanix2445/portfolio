import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { flushSync } from "react-dom";
import { toast } from "sonner";

import { CONTACT_MESSAGES } from "@/lib/contact";

// Le widget est invisible tant que Cloudflare n'a pas besoin d'une interaction. S'il faut
// cliquer, on laisse ce temps au visiteur avant d'abandonner l'envoi.
const CHALLENGE_TIMEOUT_MS = 20_000;

// Attente du jeton Turnstile. Un envoi parti avant le jeton est retenu, puis repart tout
// seul dès que le jeton arrive. `widget` se branche sur le composant `<Turnstile>`.
export function useTurnstileGate(form: RefObject<HTMLFormElement | null>) {
  const [waiting, setWaiting] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);
  const turnstile = useRef<TurnstileInstance>(null);
  const challengeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Fin de l'attente du jeton : on envoie s'il est arrivé, sinon on le dit.
  function stopWaiting(submit: boolean) {
    clearTimeout(challengeTimer.current);
    // Appliqué tout de suite : sinon `handleSubmit`, appelé par `requestSubmit`, verrait
    // encore l'attente en cours et annulerait l'envoi.
    flushSync(() => setWaiting(false));
    if (submit) form.current?.requestSubmit();
    else toast.error(CONTACT_MESSAGES.challenge);
  }

  useEffect(() => () => clearTimeout(challengeTimer.current), []);

  // L'envoi n'a pas de jeton : on l'attend, sauf si le widget n'a pas pu se charger.
  function waitForToken() {
    // Widget absent (script bloqué ou en échec) : inutile d'attendre.
    if (!widgetReady) {
      toast.error(CONTACT_MESSAGES.challenge);
      return;
    }
    // Le jeton arrive d'habitude en une seconde : on l'attend, puis on envoie tout seul.
    setWaiting(true);
    challengeTimer.current = setTimeout(() => stopWaiting(false), CHALLENGE_TIMEOUT_MS);
  }

  // Un jeton Turnstile ne sert qu'une fois : le widget repart à zéro après chaque envoi.
  const resetWidget = useCallback(() => turnstile.current?.reset(), []);

  const widget = {
    ref: turnstile,
    onWidgetLoad: () => setWidgetReady(true),
    onSuccess: () => {
      if (waiting) stopWaiting(true);
    },
    onError: () => {
      if (waiting) stopWaiting(false);
    },
  };

  return { waiting, waitForToken, resetWidget, widget };
}
