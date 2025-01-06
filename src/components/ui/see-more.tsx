"use client"

import clsx from "clsx"
import Link from "next/link"

export default function SeeMore({
  className,
  url,
}: {
  className?: string
  url: string
}) {
  return (
    <Link
      href={url}
      className={clsx(
        "inline-block whitespace-nowrap pr-4 text-sm font-bold leading-6 text-muted-foreground hover:underline sm:pr-6 md:text-base lg:pr-0",
        className
      )}
    >
      See More
    </Link>
  )
}
