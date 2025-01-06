"use client"

import { drawerStateAtom } from "@/atoms/drawer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAtom } from "jotai"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import BodyTypeFilter from "../filters/body-type"
import FuelTypeFilter from "../filters/fuel-type"
import LocationFilter from "../filters/location"
import MakeModelFilter from "../filters/make-model"
import MileageFilter from "../filters/mileage"
import PriceRangeFilter from "../filters/price-range"
import SellerTypeFilter from "../filters/seller-type"
import TransmissionFilter from "../filters/transmission"
import YearFilter from "../filters/year"

interface FilterProps {
  className?: string
}

export default function Filter({ className }: FilterProps) {
  const router = useRouter()
  const [drawerState, setDrawerState] = useAtom(drawerStateAtom)
  const searchParams = useSearchParams()
  const [hasFilters, setHasFilters] = useState(false)

  useEffect(() => {
    setHasFilters(searchParams?.toString().length > 0)
  }, [searchParams])

  const handleReset = () => {
    router.push("/vehicles")
  }

  return (
    <div
      className={`h-full overflow-y-auto bg-white dark:bg-gray-950 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col items-start justify-between space-y-4 p-4 xl:px-0">
        <h3 className="text-lg font-semibold">Filters</h3>

        {hasFilters && (
          <Button
            variant="outline"
            className="h-8 w-full px-2 text-sm"
            onClick={handleReset}
          >
            Reset all
          </Button>
        )}
      </div>

      <Separator />

      {/* Filters */}
      <div className="space-y-6 p-4 xl:px-0">
        <LocationFilter />
        <Separator />
        <PriceRangeFilter />
        <Separator />
        <MakeModelFilter />
        <Separator />
        <BodyTypeFilter />
        <Separator />
        <YearFilter />
        <Separator />
        <MileageFilter />
        <Separator />
        <TransmissionFilter />
        <Separator />
        <FuelTypeFilter />
        <Separator />
        <SellerTypeFilter />
      </div>

      {/* Mobile Apply Button */}
      <div className="sticky bottom-0 flex items-center justify-between bg-white p-4 shadow-lg dark:bg-gray-950 xl:hidden">
        {hasFilters && (
          <Button
            variant="ghost"
            className="h-8 px-2 text-sm"
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
        <Button
          className="ml-auto"
          onClick={() => setDrawerState({ ...drawerState, isOpen: false })}
        >
          Show Results
        </Button>
      </div>
    </div>
  )
}
