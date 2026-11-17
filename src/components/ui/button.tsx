import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding whitespace-nowrap transition-all select-none active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Contour sur fond sombre : il s'inverse au survol.
        outline:
          "border-border bg-transparent hover:bg-foreground hover:text-background aria-expanded:bg-foreground aria-expanded:text-background",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 text-sm font-medium has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-9 gap-1.5 px-2.5 text-sm font-medium has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        // Légende mono : en-tête, liens d'accès, actions secondaires.
        label: "h-auto gap-2 px-4 py-2.5 type-label",
        // Grand appel à l'action : hero sur téléphone, fin de l'accueil, envoi du formulaire.
        xl: "h-control-xl gap-3 rounded-xl px-7 text-button motion-safe:hover:-translate-y-0.75 md:px-9",
        // Talon du billet de contact : il remplit sa colonne (sa rangée sur téléphone). Sur
        // fond orange, le contour de focus orange du site serait invisible : il passe en
        // noir, à l'intérieur du talon.
        // La perforation est un trait pointillé couleur du fond : en haut sur téléphone, à
        // gauche à partir de `md`.
        stub: "h-auto w-full justify-between gap-3 rounded-none border-0 border-t-2 border-dashed border-background px-5 py-3 focus-visible:outline-background focus-visible:-outline-offset-6 md:h-full md:flex-col md:border-t-0 md:border-l-2 md:px-3 md:py-6",
        icon: "size-8 text-sm font-medium",
        "icon-lg": "size-9 text-sm font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
