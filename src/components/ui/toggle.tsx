"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Toggle as TogglePrimitive } from "radix-ui"

const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-lg whitespace-nowrap transition-[color,background-color,border-color,scale] duration-200 ease-poster motion-safe:active:scale-[0.97] hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-foreground aria-pressed:text-background data-[state=on]:border-foreground data-[state=on]:bg-foreground data-[state=on]:text-background dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-border bg-transparent hover:border-foreground hover:bg-transparent",
        // Mot d'affiche dans une phrase (motif du formulaire de contact) : en contour tant qu'il
        // n'est pas choisi, plein en orange une fois choisi. Il prend la taille de la phrase.
        poster:
          "rounded-sm border-0 bg-transparent type-outline hover:bg-transparent hover:[-webkit-text-stroke-color:var(--color-primary)] data-[state=on]:bg-transparent data-[state=on]:text-primary data-[state=on]:[-webkit-text-stroke-width:0]",
      },
      size: {
        default:
          "h-8 min-w-8 px-2.5 text-sm font-medium has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-9 min-w-9 px-2.5 text-sm font-medium has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        // Légende mono : filtres du catalogue.
        label: "h-auto px-4 py-2.5 type-label",
        // Hérite de la police, de la taille et de l'approche du texte autour.
        inherit: "h-auto px-0 py-0 [font:inherit] [letter-spacing:inherit] [text-transform:inherit]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
