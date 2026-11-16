"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
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
import {
  CONTACT_LIMITS,
  CONTACT_MESSAGES,
  TURNSTILE_FIELD,
  readContactFields,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const FIELD_ORDER: (keyof ContactFields)[] = ["name", "email", "message"];

// Le widget est invisible tant que Cloudflare n'a pas besoin d'une interaction. S'il faut
// cliquer, on laisse ce temps au visiteur avant d'abandonner l'envoi.
const CHALLENGE_TIMEOUT_MS = 20_000;

function focusFirstInvalid(form: HTMLFormElement | null, errors: ContactErrors) {
  const first = FIELD_ORDER.find((field) => errors[field]);
  const control = first ? form?.elements.namedItem(first) : null;
  if (control instanceof HTMLElement) control.focus();
}

// Formulaire de contact. Les champs sont validés ici pour répondre tout de suite, puis
// revalidés par la Server Action, qui vérifie le jeton Turnstile avant tout envoi.
export function ContactForm({ siteKey }: { siteKey: string }) {
  const [state, formAction, pending] = useActionState(sendContact, null);
  const [clientErrors, setClientErrors] = useState<ContactErrors | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const turnstile = useRef<TurnstileInstance>(null);
  const challengeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const busy = pending || waiting;

  // Fin de l'attente du jeton : on envoie s'il est arrivé, sinon on le dit.
  function stopWaiting(submit: boolean) {
    clearTimeout(challengeTimer.current);
    setWaiting(false);
    if (submit) form.current?.requestSubmit();
    else toast.error(CONTACT_MESSAGES.challenge);
  }

  useEffect(() => () => clearTimeout(challengeTimer.current), []);

  useEffect(() => {
    if (!state) return;
    // Un jeton Turnstile ne sert qu'une fois : le widget repart à zéro après chaque envoi.
    turnstile.current?.reset();
    if (state.status === "success") {
      toast.success(state.message);
    } else {
      toast.error(state.message);
      if (state.errors) focusFirstInvalid(form.current, state.errors);
    }
  }, [state]);

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
      // Widget absent (script bloqué ou en échec) : inutile d'attendre.
      if (!widgetReady) {
        toast.error(CONTACT_MESSAGES.challenge);
        return;
      }
      // Le jeton arrive d'habitude en une seconde : on l'attend, puis on envoie tout seul.
      setWaiting(true);
      challengeTimer.current = setTimeout(() => stopWaiting(false), CHALLENGE_TIMEOUT_MS);
    }
  }

  const failed = state?.status === "error" ? state : null;
  const errors = clientErrors ?? failed?.errors ?? {};
  const describedBy = (field: keyof ContactFields) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form ref={form} action={formAction} onSubmit={handleSubmit} noValidate>
      <FieldGroup className="max-md:gap-4">
        {/* Nom et e-mail côte à côte, même sur téléphone : la page tient en un écran. */}
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          <Field data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="name">Nom</FieldLabel>
            <Input
              id="name"
              name="name"
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
            <FieldLabel htmlFor="email">E-mail</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
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
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            name="message"
            required
            minLength={CONTACT_LIMITS.messageMin}
            maxLength={CONTACT_LIMITS.message}
            defaultValue={failed?.fields?.message}
            className="max-h-[30svh] min-h-20 md:min-h-[16svh]"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
          />
          {errors.message ? <FieldError id="message-error">{errors.message}</FieldError> : null}
        </Field>

        <Field>
          {/* Anti-spam discret : invisible, sauf si Cloudflare demande de cocher une case.
              Il fait alors 300 px de large ; sur un écran plus étroit, son cadre défile. */}
          <div className="overflow-x-auto empty:hidden">
            <Turnstile
              ref={turnstile}
              siteKey={siteKey}
              options={{
                theme: "dark",
                language: "fr",
                size: "normal",
                appearance: "interaction-only",
              }}
              onWidgetLoad={() => setWidgetReady(true)}
              onSuccess={() => {
                if (waiting) stopWaiting(true);
              }}
              onError={() => {
                if (waiting) stopWaiting(false);
              }}
            />
          </div>
          <Button type="submit" size="xl" aria-disabled={busy} className="md:w-fit">
            {busy ? <Spinner data-icon="inline-start" aria-label="Envoi en cours" /> : null}
            Envoyer le message
          </Button>
          {/* Le résultat reste affiché ici : le toast, lui, disparaît (et n'existe pas sans JavaScript). */}
          {state ? (
            <p
              className={cn(
                "text-body-sm",
                state.status === "success" ? "text-foreground" : "text-destructive",
              )}
              data-contact-result={state.status}
            >
              {state.message}
            </p>
          ) : null}
          <FieldDescription className="max-md:text-caption">
            Votre message m&apos;est transmis par e-mail et n&apos;est pas conservé par le site.{" "}
            <Link href="/mentions-legales">Mentions légales et confidentialité</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
      <Toaster position="bottom-center" />
    </form>
  );
}
