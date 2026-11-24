import { useEffect, useState, type RefObject } from "react";

import { parseReason, readContactFields, type ContactFields, type ContactReason } from "@/lib/contact";

// Brouillon gardé dans l'onglet (sessionStorage) : il survit à un rechargement ou à un
// retour arrière, disparaît à la fermeture de l'onglet et ne quitte jamais le navigateur.
const DRAFT_KEY = "contact-draft";

// Les champs texte repris du brouillon au chargement.
const DRAFT_FIELDS = ["name", "email", "message"] as const;

type Draft = Partial<Pick<ContactFields, (typeof DRAFT_FIELDS)[number]>> & { reason?: string };

function readDraft(): Draft {
  try {
    return JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? "{}") as Draft;
  } catch {
    return {};
  }
}

function writeDraft(draft: Draft | null) {
  try {
    if (draft) sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    else sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // Stockage indisponible (navigation privée, refusé) : le formulaire marche sans.
  }
}

// Brouillon du formulaire de contact : le motif choisi, la longueur du message (pour le
// compteur) et leur sauvegarde dans l'onglet. Les champs texte restent non contrôlés.
export function useContactDraft(form: RefObject<HTMLFormElement | null>) {
  const [reason, setReason] = useState<ContactReason | "">("");
  const [messageLength, setMessageLength] = useState(0);

  // Au chargement : brouillon de l'onglet, puis motif de l'URL (`?motif=alternance`), prioritaire.
  // Ces deux sources n'existent que dans le navigateur : les lire au rendu ferait différer le
  // HTML prérendu et l'hydratation. On les applique donc une fois, juste après.
  useEffect(() => {
    const draft = readDraft();
    const elements = form.current?.elements;
    for (const name of DRAFT_FIELDS) {
      const control = elements?.namedItem(name);
      const value = draft[name];
      if (value && (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement)) {
        control.value = value;
      }
    }
    const initial =
      parseReason(new URLSearchParams(window.location.search).get("motif")) ?? parseReason(draft.reason);
    // Synchronisation unique avec le navigateur, après l'hydratation : voulue ici.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessageLength(draft.message?.length ?? 0);
    if (initial) setReason(initial);
  }, [form]);

  // `nextReason` : le motif vient de changer, le champ caché ne le porte pas encore.
  function save(nextReason?: ContactReason | "") {
    const current = form.current;
    if (!current) return;
    const fields = readContactFields(new FormData(current));
    setMessageLength(fields.message.length);
    writeDraft({
      name: fields.name,
      email: fields.email,
      message: fields.message,
      reason: nextReason ?? fields.reason,
    });
  }

  function chooseReason(value: string) {
    const next = parseReason(value) ?? "";
    setReason(next);
    save(next);
  }

  // React vide le formulaire après un envoi réussi : le brouillon et le motif suivent.
  function clearDraft() {
    writeDraft(null);
    setReason("");
    setMessageLength(0);
  }

  return { reason, messageLength, saveDraft: () => save(), chooseReason, clearDraft };
}
