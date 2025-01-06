"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface CardBlockLoaderProps {
  className?: string
}

function CardBlockLoader({ className }: CardBlockLoaderProps) {
  return (
    <div
      className={`listing-card group/item relative inline-flex w-full flex-col ${className}`}
    >
      {/* Image Slider Section */}
      <div className="relative w-full overflow-hidden rounded-xl">
        <Skeleton className="aspect-[34/25] w-full" />

        {/* Wishlist button skeleton */}
        <Skeleton className="absolute right-3 top-3 h-8 w-8 rounded-full" />
      </div>

      {/* Content Section */}
      <div className="content pt-3">
        {/* Seller Info & Badges */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Avatar */}
            <Skeleton className="h-8 w-8 rounded-full" />
            {/* Seller name */}
            <div className="flex items-center space-x-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />{" "}
              {/* Verified badge */}
            </div>
          </div>
          {/* Inspected badge */}
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Vehicle Details */}
        <div className="space-y-2">
          {/* Title */}
          <Skeleton className="h-5 w-full" />
          {/* Location */}
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Price & Rating */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <Skeleton className="h-6 w-20" /> {/* Price */}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[14px] w-[14px] rounded-full 3xl:h-[18px] 3xl:w-[18px]"
                />
              ))}
            </div>
            <Skeleton className="h-4 w-12" /> {/* Rating count */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ListingCardLoader() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
      <CardBlockLoader />
      <CardBlockLoader className="hidden sm:block" />
      <CardBlockLoader className="hidden lg:block" />
      <CardBlockLoader className="hidden xl:block" />
    </div>
  )
}
