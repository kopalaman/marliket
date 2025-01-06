"use client"

import { Button } from "@/components/ui/button"
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

const BODY_TYPES = [
  {
    id: "sedan",
    label: "Sedan",
    description: "4-door car with a separate trunk for luggage",
  },
  {
    id: "suv",
    label: "SUV",
    description: "Sport Utility Vehicle with high ground clearance",
  },
  {
    id: "truck",
    label: "Truck",
    description: "Pickup truck with an open cargo bed",
  },
  {
    id: "coupe",
    label: "Coupe",
    description: "2-door car with a sporty design",
  },
  {
    id: "wagon",
    label: "Wagon",
    description: "Estate car with extended roof and cargo area",
  },
  {
    id: "van",
    label: "Van",
    description: "Cargo or passenger van with high roof",
  },
  {
    id: "convertible",
    label: "Convertible",
    description: "Car with a retractable roof",
  },
  {
    id: "hatchback",
    label: "Hatchback",
    description: "Car with a rear door that opens upwards",
  },
  {
    id: "crossover",
    label: "Crossover",
    description: "Combines features of an SUV and a passenger car",
  },
  {
    id: "minivan",
    label: "Minivan",
    description: "Family vehicle with sliding doors and flexible seating",
  },
  // Added more types to demonstrate scrolling
]

export default function BodyTypeFilter() {
  const searchParams = useSearchParams()
  const { updateQueryparams } = useQueryParam()
  const [isOpen, setIsOpen] = useState(true)

  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    const types = searchParams?.get("bodyTypes")
    return types ? types.split(",") : []
  })

  useEffect(() => {
    if (selectedTypes.length > 0) {
      updateQueryparams("bodyTypes", selectedTypes.join(","))
    } else {
      updateQueryparams("bodyTypes", "")
    }
  }, [selectedTypes, updateQueryparams])

  useEffect(() => {
    const types = searchParams?.get("bodyTypes")
    if (!types) {
      setSelectedTypes([])
    }
  }, [searchParams])

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId)
      }
      return [...prev, typeId]
    })
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
        <span>Body Type</span>
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

      <CollapsibleContent className="space-y-4">
        {/* Select All / Clear Buttons */}
        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedTypes(BODY_TYPES.map((type) => type.id))}
            className="text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-gray-100"
          >
            Select All
          </Button>
          {selectedTypes.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTypes([])}
              className="text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-gray-100"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Scrollable Checkboxes */}
        <ScrollArea className="h-[280px] rounded-md border">
          <div className="space-y-4 p-4">
            {BODY_TYPES.map((type) => (
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
                  onCheckedChange={() => handleTypeToggle(type.id)}
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
