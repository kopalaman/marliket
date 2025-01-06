"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface TestimonialCardSkeletonProps {
  className?: string
}

export function TestimonialCardSkeleton({
  className,
}: TestimonialCardSkeletonProps) {
  return (
    <div
      className={`relative flex h-auto max-w-[22rem] select-none flex-col items-start justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      {/* Gradient blur effect */}
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 opacity-10 blur-3xl dark:from-gray-100 dark:to-gray-200"></div>

      {/* Header with avatar and details */}
      <div className="mb-0 flex h-fit w-full flex-row items-center gap-3">
        {/* Avatar skeleton */}
        <Skeleton className="h-12 w-12 rounded-full border-2 border-gray-100 dark:border-gray-800" />

        {/* Name and profession details */}
        <div className="mb-0 flex h-fit flex-col items-start space-y-2">
          <Skeleton className="h-5 w-32" /> {/* Name */}
          <Skeleton className="h-4 w-24" /> {/* Profession */}
          <Skeleton className="h-4 w-20" /> {/* Location */}
        </div>
      </div>

      {/* Description skeleton */}
      <div className="mt-3 w-full space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}

// For multiple skeletons
export function TestimonialSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-6">
      <TestimonialCardSkeleton />
      <TestimonialCardSkeleton className="hidden sm:block" />
      <TestimonialCardSkeleton className="hidden md:block" />
      <TestimonialCardSkeleton className="hidden xl:block" />
    </div>
  )
}
