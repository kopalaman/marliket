"use client"

import {
  Autoplay,
  Navigation,
  Swiper,
  SwiperSlide,
} from "@/components/ui/slider"

import Section from "@/components/ui/section"
import { useTimeout } from "@/lib/hooks/use-timeout"
import { ChevronLeft, ChevronRight } from "lucide-react"

import Image from "next/image"
import { FC } from "react"
import { Button } from "../ui/button"
import { TestimonialSkeletonGrid } from "../ui/loaders/testimonial-block-loader"

const TestimonialBlock = () => {
  const { state } = useTimeout()

  const testimonials = [
    {
      name: "David Chen",
      description:
        "As a car dealer, this platform has transformed how we sell vehicles. The inventory management tools and buyer reach are exceptional. We've seen a 40% increase in sales.",
      profession: "Car Dealership Owner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      location: "Lusaka, Zambia",
    },
    {
      name: "Sarah Williams",
      profession: "Independent Car Seller",
      description:
        "Sold my BMW in just 2 weeks! The platform made it easy to list, communicate with buyers, and handle the paperwork. The pricing suggestions were spot-on.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      location: "Nairobi, Kenya",
    },
    {
      name: "Michael Rodriguez",
      profession: "Vintage Car Specialist",
      description:
        "Perfect for classic car sales. The detailed listing options help showcase vehicle history and special features. Connected with serious collectors quickly.",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      location: "Cape Town, South Africa",
    },
    {
      name: "Emma Thompson",
      profession: "Fleet Manager",
      description:
        "Managing our company's vehicle fleet sales has never been easier. The bulk listing tools and analytics dashboard save us hours of work every week.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      location: "copperbelt, Zambia",
    },
    {
      name: "James Wilson",
      profession: "Automotive Dealer",
      description:
        "The verification system gives buyers confidence, and the secure payment process protects both parties. We've reduced our selling time by 50%.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      location: "Ndola, Zambia",
    },
    {
      name: "Lisa Anderson",
      profession: "Car Import Specialist",
      description:
        "The platform's international reach helped us expand our import business. The multi-language support and currency conversion make selling across borders simple.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      location: "Lusaka, Zambia",
    },
  ]

  return (
    <Section
      className="group/section lg:container-fluid my-12 overflow-hidden pl-4 sm:pl-6 lg:my-16"
      title="Testimonials"
      description="What Our Users Say"
      headerClassName="items-end mb-4 lg:mb-5 xl:mb-6"
    >
      {!state && <TestimonialSkeletonGrid />}
      {state && (
        <div className="testimonial relative">
          <Swiper
            loop={true}
            modules={[Navigation, Autoplay]}
            autoplay={true}
            slidesPerView={4}
            spaceBetween={12}
            navigation={{
              nextEl: ".testimonial-button-next",
              prevEl: ".testimonial-button-prev",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.6,
              },
              480: {
                slidesPerView: 2,
              },
              580: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              840: {
                slidesPerView: 3.2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {testimonials?.map((testimonial, index) => (
              <SwiperSlide key={`testimonial-${index}`}>
                <TestimonialCard key={testimonial.name} {...testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Button
            variant={"secondary"}
            className="testimonial-button-prev invisible absolute left-[25px] top-1/2 z-10 flex -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:left-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <ChevronLeft className="h-auto w-5" />
          </Button>
          <Button
            variant={"secondary"}
            className="testimonial-button-next invisible absolute right-[25px] top-1/2 z-10 flex -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:right-4 sm:group-hover/section:right-6 lg:group-hover/section:-right-[19px]"
          >
            <ChevronRight className="h-auto w-5" />
          </Button>
        </div>
      )}
    </Section>
  )
}

export default TestimonialBlock

interface TestimonialCardProps {
  name: string
  description: string
  image: string
  profession: string
  location?: string
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  name,
  description,
  image,
  profession,
  location,
}) => {
  return (
    <div
      className={`relative flex h-auto max-w-[22rem] select-none flex-col items-start justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-gray-800/30`}
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 opacity-10 blur-3xl dark:from-gray-100 dark:to-gray-200"></div>
      <div className="mb-0 flex h-fit flex-row items-center gap-3">
        <Image
          className="m-0 block h-12 w-12 rounded-full border-2 border-gray-100 object-cover dark:border-gray-800"
          src={image}
          alt={name}
          width={48}
          height={48}
        />
        <div className="mb-0 flex h-fit flex-col items-start">
          <h3 className="m-0 text-base font-medium text-gray-900 dark:text-gray-100">
            {name}
          </h3>
          <p className="m-0 text-sm text-gray-600 dark:text-gray-400">
            {profession}
          </p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
      <p className="mb-0 mt-3 text-left text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}
