import LoaderSpin from "@/components/ui/loaders/loader-spin"
import Filter from "@/components/vehicles-expore/vehicles/filter"
import FilterTopbar from "@/components/vehicles-expore/vehicles/filter-topbar"
import ExploreVehicleListings from "@/components/vehicles-expore/vehicles/vehicle-listings"
import { Suspense } from "react"

export default function VehiclesExplorePage() {
  return (
    <div className="container-fluid mb-12 pt-6 lg:mb-16">
      <FilterTopbar />
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[330px_5fr] 3xl:gap-10">
        <Suspense fallback={<LoaderSpin />}>
          <Filter className="hidden xl:block" />
        </Suspense>
        <ExploreVehicleListings />
      </div>
    </div>
  )
}
