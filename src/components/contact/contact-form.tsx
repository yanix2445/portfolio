"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { sendContact } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  CONTACT_LIMITS,
  CONTACT_MESSAGES,
  CONTACT_REASONS,
  HONEYPOT_FIELD,
  MESSAGE_COUNTER_FROM,
  TURNSTILE_FIELD,
  readContactFields,
  validateContact,
  type ContactErrors,
  type ContactFields,
  type ContactResult,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

import { useContactDraft } from "./use-contact-draft";
import { useTurnstileGate } from "./use-turnstile-gate";

// Les champs texte, dans l'ordre de la page : le focus va au premier en erreur.
const TEXT_FIELDS = ["name", "email", "message"] as const;

// La Server Action ne lève jamais. Si l'appel lui-même échoue (réseau coupé, ou envoi
// bloqué par la limite par adresse IP du pare-feu), on rend une erreur au lieu de planter.
async function submitContact(previous: ContactResult | null, data: FormData): Promise<ContactResult> {
  try {
    return await sendContact(previous, data);
  } catch {
    return { status: "error", message: CONTACT_MESSAGES.failure, fields: readContactFields(data) };
  }
}

function focusFirstInvalid(form: HTMLFormElement | null, errors: ContactErrors) {
  const first = TEXT_FIELDS.find((field) => errors[field]);
  const control = first ? form?.elements.namedItem(first) : null;
  if (control instanceof HTMLElement) control.focus();
}

