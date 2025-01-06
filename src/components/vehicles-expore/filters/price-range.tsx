// components/explore/filters/price-range.tsx
"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Slider } from "@/components/ui/slider-bar"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import * as React from "react"
import { useDebounce } from "use-debounce"

const MIN_PRICE = 0
const MAX_PRICE = 200000
const STEP = 1000

export default function PriceRangeFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = React.useState(true)

  // Get price range from URL or use defaults
  const [priceRange, setPriceRange] = React.useState([
    Number(searchParams.get("minPrice")) || MIN_PRICE,
    Number(searchParams.get("maxPrice")) || MAX_PRICE,
  ])

  // Debounce value to prevent too many URL updates
  const [debouncedPriceRange] = useDebounce(priceRange, 500)

  // Update URL when price range changes
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("minPrice", debouncedPriceRange[0].toString())
    params.set("maxPrice", debouncedPriceRange[1].toString())
    router.push(`?${params.toString()}`)
  }, [debouncedPriceRange, router, searchParams])

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
        Price Range
        <ChevronDown
          className={cn("h-4 w-4 transition-all", isOpen && "rotate-180")}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-4">
        {/* Price Display */}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <div className="text-muted-foreground">Min</div>
            <div className="font-medium">{formatPrice(priceRange[0])}</div>
          </div>
          <div className="text-right text-sm">
            <div className="text-muted-foreground">Max</div>
            <div className="font-medium">{formatPrice(priceRange[1])}</div>
          </div>
        </div>

        {/* Slider */}
        <Slider
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={STEP}
          value={priceRange}
          onValueChange={setPriceRange}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label="Price range"
        />

        {/* Quick Select Buttons */}
        <div className="flex flex-wrap gap-2">
          {[25000, 50000, 75000, 100000].map((price) => (
            <button
              key={price}
              onClick={() => setPriceRange([MIN_PRICE, price])}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                priceRange[1] === price
                  ? "border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900"
                  : "border-gray-200 hover:border-gray-900 dark:border-gray-800 dark:hover:border-gray-100"
              )}
            >
              Under {formatPrice(price)}
            </button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
