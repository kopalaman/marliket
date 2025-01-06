/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
import { Slider } from "@/components/ui/slider-bar"
import { useQueryParam } from "@/hooks/use-query-param"
import { cn } from "@/lib/utils"
import { Check, ChevronDown, MapPin } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

// Example cities - Replace with your actual city data
const CITIES = [
  { id: "lusaka", name: "Lusaka", region: "Lusaka Province" },
  { id: "ndola", name: "Ndola", region: "Copperbelt Province" },
  { id: "kitwe", name: "Kitwe", region: "Copperbelt Province" },
  { id: "livingstone", name: "Livingstone", region: "Southern Province" },
  { id: "chipata", name: "Chipata", region: "Eastern Province" },
  // Add more cities
]

const RADIUS_OPTIONS = [
  { value: 5, label: "5 km" },
  { value: 10, label: "10 km" },
  { value: 25, label: "25 km" },
  { value: 50, label: "50 km" },
  { value: 100, label: "100 km" },
]

export default function LocationFilter() {
  const searchParams = useSearchParams()
  const { updateQueryparams } = useQueryParam()
  const [isOpen, setIsOpen] = useState(true)
  const [locationOpen, setLocationOpen] = useState(false)

  const [selectedCity, setSelectedCity] = useState<string | null>(
    searchParams?.get("city")
  )
  const [radius, setRadius] = useState<number>(
    Number(searchParams?.get("radius")) || 25
  )

  const selectedCityData = CITIES.find((city) => city.id === selectedCity)

  useEffect(() => {
    if (selectedCity) {
      updateQueryparams("city", selectedCity)
      updateQueryparams("radius", radius.toString())
    } else {
      updateQueryparams("city", "")
      updateQueryparams("radius", "")
    }
  }, [selectedCity, radius, updateQueryparams])

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
        <span>Location</span>
        <div className="flex items-center gap-2">
          {selectedCity && (
            <span className="text-sm text-muted-foreground">
              {selectedCityData?.name} • {radius} km
            </span>
          )}
          <ChevronDown
            className={cn("h-4 w-4 transition-all", isOpen && "rotate-180")}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-4">
        {/* City Selection */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">City</label>
          <Popover open={locationOpen} onOpenChange={setLocationOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={locationOpen}
                className="w-full justify-between"
              >
                {selectedCity ? (
                  <>
                    <MapPin className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    {selectedCityData?.name}
                  </>
                ) : (
                  "Select city..."
                )}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search city..." />
                <CommandList>
                  <CommandEmpty>No city found.</CommandEmpty>
                  <CommandGroup>
                    {CITIES.map((city) => (
                      <CommandItem
                        key={city.id}
                        value={city.name}
                        onSelect={() => {
                          setSelectedCity(city.id)
                          setLocationOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCity === city.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className="flex flex-col">
                          <span>{city.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {city.region}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Radius Selection */}
        {selectedCity && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Search Radius
              </label>
              <div className="pt-2">
                <Slider
                  value={[radius]}
                  onValueChange={([value]: any) => setRadius(value)}
                  min={5}
                  max={100}
                  step={5}
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>5 km</span>
                  <span>{radius} km</span>
                  <span>100 km</span>
                </div>
              </div>
            </div>

            {/* Quick Select Buttons */}
            <div className="flex flex-wrap gap-2">
              {RADIUS_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  size="sm"
                  onClick={() => setRadius(option.value)}
                  className={cn(
                    "text-xs",
                    radius === option.value &&
                      "border-gray-900 bg-gray-100 dark:border-gray-100 dark:bg-gray-800"
                  )}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Clear Selection */}
        {selectedCity && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedCity(null)
              setRadius(25)
            }}
            className="w-full text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-gray-100"
          >
            Clear location
          </Button>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
