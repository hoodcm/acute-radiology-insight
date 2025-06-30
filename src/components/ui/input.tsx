
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-auto min-h-0 w-full rounded-md border border-border bg-surface-card px-1 text-base ring-offset-surface-bg file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
