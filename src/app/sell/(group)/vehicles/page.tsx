import BusinessSellerSection from "@/components/become-seller/vehicle/business-seller"
import CallToAction from "@/components/become-seller/vehicle/call-to-action"
import FAQ from "@/components/become-seller/vehicle/faq"
import { FeaturesSection } from "@/components/become-seller/vehicle/featured-section"
import Footer from "@/components/become-seller/vehicle/footer"
import HowItWorks from "@/components/become-seller/vehicle/how-it-works"
import VehiclePricing from "@/components/become-seller/vehicle/vehicle-pricing"
import VehicleShowcase from "@/components/become-seller/vehicle/vehicle-showcase"
import VehicleTestimonials from "@/components/become-seller/vehicle/vehicle-testimonials"

export default function Vehicles() {
  return (
    <div className="relative h-[50rem] w-full">
      {/* Grid background with fade */}
      <div className="absolute inset-0 bg-grid-black/[0.2] dark:bg-grid-white/[0.2]" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

      {/* Content */}
      <div className="relative pt-10">
        <FeaturesSection />
        <HowItWorks />
        <BusinessSellerSection />
        <VehiclePricing />
        <VehicleTestimonials />
        <VehicleShowcase />
        <FAQ />
        <CallToAction />
        <Footer />
      </div>
    </div>
  )
}
