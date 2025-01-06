"use client"

import { Button } from "@/components/ui/button"
import carBrandIcons from "@/components/ui/car-brand-icons"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQueryParam } from "@/hooks/use-query-param"
import { cn } from "@/lib/utils"
import { Check, ChevronDown } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const VEHICLE_MAKES = [
  {
    id: "toyota",
    name: "Toyota",
    icon: carBrandIcons.Toyota,
    selected: false,
    models: [
      "Camry",
      "Corolla",
      "RAV4",
      "Highlander",
      "4Runner",
      "Land Cruiser",
      "vitz",
      "vitz1",
      "vitz2",
      "vitz3",
      "vitz4",
      "vitz5",
      "vitz6",
      "vitz7",
      "vitz8",
      "vitz9",
      "vitz10",
    ],
  },
  {
    id: "bmw",
    name: "BMW",
    selected: false,
    icon: carBrandIcons.BMW,
    models: ["3 Series", "5 Series", "X3", "X5", "M3", "M5"],
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    selected: false,
    icon: carBrandIcons.Mercedes,
    models: ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "G-Class"],
  },
  {
    id: "volkswagen",
    name: "Volkswagen",
    selected: false,
    icon: carBrandIcons.Volkswagen,
    models: ["Golf", "Passat", "Tiguan", "Atlas", "Jetta", "Arteon"],
  },
  {
    id: "ford",
    name: "Ford",
    selected: false,
    icon: carBrandIcons.Ford,
    models: ["F-150", "Mustang", "Explorer", "Escape", "Edge", "Bronco"],
  },
  {
    id: "honda",
    name: "Honda",
    selected: false,
    icon: carBrandIcons.Honda,
    models: ["Civic", "Accord", "CR-V", "Pilot", "HR-V", "Odyssey"],
  },
  {
    id: "hyundai",
    name: "Hyundai",
    selected: false,
    icon: carBrandIcons.Hyundai,
    models: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade", "Kona"],
  },
  {
    id: "audi",
    name: "Audi",
    selected: false,
    icon: carBrandIcons.Audi,
    models: ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
  },
]

export default function MakeModelFilter() {
  const searchParams = useSearchParams()
  const { updateQueryparams } = useQueryParam()

  const [makes, setMakes] = useState(VEHICLE_MAKES)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [modelOpen, setModelOpen] = useState(false)

  const selectedMake = makes.find((make) => make.selected)

  const handleMakeSelect = (makeId: string) => {
    const updatedMakes = makes.map((make) => ({
      ...make,
      selected: make.id === makeId ? !make.selected : false,
    }))
    setMakes(updatedMakes)
    setSelectedModel(null)
  }

  useEffect(() => {
    const selectedMake = makes.find((make) => make.selected)
    if (selectedMake) {
      updateQueryparams("make", selectedMake.id)
      if (selectedModel) {
        updateQueryparams("model", selectedModel)
      } else {
        updateQueryparams("model", "")
      }
    } else {
      updateQueryparams("make", "")
      updateQueryparams("model", "")
    }
  }, [makes, selectedModel, updateQueryparams])

  useEffect(() => {
    const make = searchParams?.get("make")
    const model = searchParams?.get("model")

    if (make) {
      setMakes((prev) =>
        prev.map((m) => ({
          ...m,
          selected: m.id === make,
        }))
      )
    }
    if (model) {
      setSelectedModel(model)
    }
  }, [])

  useEffect(() => {
    const make = searchParams?.get("make")
    if (!make) {
      setMakes((prev) => prev.map((m) => ({ ...m, selected: false })))
      setSelectedModel(null)
    }
  }, [searchParams])

  return (
    <div className="space-y-6">
      <div>
        <span className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
          Select Brand
        </span>
        <div className="grid grid-cols-4 gap-3">
          {makes.map((make) => {
            const Icon = make.icon
            return (
              <button
                key={make.id}
                type="button"
                onClick={() => handleMakeSelect(make.id)}
                className={cn(
                  "flex flex-col items-center justify-center rounded-lg border p-4 transition-all",
                  make.selected
                    ? "border-gray-900 bg-gray-50 dark:border-gray-100 dark:bg-gray-900"
                    : "border-gray-200 hover:border-gray-900 dark:border-gray-800 dark:hover:border-gray-100"
                )}
              >
                <Icon className="mb-2 h-8 w-8 fill-black dark:fill-white" />
                <span className="text-xs font-medium">{make.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {selectedMake && (
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Select Model</label>
          <Popover open={modelOpen} onOpenChange={setModelOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={modelOpen}
                className="w-full justify-between"
              >
                {selectedModel || "Select model..."}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search model..." />
                <CommandList>
                  <CommandEmpty>No model found.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-[200px]">
                      {selectedMake.models.map((model) => (
                        <CommandItem
                          key={model}
                          value={model}
                          onSelect={(value) => {
                            setSelectedModel(value)
                            setModelOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedModel === model
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {model}
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}

      {(selectedMake || selectedModel) && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setMakes(makes.map((make) => ({ ...make, selected: false })))
            setSelectedModel(null)
          }}
          className="text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-gray-100"
        >
          Clear selection
        </Button>
      )}
    </div>
  )
}
