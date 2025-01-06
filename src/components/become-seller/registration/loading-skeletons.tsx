"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const SellerTypeSkeleton = () => {
  return (
    <div className="w-full max-w-3xl space-y-8">
      <div className="space-y-4 text-center">
        <Skeleton className="mx-auto h-8 w-64" />
        <Skeleton className="mx-auto h-4 w-96" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i} className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
              <div className="w-full space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton key={j} className="h-3 w-full" />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export const IndividualInfoSkeleton = () => {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <Skeleton className="h-20 w-full" />
        </div>
      </Card>

      <div className="flex justify-between">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}

export const AddressInfoSkeleton = () => {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-6" />
          </div>
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

export const ReviewSkeleton = () => {
  return (
    <div className="w-full max-w-2xl space-y-8">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-16" />
            </div>
            <div className="space-y-4">
              {[1, 2].map((j) => (
                <div key={j} className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-6 w-6" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}

      <div className="space-y-4">
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
    </div>
  )
}

export const BusinessInfoSkeleton = () => {
  return (
    <div className="w-full max-w-2xl space-y-8">
      {/* Business Details Card */}
      <Card className="p-6">
        <div className="space-y-6">
          {/* Logo Upload Area */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center justify-center">
              <Skeleton className="h-32 w-32 rounded-full" />
            </div>
          </div>

          {/* Business Name and Registration */}
          <div className="space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Registration Number */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Tax PIN */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Details Card */}
      <Card className="p-6">
        <div className="space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Business Email */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Business Phone */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Optional Fields */}
          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Dealer License */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* VAT Number */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </Card>

      {/* Document Upload Placeholder */}
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-800"
              >
                <div className="flex flex-col items-center space-y-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}
