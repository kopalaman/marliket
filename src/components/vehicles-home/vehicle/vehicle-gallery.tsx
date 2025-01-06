"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  FreeMode,
  Navigation,
  Swiper,
  SwiperOptions,
  SwiperSlide,
  Thumbs,
} from "@/components/ui/slider"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

interface VehicleGalleryProps {
  images: {
    url: string
    alt: string
  }[]
  className?: string
  isLoading?: boolean
}

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 8,
}

function GallerySkeleton() {
  return (
    <div className="w-full">
      <div className="hidden gap-3 md:flex">
        <div className="w-20 space-y-2 xl:w-24">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-[400px] flex-1 rounded-lg xl:h-[480px]" />
      </div>

      <div className="space-y-3 md:hidden">
        <Skeleton className="aspect-[4/3] w-full rounded-lg" />
        <div className="flex gap-2 px-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-24 flex-shrink-0 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function VehicleGallery({
  images,
  className = "w-full",
  isLoading = false,
}: VehicleGalleryProps) {
  // Separate swiper states for desktop and mobile
  const [desktopThumbsSwiper, setDesktopThumbsSwiper] = useState<any>(null)
  const [mobileThumbsSwiper, setMobileThumbsSwiper] = useState<any>(null)

  // Navigation refs
  const desktopPrevRef = useRef<HTMLButtonElement>(null)
  const desktopNextRef = useRef<HTMLButtonElement>(null)
  const thumbPrevRef = useRef<HTMLButtonElement>(null)
  const thumbNextRef = useRef<HTMLButtonElement>(null)
  const mobilePrevRef = useRef<HTMLButtonElement>(null)
  const mobileNextRef = useRef<HTMLButtonElement>(null)

  if (isLoading) {
    return <GallerySkeleton />
  }

  return (
    <div className={className}>
      {/* Desktop Layout */}
      <div className="hidden flex-row gap-3 md:flex">
        {/* Vertical Thumbnails */}
        <div className="relative w-20 flex-shrink-0 xl:w-24">
          <div className="absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-background to-transparent" />

          <Button
            variant="secondary"
            ref={thumbPrevRef}
            size="icon"
            className="absolute left-1/2 top-1 z-20 -translate-x-1/2 shadow-md transition-all duration-300 focus:ring-0 disabled:opacity-0"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            ref={thumbNextRef}
            size="icon"
            className="absolute bottom-1 left-1/2 z-20 -translate-x-1/2 shadow-md transition-all duration-300 focus:ring-0 disabled:opacity-0"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>

          <div className="h-[400px] overflow-hidden xl:h-[480px]">
            <Swiper
              id="desktopThumbs"
              direction="vertical"
              freeMode={true}
              modules={[Navigation, Thumbs, FreeMode]}
              observer={true}
              slidesPerView={4}
              spaceBetween={8}
              navigation={{
                prevEl: thumbPrevRef.current!,
                nextEl: thumbNextRef.current!,
              }}
              onSwiper={setDesktopThumbsSwiper}
              observeParents={true}
              watchSlidesProgress={true}
              className="thumbs-gallery h-full !pb-10 !pt-10"
              slideToClickedSlide={true}
            >
              {images?.map((item, index) => (
                <SwiperSlide
                  key={`desktop-thumb-${index}`}
                  className="relative !h-20 cursor-pointer rounded-lg transition hover:opacity-75 xl:!h-24 [&.swiper-slide-thumb-active]:border-2 [&.swiper-slide-thumb-active]:border-secondary-foreground [&.swiper-slide-thumb-active]:shadow-md"
                >
                  <Image
                    fill
                    src={item.url}
                    alt={item.alt}
                    className="rounded-lg object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Main Gallery - Desktop */}
        <div className="relative flex-1 overflow-hidden">
          <Swiper
            id="desktopGallery"
            speed={400}
            allowTouchMove={true}
            navigation={{
              prevEl: desktopPrevRef.current!,
              nextEl: desktopNextRef.current!,
            }}
            thumbs={{
              swiper:
                desktopThumbsSwiper && !desktopThumbsSwiper.destroyed
                  ? desktopThumbsSwiper
                  : null,
            }}
            modules={[Navigation, Thumbs, FreeMode]}
            {...swiperParams}
            className="h-[400px] xl:h-[480px]"
          >
            {images?.map((item, index) => (
              <SwiperSlide
                key={`desktop-gallery-${index}`}
                className="relative flex items-center justify-center bg-background"
              >
                <Image
                  fill
                  src={item.url}
                  alt={item.alt}
                  className="rounded-lg object-cover"
                  priority={index === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div>
            <Button
              variant="secondary"
              ref={desktopPrevRef}
              size="icon"
              className="absolute left-4 top-1/2 z-10 flex -translate-y-1/2 opacity-80 shadow-md transition-all duration-300 focus:ring-0 disabled:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              ref={desktopNextRef}
              size="icon"
              className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 opacity-80 shadow-md transition-all duration-300 focus:ring-0 disabled:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col gap-3 md:hidden">
        {/* Main Gallery - Mobile */}
        <div className="relative w-full overflow-hidden">
          <Swiper
            id="mobileGallery"
            speed={400}
            allowTouchMove={true}
            navigation={{
              prevEl: mobilePrevRef.current!,
              nextEl: mobileNextRef.current!,
            }}
            thumbs={{
              swiper:
                mobileThumbsSwiper && !mobileThumbsSwiper.destroyed
                  ? mobileThumbsSwiper
                  : null,
            }}
            modules={[Navigation, Thumbs, FreeMode]}
            {...swiperParams}
            className="aspect-[4/3]"
          >
            {images?.map((item, index) => (
              <SwiperSlide
                key={`mobile-gallery-${index}`}
                className="relative flex items-center justify-center bg-background"
              >
                <Image
                  fill
                  src={item.url}
                  alt={item.alt}
                  className="rounded-lg object-cover"
                  priority={index === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Button
            variant="secondary"
            ref={mobilePrevRef}
            size="icon"
            className="absolute left-4 top-1/2 z-10 flex -translate-y-1/2 opacity-80 shadow-md transition-all duration-300 focus:ring-0 disabled:opacity-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            ref={mobileNextRef}
            size="icon"
            className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 opacity-80 shadow-md transition-all duration-300 focus:ring-0 disabled:opacity-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Horizontal Thumbnails - Mobile */}
        <div className="relative w-full">
          {/* Gradient Fades */}
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />

          {/* Navigation Buttons */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 opacity-80 shadow-md transition-all duration-300 focus:ring-0 disabled:opacity-0"
            onClick={() => mobileThumbsSwiper?.slidePrev()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 opacity-80 shadow-md transition-all duration-300 focus:ring-0 disabled:opacity-0"
            onClick={() => mobileThumbsSwiper?.slideNext()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Swiper
            id="mobileThumbs"
            freeMode={true}
            modules={[Navigation, Thumbs, FreeMode]}
            observer={true}
            spaceBetween={8}
            slidesPerView="auto"
            onSwiper={setMobileThumbsSwiper}
            observeParents={true}
            watchSlidesProgress={true}
            slideToClickedSlide={true}
            className="thumbs-gallery h-24 !px-12"
            breakpoints={{
              0: {
                slidesPerView: 3.5,
              },
              380: {
                slidesPerView: 4.5,
              },
              520: {
                slidesPerView: 5.5,
              },
            }}
          >
            {images?.map((item, index) => (
              <SwiperSlide
                key={`mobile-thumb-${index}`}
                className="relative h-full w-full cursor-pointer overflow-hidden rounded-lg transition hover:opacity-75 [&.swiper-slide-thumb-active]:border-2 [&.swiper-slide-thumb-active]:border-secondary-foreground [&.swiper-slide-thumb-active]:shadow-md"
              >
                <Image
                  fill
                  src={item.url}
                  alt={item.alt}
                  className="rounded-lg object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
