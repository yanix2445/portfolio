"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { sendContact } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
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

  // Un blanc de la phrase : le champ s'écrit dans la phrase, en lettres d'affiche, souligné.
  // Son nom (« Nom », « E-mail ») est lu par les lecteurs d'écran ; son erreur est sous la phrase.
  // Deux traits en fond : le trait du blanc, et un trait orange qui se dessine de gauche à droite
  // au focus (rouge en erreur). Il indique le focus à la place du contour, sans animation si
  // le visiteur réduit les animations.
  const blank =
    "inline-block max-w-full border-0 bg-transparent px-[0.1em] pb-[0.04em] align-baseline [font:inherit] [letter-spacing:inherit] normal-case text-primary outline-none [--blank-accent:var(--color-primary)] [--blank-line:var(--color-border)] bg-[image:linear-gradient(var(--blank-accent),var(--blank-accent)),linear-gradient(var(--blank-line),var(--blank-line))] bg-[length:0%_2px,100%_2px] bg-[position:0_100%,0_100%] bg-no-repeat transition-[background-size] duration-300 ease-poster motion-reduce:transition-none placeholder:text-muted-foreground/60 hover:[--blank-line:var(--color-soft)] focus-visible:bg-[length:100%_2px,100%_2px] aria-invalid:[--blank-accent:var(--color-destructive)] aria-invalid:bg-[length:100%_2px,100%_2px]";

  return (
    <form ref={form} action={formAction} onSubmit={handleSubmit} onInput={saveDraft} noValidate>
      {/* Le formulaire est une phrase d'affiche à compléter : le nom, l'e-mail et le motif
          s'écrivent dans les blancs ; le message vient dessous. */}
      {/* Sur grand écran, la phrase à gauche, le message et l'envoi à droite : la page tient en
          un écran même sur un portable bas. */}
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-start md:gap-x-[5vw]">
      <div>
      <div className="type-poster text-display-sentence" data-contact-sentence>
        <p>
          Bonjour, je suis{" "}
          <label htmlFor="name" className="sr-only">
            Nom
          </label>
          {/* La ponctuation reste collée au blanc : elle ne part jamais seule à la ligne. */}
          <span className="whitespace-nowrap">
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={CONTACT_LIMITS.name}
            placeholder="votre nom"
            defaultValue={failed?.fields?.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={cn(blank, "w-[6.5em]")}
          />
          ,</span>
        </p>
        <p>
          joignable à{" "}
          <label htmlFor="email" className="sr-only">
            E-mail
          </label>
          <span className="whitespace-nowrap">
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={CONTACT_LIMITS.email}
            placeholder="vous@exemple.fr"
            defaultValue={failed?.fields?.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={cn(blank, "w-[min(9em,85%)]")}
          />
          .</span>
        </p>
        {/* Un <div> et non un <p> : le groupe du motif est un bloc, qu'un paragraphe ne peut pas
            contenir (le navigateur couperait le paragraphe et l'hydratation échouerait). */}
        <div className="flex flex-wrap items-baseline gap-x-[0.3em]">
          <span>
            <span className="max-md:hidden">C&apos;est </span>pour
          </span>
          {/* Le motif, facultatif, préfixe l'objet de la notification. */}
          {/* Les deux motifs sont des mots de la phrase : en contour, puis pleins en orange une
              fois choisis. Facultatif : aucun n'est choisi au départ. */}
          <ToggleGroup
            type="single"
            variant="poster"
            size="inherit"
            aria-label="Motif"
            value={reason}
            onValueChange={chooseReason}
            className="gap-[0.3em]"
            data-contact-reason
          >
            {CONTACT_REASONS.map(({ value, label }, index) => (
              <span key={value} className="flex items-baseline gap-[0.3em]">
                {index > 0 ? (
                  <span aria-hidden className="text-muted-foreground">
                    /
                  </span>
                ) : null}
                <ToggleGroupItem value={value}>{label}</ToggleGroupItem>
              </span>
            ))}
          </ToggleGroup>
          <input type="hidden" name="reason" value={reason} />
        </div>
      </div>

      {errors.name || errors.email ? (
        <div className="mt-3 flex flex-col gap-1">
          {errors.name ? <FieldError id="name-error">{errors.name}</FieldError> : null}
          {errors.email ? <FieldError id="email-error">{errors.email}</FieldError> : null}
        </div>
      ) : null}
      </div>

      <FieldGroup className="gap-2.5 md:gap-[2.4svh]">
        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="message" className="type-label text-muted-foreground">
            Message
          </FieldLabel>
          <Textarea
            id="message"
            name="message"
            variant="line"
            required
            minLength={CONTACT_LIMITS.messageMin}
            maxLength={CONTACT_LIMITS.message}
            defaultValue={failed?.fields?.message}
            placeholder="Le poste, l'équipe, ce que vous attendez de l'alternance…"
            className="max-h-[30svh] min-h-12 md:min-h-[14svh]"
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

        {/* La signature de la phrase : l'envoi, le délai de réponse et la confidentialité. */}
        <div className="flex flex-col gap-3 md:gap-[1.6svh]">
          <FieldDescription className="max-md:text-caption">
            Réponse sous 48 à 72 h, avec un accusé de réception. Rien n&apos;est conservé par le
            site. <Link href="/mentions-legales">Mentions légales et confidentialité</Link>
          </FieldDescription>
          <Button type="submit" size="xl" aria-disabled={busy} className="w-full">
            {busy ? <Spinner aria-label="Envoi en cours" /> : null}
            Envoyer<span className="sr-only"> le message</span>
            <span aria-hidden>→</span>
          </Button>
        </div>
      </FieldGroup>
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
      <Toaster position="bottom-center" />
    </form>
  );
}
