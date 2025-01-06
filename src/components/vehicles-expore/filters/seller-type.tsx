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
import { Briefcase, Building2, ChevronDown, Star, User } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const SELLER_TYPES = [
  {
    id: "private",
    label: "Private Seller",
    description: "Individual car owners selling their personal vehicles",
    icon: User,
  },
  {
    id: "dealer",
    label: "Dealership",
    description: "Authorized car dealerships with multiple vehicles",
    icon: Building2,
  },
  {
    id: "certified",
    label: "Certified Dealer",
    description: "Manufacturer-certified dealerships with warranty options",
    icon: Star,
  },
  {
    id: "commercial",
    label: "Commercial Seller",
    description: "Business entities selling fleet or commercial vehicles",
    icon: Briefcase,
  },
]

export default function SellerTypeFilter() {
  const searchParams = useSearchParams()
  const { updateQueryparams } = useQueryParam()
  const [isOpen, setIsOpen] = useState(true)

  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    const types = searchParams?.get("sellerType")
    return types ? types.split(",") : []
  })

  useEffect(() => {
    if (selectedTypes.length > 0) {
      updateQueryparams("sellerType", selectedTypes.join(","))
    } else {
      updateQueryparams("sellerType", "")
    }
  }, [selectedTypes, updateQueryparams])

  useEffect(() => {
    const types = searchParams?.get("sellerType")
    if (!types) {
      setSelectedTypes([])
    }
  }, [searchParams])

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
        <span>Seller Type</span>
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
        <ScrollArea className="rounded-md border">
          <div className="space-y-4 p-4">
            {SELLER_TYPES.map((type) => {
              const Icon = type.icon
              return (
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
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{type.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </label>
              )
            })}
          </div>
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  )
}
