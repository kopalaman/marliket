"use client"
import { services } from "@/../public/data/services"
import BlockLoader from "@/components/ui/loaders/block-loader"
import Section from "@/components/ui/section"
import { useTimeout } from "@/lib/hooks/use-timeout"
import ServiceBlockCarousel from "./service-block-carousel"

export default function ServicesBlock() {
  const { state } = useTimeout()
  return (
    <Section
      title="Your all in one auto market"
      description="We provide a wide range of services to help you find anything about cars."
      className="lg:container-fluid mt-12 pl-4 sm:pl-6 lg:mt-16"
      headerClassName="mb-2 xl:mb-4"
    >
      {!state && <BlockLoader />}
      {state && <ServiceBlockCarousel data={services} />}
    </Section>
  )
}
