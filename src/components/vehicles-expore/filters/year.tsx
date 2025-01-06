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

const CURRENT_YEAR = new Date().getFullYear()
const MIN_YEAR = 1960
const YEAR_STEP = 1

const QUICK_RANGES = [
  { label: "Last 5 years", years: [CURRENT_YEAR - 5, CURRENT_YEAR] },
  { label: "Last 10 years", years: [CURRENT_YEAR - 10, CURRENT_YEAR] },
  { label: "Last 20 years", years: [CURRENT_YEAR - 20, CURRENT_YEAR] },
  { label: "Classic (Pre-1980)", years: [MIN_YEAR, 1980] },
]

export default function YearFilter() {
  const searchParams = useSearchParams()
  const { updateQueryparams } = useQueryParam()
  const [isOpen, setIsOpen] = useState(true)

  const [yearRange, setYearRange] = useState([
    Number(searchParams?.get("yearFrom")) || CURRENT_YEAR - 10,
    Number(searchParams?.get("yearTo")) || CURRENT_YEAR,
  ])

  useEffect(() => {
    updateQueryparams("yearFrom", yearRange[0].toString())
    updateQueryparams("yearTo", yearRange[1].toString())
  }, [yearRange, updateQueryparams])

  // Reset when params are cleared
  useEffect(() => {
    const yearFrom = searchParams?.get("yearFrom")
    const yearTo = searchParams?.get("yearTo")

    if (!yearFrom && !yearTo) {
      setYearRange([CURRENT_YEAR - 10, CURRENT_YEAR])
    }
  }, [searchParams])

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
        <span>Year Range</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {yearRange[0]} - {yearRange[1]}
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
              onClick={() => setYearRange(range.years)}
              className={cn(
                "text-xs",
                yearRange[0] === range.years[0] &&
                  yearRange[1] === range.years[1] &&
                  "border-gray-900 bg-gray-100 dark:border-gray-100 dark:bg-gray-800"
              )}
            >
              {range.label}
            </Button>
          ))}
        </div>

        {/* Year Range Slider */}
        <div className="space-y-4 py-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{MIN_YEAR}</span>
            <span>{CURRENT_YEAR}</span>
          </div>

          <Slider
            min={MIN_YEAR}
            max={CURRENT_YEAR}
            step={YEAR_STEP}
            value={yearRange}
            onValueChange={setYearRange}
            className="py-4"
          />

          {/* Range Display */}
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <label className="text-sm text-muted-foreground">From</label>
              <p className="font-medium">{yearRange[0]}</p>
            </div>
            <div className="text-center">
              <label className="text-sm text-muted-foreground">To</label>
              <p className="font-medium">{yearRange[1]}</p>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-gray-100"
          onClick={() => setYearRange([CURRENT_YEAR - 10, CURRENT_YEAR])}
        >
          Reset to default range
        </Button>
      </CollapsibleContent>
    </Collapsible>
  )
}
