"use client"

import { topVehicles } from "@/../public/data/vehicles"
import { Button } from "@/components/ui/button"
import VehicleCard from "@/components/ui/cards/vehicle"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export default function ExploreVehicleListings() {
  const [displayCount, setDisplayCount] = useState(12)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount((prev) => prev + 8) // Changed to 8 for better grid alignment
      setIsLoading(false)
    }, 600)
  }

  return (
    <div>
      {/* Vehicle Grid */}
      <div className="mt-1 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 3xl:gap-y-10 4xl:grid-cols-4">
        {topVehicles.slice(0, displayCount).map((vehicle) => {
          // Destructure to only pass required props
          const {
            id,
            slides,
            title,
            slug,
            location,
            price,
            ratingCount,
            rating,
            seller,
            isInspected,
          } = vehicle

          return (
            <VehicleCard
              key={id}
              id={id}
              slides={slides}
              title={title}
              slug={slug}
              location={location}
              price={price}
              ratingCount={ratingCount}
              rating={rating}
              seller={seller}
              isInspected={isInspected}
            />
          )
        })}
      </div>

      {/* Load More Button */}
      {topVehicles.length > displayCount && (
        <div className="mt-16 flex justify-center">
          <Button
            size="lg"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="relative px-6 py-2.5 md:sticky md:bottom-10 md:text-base xl:relative xl:bottom-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
