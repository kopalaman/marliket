import AddVehicleBlock from "@/components/vehicles-home/add-vehicle-block"
import {
  BrowseByManufacturer,
  BrowseByType,
} from "@/components/vehicles-home/explore-cars"
import FAQSection from "@/components/vehicles-home/faq-section"
import NewVehicles from "@/components/vehicles-home/new-vehicles"
import {
  CarVideos,
  InDepthReviews,
  LatestCarNews,
} from "@/components/vehicles-home/reviews-section"
import ServicesBlock from "@/components/vehicles-home/services-block/services-block"
import TestimonialBlock from "@/components/vehicles-home/testimonial"
import VehicleDeals from "@/components/vehicles-home/vehicle-deals"

export default function VehiclesHomePage() {
  return (
    <>
      <ServicesBlock />
      <VehicleDeals />
      <AddVehicleBlock />
      <NewVehicles />
      <TestimonialBlock />
      <div className="relative bg-gray-50 py-3 dark:bg-gray-900">
        <div className="absolute inset-0 bg-grid-gray-900/5 dark:bg-grid-gray-100/5" />
        <LatestCarNews />
        <InDepthReviews />
        <CarVideos />
      </div>
      <BrowseByType />
      <BrowseByManufacturer />
      <FAQSection />
    </>
  )
}
