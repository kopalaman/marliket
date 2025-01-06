// components/filters/fuel-type-filter.tsx
"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQueryParam } from "@/hooks/use-query-param"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const FUEL_TYPES = [
  {
    id: "petrol",
    label: "Petrol",
    description: "Standard gasoline engine",
  },
  {
    id: "diesel",
    label: "Diesel",
    description: "Diesel fuel engine",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    description: "Combined petrol and electric",
  },
  {
    id: "plug-in-hybrid",
    label: "Plug-in Hybrid",
    description: "Rechargeable hybrid system",
  },
  {
    id: "electric",
    label: "Electric",
    description: "Full electric vehicle",
  },
  {
    id: "hydrogen",
    label: "Hydrogen",
    description: "Hydrogen fuel cell",
  },
]

export default function FuelTypeFilter() {
  const searchParams = useSearchParams()
  const { updateQueryparams } = useQueryParam()
  const [isOpen, setIsOpen] = useState(true)

  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    const types = searchParams?.get("fuelType")
    return types ? types.split(",") : []
  })

  useEffect(() => {
    if (selectedTypes.length > 0) {
      updateQueryparams("fuelType", selectedTypes.join(","))
    } else {
      updateQueryparams("fuelType", "")
    }
  }, [selectedTypes, updateQueryparams])

  useEffect(() => {
    const types = searchParams?.get("fuelType")
    if (!types) {
      setSelectedTypes([])
    }
  }, [searchParams])

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
        <span>Fuel Type</span>
        <div className="flex items-center gap-2">
          {selectedTypes.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {selectedTypes.length} selected
            </span>
          )}
          <ChevronDown
            className={cn("h-4 w-4 transition-all", isOpen && "rotate-180")}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <ScrollArea className="h-[240px] rounded-md border">
          <div className="space-y-4 p-4">
            {FUEL_TYPES.map((type) => (
              <label
                key={type.id}
                className={cn(
                  "flex cursor-pointer items-start space-x-3 rounded-lg border p-4 transition-colors",
                  selectedTypes.includes(type.id)
                    ? "border-gray-900 bg-gray-50 dark:border-gray-100 dark:bg-gray-800"
                    : "border-gray-200 hover:border-gray-900 dark:border-gray-800 dark:hover:border-gray-100"
                )}
              >
                <Checkbox
                  id={type.id}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() => {
                    setSelectedTypes((prev) => {
                      if (prev.includes(type.id)) {
                        return prev.filter((id) => id !== type.id)
                      }
                      return [...prev, type.id]
                    })
                  }}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <span className="font-medium">{type.label}</span>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  )
}
