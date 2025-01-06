"use client"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Slider } from "@/components/ui/slider-bar"
import { useQueryParam } from "@/hooks/use-query-param"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const MAX_MILEAGE = 200000
const MIN_MILEAGE = 0
const MILEAGE_STEP = 5000

const QUICK_RANGES = [
  { label: "Under 30k", range: [0, 30000] },
  { label: "Under 60k", range: [0, 60000] },
  { label: "Under 100k", range: [0, 100000] },
  { label: "Under 150k", range: [0, 150000] },
]

export default function MileageFilter() {
  const searchParams = useSearchParams()
  const { updateQueryparams } = useQueryParam()
  const [isOpen, setIsOpen] = useState(true)

  const [mileageRange, setMileageRange] = useState([
    Number(searchParams?.get("mileageFrom")) || MIN_MILEAGE,
    Number(searchParams?.get("mileageTo")) || 100000,
  ])

  // Format mileage for display
  const formatMileage = (miles: number) => {
    if (miles >= 1000) {
      return `${(miles / 1000).toLocaleString()}k`
    }
    return miles.toLocaleString()
  }

  useEffect(() => {
    updateQueryparams("mileageFrom", mileageRange[0].toString())
    updateQueryparams("mileageTo", mileageRange[1].toString())
  }, [mileageRange, updateQueryparams])

  useEffect(() => {
    const mileageFrom = searchParams?.get("mileageFrom")
    const mileageTo = searchParams?.get("mileageTo")

    if (!mileageFrom && !mileageTo) {
      setMileageRange([MIN_MILEAGE, 100000])
    }
  }, [searchParams])

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
        <span>Mileage Range</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {formatMileage(mileageRange[0])} - {formatMileage(mileageRange[1])}{" "}
            miles
          </span>
          <ChevronDown
            className={cn("h-4 w-4 transition-all", isOpen && "rotate-180")}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-4">
        {/* Quick Selection Buttons */}
        <div className="flex flex-wrap gap-2">
          {QUICK_RANGES.map((range) => (
            <Button
              key={range.label}
              variant="outline"
              size="sm"
              onClick={() => setMileageRange(range.range)}
              className={cn(
                "text-xs",
                mileageRange[0] === range.range[0] &&
                  mileageRange[1] === range.range[1] &&
                  "border-gray-900 bg-gray-100 dark:border-gray-100 dark:bg-gray-800"
              )}
            >
              {range.label}
            </Button>
          ))}
        </div>

        {/* Mileage Range Slider */}
        <div className="space-y-4 py-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatMileage(MIN_MILEAGE)}</span>
            <span>{formatMileage(MAX_MILEAGE)}+</span>
          </div>

          <Slider
            min={MIN_MILEAGE}
            max={MAX_MILEAGE}
            step={MILEAGE_STEP}
            value={mileageRange}
            onValueChange={setMileageRange}
            className="py-4"
          />

          {/* Range Display */}
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <label className="text-sm text-muted-foreground">From</label>
              <p className="font-medium">{formatMileage(mileageRange[0])}</p>
            </div>
            <div className="text-center">
              <label className="text-sm text-muted-foreground">To</label>
              <p className="font-medium">{formatMileage(mileageRange[1])}</p>
            </div>
          </div>
        </div>

        {/* Custom Input Message */}
        <p className="text-xs text-muted-foreground">
          Drag the sliders or use the preset ranges above to filter by mileage
        </p>

        {/* Reset Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-gray-100"
          onClick={() => setMileageRange([MIN_MILEAGE, 100000])}
        >
          Reset to default range
        </Button>
      </CollapsibleContent>
    </Collapsible>
  )
}
