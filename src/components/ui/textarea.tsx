import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex field-sizing-content w-full text-base transition-colors outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "min-h-40 rounded-lg border border-input bg-transparent px-3.5 py-3 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        // Même trait que `Input` en variante `line` ; le champ grandit avec le texte.
        line: "min-h-16 resize-none rounded-none border-0 border-b border-input bg-transparent px-0 py-2 focus-visible:border-primary focus-visible:shadow-[inset_0_-1px_0_var(--primary)] aria-invalid:border-destructive aria-invalid:shadow-[inset_0_-1px_0_var(--destructive)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Textarea({
  className,
  variant,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
