"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MinusIcon, PlusIcon } from "lucide-react"

interface CounterProps {
  count: number
  onCount: (value: number) => void
  countBy?: number
  buttonClassName?: string
  className?: string
  size?: "sm" | "default" | "lg"
  label?: string
  minValue?: number
  maxValue?: number
  disabled?: boolean
}

export default function Counter({
  count,
  onCount,
  countBy = 1,
  buttonClassName,
  className,
  size = "default",
  label,
  minValue = 0,
  maxValue = Infinity,
  disabled = false,
}: CounterProps) {
  const handleDecrement = () => {
    if (count > minValue && !disabled) {
      onCount(count - countBy)
    }
  }

  const handleIncrement = () => {
    if (count < maxValue && !disabled) {
      onCount(count + countBy)
    }
  }

  // Size variants for the container
  const sizeClasses = {
    sm: "gap-2",
    default: "gap-4",
    lg: "gap-6",
  }

  // Size variants for the buttons
  const buttonSizes = {
    sm: "h-7 w-7",
    default: "h-9 w-9",
    lg: "h-10 w-10",
  }

  // Size variants for the count display
  const countSizes = {
    sm: "text-sm",
    default: "text-base",
    lg: "text-lg",
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <span className="mb-1.5 text-sm font-medium text-foreground">
          {label}
        </span>
      )}
      <div className={cn("flex items-center", sizeClasses[size])}>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            buttonSizes[size],
            "transition-colors hover:bg-muted",
            disabled && "cursor-not-allowed opacity-50",
            buttonClassName
          )}
          onClick={handleDecrement}
          disabled={count <= minValue || disabled}
          aria-label="Decrease value"
        >
          <MinusIcon className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
        </Button>

        <div
          className={cn(
            "min-w-[3ch] text-center font-medium",
            countSizes[size],
            disabled && "opacity-50"
          )}
        >
          {count < 10 ? `0${count}` : count}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            buttonSizes[size],
            "transition-colors hover:bg-muted",
            disabled && "cursor-not-allowed opacity-50",
            buttonClassName
          )}
          onClick={handleIncrement}
          disabled={count >= maxValue || disabled}
          aria-label="Increase value"
        >
          <PlusIcon className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
        </Button>
      </div>
    </div>
  )
}
