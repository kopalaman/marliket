"use client"

import { topVehicles } from "@/../public/data/vehicles"

import Section from "@/components/ui/section"
import { Routes } from "@/config/routes"
import { useTimeout } from "@/lib/hooks/use-timeout"
import VehicleCard from "../ui/cards/vehicle"
import ListingCardLoader from "../ui/loaders/listing-card-loader"
import SeeMore from "../ui/see-more"

function VechicleGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
      {topVehicles.slice(0, 8).map((vehicle) => {
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

export default function VehicleDeals() {
  const { state } = useTimeout()

  return (
    <Section
      className="group/section container-fluid mt-12 overflow-hidden lg:mt-16"
      title="Featured Vehicle Deals"
      description="Save big on high-quality pre-owned vehicles."
      headerClassName="items-end mb-2 xl:mb-4 gap-5"
      rightElement={<SeeMore url={Routes.public.vehicles} />}
    >
      {!state && <ListingCardLoader />}
      {state && <VechicleGrid />}
    </Section>
  )
}