// Formulaire de contact. Les champs sont validés ici pour répondre tout de suite, puis
// revalidés par la Server Action, qui vérifie le jeton Turnstile avant tout envoi.
export function ContactForm({ siteKey }: { siteKey: string }) {
  const form = useRef<HTMLFormElement>(null);
  const { reason, messageLength, saveDraft, chooseReason, clearDraft } = useContactDraft(form);
  const { waiting, waitForToken, resetWidget, widget } = useTurnstileGate(form);
  const [state, formAction, pending] = useActionState(
    async (previous: ContactResult | null, data: FormData) => {
      const result = await submitContact(previous, data);
      if (result.status === "success") clearDraft();
      return result;
    },
    null,
  );
  const [clientErrors, setClientErrors] = useState<ContactErrors | null>(null);
  const busy = pending || waiting;

  useEffect(() => {
    if (!state) return;
    resetWidget();
    if (state.status === "success") {
      toast.success(state.message);
    } else {
      toast.error(state.message);
      if (state.errors) focusFirstInvalid(form.current, state.errors);
    }
  }, [state, resetWidget]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Le bouton reste focalisable pendant l'envoi (`aria-disabled`) : on refuse ici le double envoi.
    if (busy) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    const errors = validateContact(readContactFields(data));
    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      setClientErrors(errors);
      focusFirstInvalid(event.currentTarget, errors);
      return;
    }
    setClientErrors(null);
    if (!data.get(TURNSTILE_FIELD)) {
      event.preventDefault();
      waitForToken();
    }
  }

  const failed = state?.status === "error" ? state : null;
  const errors = clientErrors ?? failed?.errors ?? {};
  const describedBy = (field: keyof ContactFields) => (errors[field] ? `${field}-error` : undefined);
  // Le compteur n'apparaît qu'à l'approche de la limite ; il est lu avec le champ, sans
  // être annoncé à chaque frappe.
  const showCounter = messageLength >= CONTACT_LIMITS.message * MESSAGE_COUNTER_FROM;
  const messageDescription =
    [describedBy("message"), showCounter ? "message-counter" : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <form ref={form} action={formAction} onSubmit={handleSubmit} onInput={saveDraft} noValidate>
      {/* Le formulaire est un billet de cinéma : les champs à gauche, le talon orange à
          droite (en bas sur téléphone), qui est le bouton d'envoi. */}
      <div
        className="relative grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-[minmax(0,1fr)_7rem]"
        data-contact-ticket
      >
        {/* Encoches de part et d'autre de la perforation. */}
        <span aria-hidden className="absolute -top-2.5 right-[calc(7rem-0.625rem)] size-5 rounded-full border border-border bg-background max-md:hidden" />
        <span aria-hidden className="absolute right-[calc(7rem-0.625rem)] -bottom-2.5 size-5 rounded-full border border-border bg-background max-md:hidden" />

        <FieldGroup className="gap-3 px-4 py-3.5 md:gap-5 md:p-6">
          {/* Nom et e-mail côte à côte, même sur téléphone : la page tient en un écran. */}
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="name" className="type-label text-muted-foreground">
                Nom
              </FieldLabel>
              <Input
                id="name"
                name="name"
                variant="line"
                autoComplete="name"
                required
                maxLength={CONTACT_LIMITS.name}
                defaultValue={failed?.fields?.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={describedBy("name")}
              />
              {errors.name ? <FieldError id="name-error">{errors.name}</FieldError> : null}
            </Field>

            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor="email" className="type-label text-muted-foreground">
                E-mail
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="line"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                required
                maxLength={CONTACT_LIMITS.email}
                defaultValue={failed?.fields?.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy("email")}
              />
              {errors.email ? <FieldError id="email-error">{errors.email}</FieldError> : null}
            </Field>
          </div>

          <Field data-invalid={Boolean(errors.message)}>
            {/* Le motif, facultatif, partage la ligne du libellé : la page tient en un écran.
                Il apparaît dans l'objet de la notification. */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <FieldLabel htmlFor="message" className="type-label text-muted-foreground">
                Message
              </FieldLabel>
              {/* Boutons plus bas que les filtres du catalogue, et marges négatives : la ligne
                  garde la hauteur du libellé. */}
              <div className="-my-1.5 flex items-center gap-3">
                <span id="reason-label" className="type-label text-muted-foreground max-md:sr-only">
                  Motif
                </span>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  size="label"
                  aria-labelledby="reason-label"
                  value={reason}
                  onValueChange={chooseReason}
                  data-contact-reason
                >
                  {CONTACT_REASONS.map(({ value, label }) => (
                    <ToggleGroupItem key={value} value={value} className="px-3 py-1.5">
                      {label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <input type="hidden" name="reason" value={reason} />
              </div>
            </div>
            <Textarea
              id="message"
              name="message"
              variant="line"
              required
              minLength={CONTACT_LIMITS.messageMin}
              maxLength={CONTACT_LIMITS.message}
              defaultValue={failed?.fields?.message}
              className="max-h-[30svh] min-h-12 md:min-h-[12svh]"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={messageDescription}
            />
            {errors.message ? <FieldError id="message-error">{errors.message}</FieldError> : null}
            {showCounter ? (
              <p id="message-counter" className="type-label text-muted-foreground" data-message-counter>
                {messageLength} / {CONTACT_LIMITS.message} caractères
              </p>
            ) : null}
          </Field>

          {/* Champ piège : hors de l'écran, ignoré au clavier et par les lecteurs d'écran.
              Seul un robot le remplit ; le serveur fait alors semblant d'avoir envoyé. */}
          <div aria-hidden className="sr-only" data-honeypot>
            <label htmlFor={HONEYPOT_FIELD}>Laissez ce champ vide</label>
            <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Anti-spam discret : invisible, sauf si Cloudflare demande de cocher une case.
              Il fait alors 300 px de large ; sur un écran plus étroit, son cadre défile. */}
          <div className="overflow-x-auto empty:hidden">
            <Turnstile
              {...widget}
              siteKey={siteKey}
              options={{
                theme: "dark",
                language: "fr",
                size: "normal",
                appearance: "interaction-only",
              }}
            />
          </div>
        </FieldGroup>

        {/* Le talon : bouton d'envoi. Le délai et la flèche sont décoratifs ; le nom lu est
            « Envoyer le message ». */}
        <Button type="submit" size="stub" aria-disabled={busy}>
          <span aria-hidden className="type-label md:text-center">
            Réponse
            <br className="max-md:hidden" /> 48–72 h
          </span>
          <span className="flex items-center gap-3 type-poster text-display-sm md:rotate-180 md:[writing-mode:vertical-rl]">
            {busy ? <Spinner aria-label="Envoi en cours" /> : null}
            Envoyer<span className="sr-only"> le message</span>
          </span>
          <span aria-hidden className="type-label">
            <span className="md:hidden">→</span>
            <span className="max-md:hidden">↑</span>
          </span>
        </Button>
      </div>

      {/* Le résultat reste affiché ici : le toast, lui, disparaît (et n'existe pas sans JavaScript). */}
      {state ? (
        <p
          className={cn(
            "mt-4 text-body-sm",
            state.status === "success" ? "text-foreground" : "text-destructive",
          )}
          data-contact-result={state.status}
        >
          {state.message}
        </p>
      ) : null}
      <div className="mt-2 md:mt-3">
        <FieldDescription className="max-md:text-caption">
          Vous recevrez un accusé de réception. Rien n&apos;est conservé par le site.{" "}
          <Link href="/mentions-legales">Mentions légales et confidentialité</Link>
        </FieldDescription>
      </div>
      <Toaster position="bottom-center" />
    </form>
  );
}
