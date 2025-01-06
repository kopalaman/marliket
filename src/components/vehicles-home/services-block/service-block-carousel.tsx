"use client"

import { Button } from "@/components/ui/button"
import { Navigation, Swiper, SwiperSlide } from "@/components/ui/slider"
import ServiceCard from "@/components/vehicles-home/services-block/service-card"
import { ServiceTypes } from "@/types"
import { ChevronLeft, ChevronRight } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ServiceBlockCarousel({ data }: any) {
  return (
    <div className="group/section relative">
      <Swiper
        loop={false}
        modules={[Navigation]}
        autoplay={false}
        slidesPerView={4}
        spaceBetween={12}
        navigation={{
          nextEl: ".service-button-next",
          prevEl: ".service-button-prev",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          480: {
            slidesPerView: 1.6,
          },
          580: {
            slidesPerView: 1.6,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          840: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {data?.map((item: ServiceTypes, index: number) => (
          <SwiperSlide key={`service-${index}`}>
            <ServiceCard
              slug={item.slug}
              name={item.name}
              description={item.description}
              thumbnail={item.thumbnail}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        variant={"secondary"}
        className="service-button-prev invisible absolute left-[25px] top-1/2 z-10 flex -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:left-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
      >
        <ChevronLeft className="h-auto w-5" />
      </Button>
      <Button
        variant={"secondary"}
        className="service-button-next invisible absolute right-[25px] top-1/2 z-10 flex -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:right-4 sm:group-hover/section:right-6 lg:group-hover/section:-right-[19px]"
      >
        <ChevronRight className="h-auto w-5" />
      </Button>
    </div>
  )
}
