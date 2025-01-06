import Hero from "@/components/become-seller/hero-section"
import GettingStarted from "@/components/become-seller/vehicle/how-it-works"
import PricingPage from "@/components/dashboard/pricing/pricing"

export default function Parts() {
  return (
    <div className="relative h-[50rem] w-full">
      {/* Grid background with fade */}
      <div className="absolute inset-0 bg-grid-black/[0.2] dark:bg-grid-white/[0.2]" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

      {/* Content */}
      <div className="relative pt-10">
        <Hero />
        <GettingStarted />
        <PricingPage />
      </div>
    </div>
  )
}
