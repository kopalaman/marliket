"use client"

import VehicleCard from "@/components/ui/cards/vehicle"
import ListingCardLoader from "@/components/ui/loaders/listing-card-loader"
import Section from "@/components/ui/section"
import { useTimeout } from "@/lib/hooks/use-timeout"

interface SimilarVehiclesProps {
  vehicles: Array<{
    id: string
    slides: string[]
    title: string
    slug: string
    location: string
    price: string
    ratingCount: string
    rating: number
    seller: {
      id: string
      name: string
      avatar: string
      verified: boolean
    }
    isInspected: boolean
  }>
}

function VehicleGrid({ vehicles }: SimilarVehiclesProps) {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
      {vehicles.map((vehicle) => {
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
  )
}

export function SimilarVehicles({ vehicles }: SimilarVehiclesProps) {
  const { state } = useTimeout()

  return (
    <Section
      className="group/section mt-12 overflow-hidden lg:mt-16"
      title="Similar Vehicles"
      description="You might also like these vehicles"
      headerClassName="items-end mb-2 xl:mb-4 gap-5"
    >
      {!state && <ListingCardLoader />}
      {state && <VehicleGrid vehicles={vehicles} />}
    </Section>
  )
}
