"use client"

import type { ServiceTypes } from "@/types"
import Image from "next/image"
import Link from "next/link"

export default function ServiceCard({
  thumbnail,
  slug,
  name,
  description,
}: ServiceTypes) {
  return (
    <Link
      href={slug}
      className="group/item relative flex aspect-auto h-[300px] w-full flex-col overflow-hidden rounded-lg lg:h-[340px] 2xl:h-[380px] 4xl:h-[460px]"
    >
      <Image
        src={thumbnail}
        alt="service type"
        fill
        sizes="(min-width: 320) 100vw, 100vw"
        className="relative z-0 rounded-lg bg-muted object-cover transition-all duration-500 group-hover/item:scale-110"
      />
      <div className="absolute bottom-0 z-10 h-1/4 w-full bg-gradient-to-t from-gray-950/90 to-gray-950/0 transition-all duration-500 group-hover/item:h-1/2 3xl:from-gray-950/60"></div>
      <div className="relative z-10 mt-auto px-6 pb-6 md:px-7 md:pb-7 3xl:px-9 3xl:pb-9 4xl:px-12 4xl:pb-12">
        <h3 className="text-xl font-bold leading-7 text-white 3xl:text-2xl">
          {name}
        </h3>
        <p className="text-sm font-normal leading-7 text-white lg:text-base 3xl:pt-1.5 4xl:text-lg">
          {description}
        </p>
      </div>
    </Link>
  )
}
