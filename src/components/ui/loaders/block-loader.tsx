"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface BlockTypes {
  className?: string
}

function Block({ className }: BlockTypes) {
  return (
    <Skeleton className={`aspect-[400/460] w-full rounded-xl ${className}`} />
  )
}

export default function BlockLoader() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-6">
      <Block />
      <Block className="hidden sm:block" />
      <Block className="hidden md:block" />
      <Block className="hidden xl:block" />
    </div>
  )
}
