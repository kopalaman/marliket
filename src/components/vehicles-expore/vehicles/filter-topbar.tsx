"use client"

import { drawerStateAtom } from "@/atoms/drawer"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAtom } from "jotai"
import { SlidersHorizontal } from "lucide-react"
import { useState } from "react"

const sortingOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "mileage-low", label: "Mileage: Low to High" },
  { value: "rating", label: "Top Rated" },
]

export default function FilterTopbar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setDrawerState] = useAtom(drawerStateAtom)

  const openFilterDrawer = () => {
    setDrawerState({
      isOpen: true,
      view: "FILTER_MENU",
      placement: "right",
    })
  }
  const [selected, setSelected] = useState(sortingOptions[0].value)

  return (
    <div className="mb-8 flex items-center justify-between">
      {/* Results Count */}
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 md:text-base">
        Showing <span className="font-semibold">1-20</span>{" "}
        <span className="text-gray-500 dark:text-gray-400">
          out of 2,356 Vehicles
        </span>
      </div>

      {/* Mobile Filter Button */}
      <Button
        variant="outline"
        size="icon"
        className="xl:hidden"
        onClick={openFilterDrawer}
      >
        <SlidersHorizontal className="h-4 w-4" />
      </Button>

      {/* Sort Dropdown */}
      <div className="hidden xl:block">
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortingOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
