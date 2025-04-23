"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
<<<<<<< HEAD
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
=======
        "relative h-3 w-full overflow-hidden rounded-full",
        // Modified classes
        "border bg-transparent",
>>>>>>> origin/main
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
<<<<<<< HEAD
        className="bg-primary h-full w-full flex-1 transition-all"
=======
        className="bg-pink-400 h-full w-full flex-1 transition-all"
>>>>>>> origin/main
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
