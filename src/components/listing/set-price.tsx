"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MinusIcon, PlusIcon } from "lucide-react"
import Text from "../ui/text"

interface SetPriceProps {
  label?: string
  value: number
  countBy?: number
  onChange: (value: number) => void
  error?: string
  minValue?: number
}

export default function SetPrice({
  label,
  value,
  countBy = 1,
  onChange,
  error,
  minValue = 0,
}: SetPriceProps) {
  const handleDecrease = () => {
    if (value > minValue) {
      onChange(value - countBy)
    }
  }

  const handleIncrease = () => {
    onChange(value + countBy)
  }

  return (
    <div className="space-y-2">
      {label && (
        <Text className="text-sm font-medium text-foreground">{label}</Text>
      )}
      <div
        className={cn(
          "card-gradient flex items-center justify-between",
          "rounded-lg border border-input",
          "px-4 py-3 text-sm lg:rounded-xl lg:p-4",
          error && "border-destructive"
        )}
      >
        <div className="flex items-center gap-2">
          <Text tag="h3" className="text-2xl font-semibold">
            ${value.toFixed(2)}
          </Text>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg"
            onClick={handleDecrease}
            disabled={value <= minValue}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg"
            onClick={handleIncrease}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
