import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:from-indigo-600 hover:to-blue-700 active:translate-y-0 transition-all duration-200",
        destructive:
          "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:from-red-600 hover:to-rose-700 active:translate-y-0 transition-all duration-200 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-indigo-200 bg-background text-primary shadow-sm hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 dark:border-indigo-800 dark:bg-input/30 dark:hover:bg-indigo-900/40 dark:hover:border-indigo-700 transition-all duration-200",
        secondary:
          "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:from-violet-600 hover:to-purple-700 active:translate-y-0 transition-all duration-200",
        ghost:
          "hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-all duration-200",
        link: "text-indigo-600 underline-offset-4 hover:underline hover:text-indigo-700 transition-all duration-200",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-9 rounded-md gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-md px-7 text-base has-[>svg]:px-5",
        icon: "size-10",
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
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
