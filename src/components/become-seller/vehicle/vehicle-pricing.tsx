"use client"

import { categoryAtom, planAtom, PlanType } from "@/atoms/registration"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useAtom } from "jotai"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

type PricingPlanType = {
  name: "Starter" | "Professional" | "Enterprise"
  description: string
  monthlyPrice: number
  annualPrice: number
  features: string[]
}[]

const pricingPlans: PricingPlanType = [
  {
    name: "Starter",
    description:
      "Perfect for individual sellers getting started with vehicle sales.",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Up to 2 vehicle listings",
      "Basic vehicle analytics",
      "Single location listing",
      "Email support only",
      "10% transaction fee",
      "Basic listing features",
      "Standard visibility",
    ],
  },
  {
    name: "Professional",
    description: "Ideal for small dealerships and growing vehicle businesses.",
    monthlyPrice: 49.99,
    annualPrice: 39.99,
    features: [
      "Up to 10 vehicle listings",
      "Advanced analytics dashboard",
      "Two location listings",
      "Priority email and chat support",
      "7% transaction fee",
      "Enhanced listing features",
      "Featured listings (2/month)",
      "Inventory management tools",
      "Customer inquiry management",
    ],
  },
  {
    name: "Enterprise",
    description: "Complete solution for established dealerships.",
    monthlyPrice: 149,
    annualPrice: 129,
    features: [
      "Unlimited vehicle listings",
      "Premium analytics & reports",
      "Multiple location support",
      "Dedicated support",
      "5% transaction fee",
      "Premium listing features",
      "Featured listings (unlimited)",
      "Advanced inventory system",
      "API access",
      "Custom branding options",
    ],
  },
]

const VehiclePricing = () => {
  const [billingCycle, setBillingCycle] = useState<"M" | "A">("M")

  const [, setPlan] = useAtom(planAtom)
  const [, setCategory] = useAtom(categoryAtom)
  const router = useRouter()

  const handlePlanSelect = ({
    name,
    billingCycle,
    monthlyPrice,
    annualPrice,
  }: PlanType) => {
    setPlan({ name, billingCycle, monthlyPrice, annualPrice })
    setCategory({ category: "vehicles" })
    router.push("/sell/register")
  }

  const Heading = () => (
    <div className="relative z-10 mb-12 flex flex-col items-center justify-center gap-4">
      <div className="flex w-full flex-col items-start justify-center space-y-4 md:items-center">
        <div className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase text-gray-900 dark:bg-gray-800 dark:text-gray-100">
          Pricing Plans
        </div>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Choose Your Vehicle Selling Plan
        </p>
        <p className="text-md max-w-xl text-gray-500 dark:text-gray-400 md:text-center">
          Select the perfect plan for your vehicle business needs with our
          flexible pricing options.
        </p>
      </div>
      <div className="flex items-center justify-center gap-3 rounded-lg bg-gray-100/50 p-1 dark:bg-gray-800/50">
        <button
          onClick={() => setBillingCycle("M")}
          className={cn(
            `rounded-md px-4 py-2 text-sm font-medium transition-colors`,
            billingCycle === "M"
              ? "relative bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
              : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          )}
        >
          Monthly
          {billingCycle === "M" && <BackgroundShift shiftKey="monthly" />}
        </button>
        <button
          onClick={() => setBillingCycle("A")}
          className={cn(
            `rounded-md px-4 py-2 text-sm font-medium transition-colors`,
            billingCycle === "A"
              ? "relative bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
              : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          )}
        >
          Annual
          {billingCycle === "A" && <BackgroundShift shiftKey="annual" />}
        </button>
      </div>
    </div>
  )

  const PricingCards = () => (
    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:gap-4">
      {pricingPlans.map((plan, index) => (
        <div
          key={index}
          className={cn(
            "w-full rounded-xl border p-6 text-left transition-all",
            "border-gray-200 dark:border-gray-800",
            "hover:border-gray-300 dark:hover:border-gray-700",
            "bg-white dark:bg-gray-900/50"
          )}
        >
          <p className="mb-1 mt-0 text-sm font-medium uppercase text-gray-900 dark:text-gray-100">
            {plan.name}
          </p>
          <p className="my-0 mb-6 text-sm text-gray-500 dark:text-gray-400">
            {plan.description}
          </p>
          <div className="mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={billingCycle === "M" ? "monthly" : "annual"}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="my-0 text-3xl font-semibold text-gray-900 dark:text-gray-100"
              >
                <span>
                  ${billingCycle === "M" ? plan.monthlyPrice : plan.annualPrice}
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  /{billingCycle === "M" ? "month" : "year"}
                </span>
              </motion.p>
            </AnimatePresence>
            <motion.button
              onClick={() =>
                handlePlanSelect({
                  name: plan.name,
                  billingCycle,
                  monthlyPrice: plan.monthlyPrice,
                  annualPrice: plan.annualPrice,
                })
              }
              whileTap={{ scale: 0.985 }}
              className={cn(
                "mt-8 w-full rounded-lg py-2 text-sm font-medium transition-colors",
                "bg-gray-900 text-white hover:bg-gray-800",
                "dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              )}
            >
              Get Started
            </motion.button>
          </div>
          <div className="space-y-3">
            {plan.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="relative w-full overflow-hidden py-12 lg:px-2 lg:py-12">
      <Heading />
      <PricingCards />
      <div className="pt-4 text-center text-sm text-muted-foreground">
        <p>All plans include a 7-day free trial. You can cancel anytime.</p>
        <p className="mt-2">
          Need custom features?{" "}
          <Button variant="link" className="h-auto p-0">
            Contact us
          </Button>
        </p>
      </div>
    </section>
  )
}

const BackgroundShift = ({ shiftKey }: { shiftKey: string }) => (
  <motion.span
    key={shiftKey}
    layoutId="bg-shift"
    className="absolute inset-0 -z-10 rounded-md bg-gray-900 dark:bg-gray-100"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
  />
)

export default VehiclePricing
