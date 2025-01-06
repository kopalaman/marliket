"use client"

import { Button } from "@/components/ui/button"
import BlockLoader from "@/components/ui/loaders/block-loader"
import Section from "@/components/ui/section"
import {
  Autoplay,
  Navigation,
  Swiper,
  SwiperSlide,
} from "@/components/ui/slider"
import { useTimeout } from "@/lib/hooks/use-timeout"
import { ChevronLeft, ChevronRight, PlayIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Latest Car News Section
const LatestCarNews = () => {
  const { state } = useTimeout()

  const latestNews = [
    {
      title: "The 10 biggest updates on Carzone in 2024",
      imageId: "1015",
      date: "2024-01-15",
    },
    {
      title: "New Audi A5 Sportback review",
      imageId: "1016",
      date: "2024-01-14",
    },
    {
      title:
        "First drive: Why the Volkswagen Golf is the best new hot hatch you can buy",
      imageId: "1018",
      date: "2024-01-13",
    },
    {
      title:
        "First drive: Why the Volkswagen Golf is the best new hot hatch you can buy",
      imageId: "1019",
      date: "2024-01-13",
    },
    {
      title:
        "First drive: Why the Volkswagen Golf is the best new hot hatch you can buy",
      imageId: "1028",
      date: "2024-01-13",
    },
    {
      title:
        "First drive: Why the Volkswagen Golf is the best new hot hatch you can buy",
      imageId: "1020",
      date: "2024-01-13",
    },
  ]

  return (
    <Section
      className="group/section lg:container-fluid mt-12 overflow-hidden pl-4 sm:pl-6 lg:mt-16"
      title="Latest Car News"
      headerClassName="items-end mb-4 lg:mb-5 xl:mb-6"
      rightElement={<Button variant="secondary">View All</Button>}
    >
      {!state && <BlockLoader />}
      {state && (
        <div className="car-news relative">
          <Swiper
            loop={true}
            modules={[Navigation, Autoplay]}
            autoplay={true}
            slidesPerView={3}
            spaceBetween={20}
            navigation={{
              nextEl: ".news-button-next",
              prevEl: ".news-button-prev",
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
            {latestNews.map((news, index) => (
              <SwiperSlide key={`news-${index}`}>
                <Link href="#" className="group/item block">
                  <div className="relative h-[360px] overflow-hidden rounded-lg">
                    <Image
                      src={`https://picsum.photos/id/${news.imageId}/800/450`}
                      alt={news.title}
                      fill
                      sizes="(min-width: 320) 100vw, 100vw"
                      className="relative z-0 rounded-lg bg-muted object-cover transition-all duration-500 group-hover/item:scale-110"
                    />
                    <div className="absolute bottom-0 z-10 h-1/3 w-full bg-gradient-to-t from-gray-900/90 to-transparent transition-all duration-500 group-hover/item:h-1/2 dark:from-gray-950/90" />
                    <div className="absolute bottom-0 z-20 p-6">
                      <h3 className="mb-2 line-clamp-2 text-xl font-bold leading-7 text-white">
                        {news.title}
                      </h3>
                      <p className="text-sm font-normal text-white/80">
                        {news.date}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <NavigationButtons prefix="news" />
        </div>
      )}
    </Section>
  )
}

// In-depth Reviews Section with Grid Background
const InDepthReviews = () => {
  const { state } = useTimeout()

  const reviews = [
    {
      title: "Kia Sportage Review",
      imageId: "1020",
      rating: "9/10",
    },
    {
      title: "Hyundai Tucson Review",
      imageId: "1021",
      rating: "8/10",
    },
    {
      title: "Tesla Model Y Review",
      imageId: "1022",
      rating: "9/10",
    },
    {
      title: "Tesla Model X Review",
      imageId: "1023",
      rating: "9/10",
    },
    {
      title: "Toyota Allion Review",
      imageId: "1024",
      rating: "6/10",
    },
  ]

  return (
    <Section
      className="group/section mt-12 overflow-hidden lg:mt-16"
      title="Popular In-depth Reviews"
      headerClassName="items-end mb-4 lg:mb-5 xl:mb-6 px-4 sm:px-6"
      rightElement={<Button variant="secondary">View All</Button>}
    >
      <div className="relative bg-gray-50 py-8 dark:bg-gray-900">
        <div className="absolute inset-0 bg-grid-gray-900/5 dark:bg-grid-gray-100/5" />
        <div className="relative px-4 sm:px-6">
          {!state && <BlockLoader />}
          {state && (
            <div className="reviews relative">
              <Swiper
                loop={true}
                modules={[Navigation, Autoplay]}
                autoplay={true}
                slidesPerView={4}
                spaceBetween={20}
                navigation={{
                  nextEl: ".reviews-button-next",
                  prevEl: ".reviews-button-prev",
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
                {reviews.map((review, index) => (
                  <SwiperSlide key={`review-${index}`}>
                    <Link href="#" className="group/item block">
                      <div className="relative h-[360px] overflow-hidden rounded-lg">
                        <Image
                          src={`https://picsum.photos/id/${review.imageId}/800/450`}
                          alt={review.title}
                          fill
                          sizes="(min-width: 320) 100vw, 100vw"
                          className="relative z-0 rounded-lg bg-muted object-cover transition-all duration-500 group-hover/item:scale-110"
                        />
                        <div className="absolute bottom-0 z-10 h-1/3 w-full bg-gradient-to-t from-gray-900/90 to-transparent transition-all duration-500 group-hover/item:h-1/2 dark:from-gray-950/90" />
                        <span className="absolute right-2 top-2 z-20 rounded bg-green-500 px-2 py-1 text-sm font-medium text-white">
                          {review.rating}
                        </span>
                        <div className="absolute bottom-0 z-20 p-6">
                          <h3 className="line-clamp-2 text-xl font-bold leading-7 text-white">
                            {review.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              <NavigationButtons prefix="reviews" />
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

// Latest Car Videos Section
const CarVideos = () => {
  const { state } = useTimeout()

  const videos = [
    {
      title: "The striking difference between a car and a bike reviewed!",
      imageId: "1024",
      duration: "10:24",
    },
    {
      title: "BMW M8 V20 vs M AM5 E55 vs V90 Audi RS8",
      imageId: "1025",
      duration: "15:30",
    },
    {
      title: "Porsche Taycan Turbo GT vs Ferrari SF90 vs Rimac 918M",
      imageId: "1026",
      duration: "12:45",
    },
    {
      title: "Vitz 2022 vs Vitz 2023 vs Vitz 2024",
      imageId: "1027",
      duration: "12:45",
    },
    {
      title: "Toyota Land Cruiser 2022 vs 2023 vs 2024",
      imageId: "1028",
      duration: "12:45",
    },
    {
      title: "Ford Ranger 2023",
      imageId: "1029",
      duration: "12:45",
    },
  ]

  return (
    <Section
      className="group/section lg:container-fluid my-12 overflow-hidden pl-4 sm:pl-6 lg:my-16"
      title="Latest Car Videos"
      headerClassName="items-end mb-4 lg:mb-5 xl:mb-6"
      rightElement={<Button variant="secondary">View All</Button>}
    >
      {!state && <BlockLoader />}
      {state && (
        <div className="videos relative">
          <Swiper
            loop={true}
            modules={[Navigation, Autoplay]}
            autoplay={true}
            slidesPerView={3}
            spaceBetween={20}
            navigation={{
              nextEl: ".videos-button-next",
              prevEl: ".videos-button-prev",
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
            {videos.map((video, index) => (
              <SwiperSlide key={`video-${index}`}>
                <Link href="#" className="group/item block">
                  <div className="relative h-[360px] overflow-hidden rounded-lg">
                    <Image
                      src={`https://picsum.photos/id/${video.imageId}/800/450`}
                      alt={video.title}
                      fill
                      sizes="(min-width: 320) 100vw, 100vw"
                      className="relative z-0 rounded-lg bg-muted object-cover transition-all duration-500 group-hover/item:scale-110"
                    />
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <PlayIcon className="size-10 fill-red-600 text-transparent" />
                    </div>
                    <div className="absolute bottom-0 z-10 h-1/3 w-full bg-gradient-to-t from-gray-900/90 to-transparent transition-all duration-500 group-hover/item:h-1/2 dark:from-gray-950/90" />
                    <span className="absolute bottom-20 right-6 z-20 rounded bg-black/80 px-2 py-1 text-sm text-white">
                      {video.duration}
                    </span>
                    <div className="absolute bottom-0 z-20 p-6">
                      <h3 className="line-clamp-2 text-xl font-bold leading-7 text-white">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <NavigationButtons prefix="videos" />
        </div>
      )}
    </Section>
  )
}

// Reusable Navigation Buttons Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavigationButtons = ({ prefix }: any) => (
  <>
    <Button
      variant="secondary"
      className={`${prefix}-button-prev invisible absolute left-[25px] top-1/2 z-10 flex -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:left-0`}
    >
      <ChevronLeft className="h-auto w-5" />
    </Button>
    <Button
      variant="secondary"
      className={`${prefix}-button-next invisible absolute right-[25px] top-1/2 z-10 flex -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:right-4`}
    >
      <ChevronRight className="h-auto w-5" />
    </Button>
  </>
)

// Export all sections
export { CarVideos, InDepthReviews, LatestCarNews }
