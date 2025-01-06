"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Navigation,
  Pagination,
  Swiper,
  SwiperSlide,
} from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import clsx from "clsx"
import {
  CheckCircle,
  ChevronLeftIcon,
  ChevronRightIcon,
  Shield,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import AddToWishlist from "@/components/add-to-wishlist"
import Rate from "@/components/ui/rating"
import { Routes } from "@/config/routes"
import { Button } from "../button"

interface VehicleCardProps {
  id: string
  slides: string[]
  title: string
  slug: string
  location: string
  price: string
  rating: number
  ratingCount: string
  seller: {
    id: string
    name: string
    avatar: string
    verified: boolean
  }
  isInspected: boolean
  specs?: {
    // Made optional with ?
    mileage: string
    transmission: string
    fuelType: string
    color: string
  }
}

export default function VehicleCard({
  id,
  slides,
  title,
  slug,
  location,
  price,
  rating,
  ratingCount,
  seller,
  isInspected,
}: VehicleCardProps) {
  // Create valid selectors by adding a prefix
  const nextBtnClass = `vehicle-${id}-next`
  const prevBtnClass = `vehicle-${id}-prev`
  return (
    <div className="listing-card group/item relative inline-flex w-full flex-col">
      {/* Image Slider Section */}
      <div className="relative w-full overflow-hidden rounded-xl">
        <AddToWishlist
          isWishListed={false}
          onClick={(data) => console.log("Item added to Wishlist.", data)}
        />
        <Link href={Routes.public.vehicleDetails(slug)}>
          <div className="listing-item after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-1/4 after:w-full after:bg-gradient-to-t after:from-black/25">
            <Swiper
              className="!static"
              modules={[Pagination, Navigation]}
              pagination={{
                clickable: true,
              }}
              slidesPerView={1}
              navigation={{
                // Use valid selectors with dots
                nextEl: `.${nextBtnClass}`,
                prevEl: `.${prevBtnClass}`,
              }}
            >
              {slides?.map((slide, index) => (
                <SwiperSlide key={`slide-${index}`}>
                  <Image
                    className="bg-gray-lighter aspect-[34/25]"
                    src={slide}
                    width={816}
                    height={600}
                    alt={title}
                    priority
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Navigation Arrows */}
            <Button
              size="sm"
              className={clsx(
                "absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 shadow-md !transition-all focus:!ring-0 md:invisible md:flex md:disabled:hidden md:group-hover/item:visible",
                `${prevBtnClass}`
              )}
            >
              <ChevronLeftIcon className="-ml-0.5 h-auto w-[7px]" />
            </Button>
            <Button
              size="sm"
              className={clsx(
                "absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 opacity-80 shadow-md !transition-all duration-300 focus:!ring-0 md:invisible md:flex md:disabled:hidden md:group-hover/item:visible md:group-hover/item:opacity-100",
                `${nextBtnClass} `
              )}
            >
              <ChevronRightIcon className="-mr-0.5 h-auto w-[7px]" />
            </Button>
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <Link href={Routes.public.vehicleDetails(slug)}>
        <div className="content pt-3">
          {/* Seller Info & Badges */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={seller.avatar} alt={seller.name} />
                <AvatarFallback>{seller.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium">{seller.name}</span>
                {seller.verified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Verified Seller</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
            {isInspected && (
              <Badge
                variant="secondary"
                className="flex items-center space-x-1"
              >
                <Shield className="h-3 w-3" />
                <span>Inspected</span>
              </Badge>
            )}
          </div>

          {/* Vehicle Details */}
          <h4 className="text-ellipsis text-gray-900 dark:text-gray-100 2xl:mb-1.5">
            {title}
          </h4>
          <p className="mb-3 text-gray-500 dark:text-gray-400 xl:mb-3">
            {location}
          </p>

          {/* Price & Rating */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-gray-500 dark:text-gray-400">
              <span className="font-bold text-gray-900 dark:text-gray-100 xl:text-[18px] 3xl:text-xl">
                {price}
              </span>{" "}
              avg/day
            </p>
            <div className="flex items-center gap-3 leading-7">
              <Rate
                allowHalf
                allowClear
                defaultValue={rating}
                characterClassName="h-[14px] w-[14px] 3xl:h-[18px] 3xl:w-[18px]"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({ratingCount})
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
