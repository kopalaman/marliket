"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Section from "@/components/ui/section"

export interface PricingTierFrequency {
  id: string
  value: string
  label: string
  priceSuffix: string
}

export interface PricingTier {
  name: string
  id: string
  href: string
  discountPrice: string | Record<string, string>
  price: string | Record<string, string>
  description: string | React.ReactNode
  features: string[]
  featured?: boolean
  highlighted?: boolean
  cta: string
  soldOut?: boolean
}

export const frequencies: PricingTierFrequency[] = [
  { id: "1", value: "1", label: "Monthly", priceSuffix: "/month" },
  { id: "2", value: "2", label: "Annually", priceSuffix: "/year" },
]

export const tiers: PricingTier[] = [
  {
    name: "Starter Free",
    id: "0",
    href: "/onboarding",
    price: { "1": "Free", "2": "Free" },
    discountPrice: { "1": "", "2": "" },
    description: `Start with our free plan and upgrade as you grow.`,
    features: [
      `Up to 2 vehicles listing`,
      `Basic view analytics`,
      `Single location listing`,
      `1 user included`,
      `Email support only`,

      `10% transaction fee`,
    ],
    featured: false,
    highlighted: false,
    soldOut: false,
    cta: `Get started`,
  },
  {
    name: "Basic",
    id: "1",
    href: "/subscribe",
    price: { "1": "$49.99", "2": "$588.88" },
    discountPrice: { "1": "", "2": "$517.44" },
    description: `When you are ready to grow your business.`,
    features: [
      `Everything in the starter plan plus`,
      `Up to 8 vehicles listing`,
      `2 users included`,
      `Email and chat support`,
      `Social media integration`,
      `Real-time notification system`,
      `7% transaction fee`,
    ],
    featured: true,
    highlighted: false,
    soldOut: false,
    cta: `Get started`,
  },
  {
    name: "Premium (coming soon)",
    id: "2",
    href: "/subscribe",
    price: { "1": "$149", "2": "$1,788" },
    discountPrice: { "1": "", "2": "$1,573.44" },
    description: `For small to medium businesses.`,
    features: [
      `Everything in the basic plan plus`,
      `Up to 20 vehicles listing`,
      `Advanced view analytics`,
      `3 users included`,
      `3 locations listing`,
      `Priority email and chat support`,
      `5% transaction fee`,
      `Featured listing add-on`,
      `premium marketing tools`,
    ],
    featured: false,
    highlighted: false,
    soldOut: true,
    cta: `Get started`,
  },
]

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-6 w-6", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function PricingPage() {
  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <Section
      title="Simple & Transparent Pricing"
      descriptionClassName="text-xs md:text-sm"
      description="Choose the plan that best suits your business needs"
      className="container-fluid pt-8 lg:pt-24"
      id="pricing"
    >
      <div className="flex flex-col items-center justify-center space-y-5 md:space-y-7">
        {/* Frequency Selector */}
        {frequencies.length > 1 && (
          <div className="my-12 flex justify-center">
            <RadioGroup
              defaultValue={frequency.value}
              onValueChange={(value: string) => {
                setFrequency(frequencies.find((f) => f.value === value)!)
              }}
              className="grid gap-x-1 rounded-lg border p-1 text-center text-xs font-semibold leading-5"
              style={{
                gridTemplateColumns: `repeat(${frequencies.length}, minmax(0, 1fr))`,
              }}
            >
              <Label className="sr-only">Payment frequency</Label>
              {frequencies.map((option) => (
                <Label
                  className={cn(
                    "cursor-pointer rounded-full px-2.5 py-2 transition-all",
                    frequency.value === option.value
                      ? "bg-muted"
                      : "text-muted-foreground"
                  )}
                  key={option.value}
                  htmlFor={option.value}
                >
                  {option.label}
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="hidden"
                  />
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div
          className={cn(
            "mx-auto grid max-w-[640px] gap-8 lg:mx-0 lg:max-w-full",
            "grid-cols-1 md:grid-cols-2",
            tiers.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          )}
        >
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "flex h-full flex-col rounded-lg p-8",
                tier.featured
                  ? "bg-gray-900 ring-2 ring-gray-900 dark:bg-gray-100 dark:ring-gray-100"
                  : "bg-white ring-1 ring-gray-300/70 dark:bg-gray-900/80 dark:ring-gray-700"
              )}
            >
              {/* Header */}
              <div className="mb-6">
                <h3
                  id={tier.id}
                  className={cn(
                    "text-2xl font-bold tracking-tight",
                    tier.featured
                      ? "text-white dark:text-black"
                      : "text-black dark:text-white"
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={cn(
                    "mt-4 text-sm leading-6",
                    tier.featured
                      ? "text-gray-400 dark:text-gray-500"
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  {tier.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <p className="flex items-baseline gap-x-1">
                  <span
                    className={cn(
                      "text-4xl font-bold tracking-tight",
                      tier.featured
                        ? "text-white dark:text-black"
                        : "text-black dark:text-white",
                      typeof tier.discountPrice === "object" &&
                        tier.discountPrice[frequency.value]
                        ? "line-through"
                        : ""
                    )}
                  >
                    {typeof tier.price === "string"
                      ? tier.price
                      : tier.price[frequency.value]}
                  </span>
                  {typeof tier.discountPrice === "object" &&
                    tier.discountPrice[frequency.value] && (
                      <span
                        className={cn(
                          tier.featured
                            ? "text-white dark:text-black"
                            : "text-black dark:text-white"
                        )}
                      >
                        {typeof tier.discountPrice === "object" &&
                          tier.discountPrice[frequency.value]}
                      </span>
                    )}
                  {typeof tier.price !== "string" && (
                    <span
                      className={cn(
                        "text-sm font-semibold leading-6",
                        tier.featured
                          ? "text-gray-500 dark:text-gray-400"
                          : "text-gray-600 dark:text-gray-400"
                      )}
                    >
                      {frequency.priceSuffix}
                    </span>
                  )}
                </p>
              </div>

              {/* Features List */}
              <div className="flex-grow">
                <ul
                  className={cn(
                    "space-y-3 text-sm leading-6",
                    tier.featured
                      ? "text-gray-300 dark:text-gray-500"
                      : "text-gray-700 dark:text-gray-400"
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className={cn(
                          "h-6 w-5 flex-none",
                          tier.featured ? "text-white dark:text-black" : "",
                          tier.highlighted ? "text-stone-500" : "text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={cn(
                    "block",
                    tier.soldOut ? "pointer-events-none" : ""
                  )}
                >
                  <Button
                    size="lg"
                    disabled={tier.soldOut}
                    className={cn(
                      "w-full text-black dark:text-white",
                      !tier.highlighted && !tier.featured
                        ? "bg-gray-100 dark:bg-gray-600"
                        : "bg-stone-300 hover:bg-stone-400 dark:bg-stone-600 dark:hover:bg-stone-700",
                      tier.featured || tier.soldOut
                        ? "bg-white hover:bg-gray-200 dark:bg-neutral-900 dark:hover:bg-black"
                        : "transition-opacity hover:opacity-80"
                    )}
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    {tier.soldOut ? "Coming soon" : tier.cta}
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <p>All plans include a 14-day free trial. You can cancel anytime</p>
          <p className="mt-2">
            Need custom features?{" "}
            <Button variant="link" className="h-auto p-0">
              Contact us
            </Button>
          </p>
        </div>
      </div>
    </Section>
  )
}
