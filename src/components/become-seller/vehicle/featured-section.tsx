"use client"

import { cn } from "@/lib/utils"
import React from "react"

export function FeaturesSection() {
  const features = [
    {
      title: "Smart Listing Management",
      description:
        "Easily manage your vehicle listings with our intuitive dashboard. Upload photos, set prices, and track inquiries all in one place.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Advanced Photo Tools",
      description:
        "Showcase your vehicles with our professional photo tools. Highlight key features and create stunning visual presentations.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Real-Time Market Updates",
      description:
        "Stay informed with real-time market analytics and pricing trends to optimize your listings and maximize sales.",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
      title: "Instant Buyer Connection",
      description:
        "Connect with verified buyers instantly through our secure messaging system and automated inquiry management.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ]

  return (
    <div className="relative z-20 mx-auto max-w-7xl py-8 lg:py-32">
      <div className="px-8">
        <h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight lg:text-5xl lg:leading-tight">
          Post your vehicles and reach millions of potential buyers
        </h4>

        <p className="mx-auto my-4 max-w-2xl text-center text-sm font-normal text-neutral-500 dark:text-neutral-300 lg:text-base">
          Join thousands of successful sellers on our platform. List your
          vehicles and reach millions of potential buyers everytime.
        </p>
      </div>

      <div className="relative">
        <div className="mt-12 grid grid-cols-1 rounded-lg bg-background dark:border-gray-800 lg:grid-cols-6 xl:border">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn(`relative overflow-hidden p-4 sm:p-8`, className)}>
      {children}
    </div>
  )
}

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="mx-auto max-w-5xl text-left text-xl tracking-tight md:text-2xl md:leading-snug">
      {children}
    </p>
  )
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "mx-auto max-w-4xl text-left text-sm md:text-base",
        "text-center font-normal text-gray-500 dark:text-gray-300",
        "mx-0 my-2 max-w-sm text-left md:text-sm"
      )}
    >
      {children}
    </p>
  )
}

const SkeletonOne = () => {
  return (
    <div className="relative flex h-full gap-10 px-2 py-8">
      <div className="group mx-auto h-full w-full bg-background p-5 shadow-2xl">
        <div className="flex h-full w-full flex-1 flex-col space-y-2">
          <div className="flex flex-col gap-4">
            <div className="h-40 w-full rounded-lg bg-gray-100 dark:bg-gray-800"></div>
            <div className="flex gap-2">
              <div className="h-20 w-1/3 rounded-lg bg-gray-100 dark:bg-gray-800"></div>
              <div className="h-20 w-1/3 rounded-lg bg-gray-100 dark:bg-gray-800"></div>
              <div className="h-20 w-1/3 rounded-lg bg-gray-100 dark:bg-gray-800"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SkeletonTwo = () => {
  const images = [
    "/car1.jpg",
    "/car2.jpg",
    "/car3.jpg",
    "/car4.jpg",
    "/car5.jpg",
  ]

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  }

  return (
    <div className="relative flex h-full flex-col items-start gap-10 overflow-hidden p-8">
      {/* Photo gallery preview */}
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((_, idx) => (
          <div
            key={idx}
            className="h-24 w-24 rounded-lg bg-gray-100 dark:bg-gray-800"
          ></div>
        ))}
      </div>
    </div>
  )
}

const SkeletonThree = () => {
  return (
    <div className="relative flex h-full flex-col gap-4 p-4">
      <div className="h-32 w-full rounded-lg bg-gray-100 dark:bg-gray-800"></div>
      <div className="flex gap-2">
        <div className="h-16 w-1/2 rounded-lg bg-gray-100 dark:bg-gray-800"></div>
        <div className="h-16 w-1/2 rounded-lg bg-gray-100 dark:bg-gray-800"></div>
      </div>
    </div>
  )
}

const SkeletonFour = () => {
  return (
    <div className="relative flex h-full flex-col gap-4 p-4">
      <div className="flex gap-2">
        <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800"></div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-4 w-3/4 rounded bg-gray-100 dark:bg-gray-800"></div>
          <div className="h-4 w-1/2 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
      </div>
      <div className="h-24 w-full rounded-lg bg-gray-100 dark:bg-gray-800"></div>
    </div>
  )
}
