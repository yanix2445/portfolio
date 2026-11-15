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
  const form = useRef<HTMLFormElement>(null);
  const turnstile = useRef<TurnstileInstance>(null);

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
    if (pending) {
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
      toast.error(CONTACT_MESSAGES.challenge);
    }
  }

  const failed = state?.status === "error" ? state : null;
  const errors = clientErrors ?? failed?.errors ?? {};
  const describedBy = (field: keyof ContactFields) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form ref={form} action={formAction} onSubmit={handleSubmit} noValidate>
      <FieldGroup>
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

        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            name="message"
            required
            minLength={CONTACT_LIMITS.messageMin}
            maxLength={CONTACT_LIMITS.message}
            defaultValue={failed?.fields?.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
          />
          {errors.message ? <FieldError id="message-error">{errors.message}</FieldError> : null}
        </Field>

        {/* Le widget fait au moins 300 px de large : sur un écran plus étroit, il défile
            dans son cadre au lieu d'élargir la page. */}
        <div className="overflow-x-auto">
          <Turnstile
            ref={turnstile}
            siteKey={siteKey}
            options={{ theme: "dark", language: "fr", size: "flexible" }}
          />
        </div>

        <Field>
          <Button type="submit" size="xl" aria-disabled={pending} className="md:w-fit">
            {pending ? <Spinner data-icon="inline-start" aria-label="Envoi en cours" /> : null}
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
          <FieldDescription>
            Votre message m&apos;est transmis par e-mail et n&apos;est pas conservé par le site.{" "}
            <Link href="/mentions-legales">Mentions légales et confidentialité</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
      <Toaster position="bottom-center" />
    </form>
  );
}
