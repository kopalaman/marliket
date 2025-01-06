// components/registration/steps/SellerType.tsx
"use client"

import { registrationAtom, StepAtom } from "@/atoms/registration"
import { Card } from "@/components/ui/card"
import { SellerType } from "@/types/seller-registration"
import { motion } from "framer-motion"
import { useAtom, useSetAtom } from "jotai"
import { Building2, UserCircle } from "lucide-react"

export default function SellerTypeSelection() {
  const [registration, setRegistration] = useAtom(registrationAtom)
  const setStep = useSetAtom(StepAtom)

  const handleTypeSelect = (type: SellerType) => {
    setRegistration((prev) => ({
      ...prev,
      sellerType: type,
    }))
    setStep(2)
  }

  const types = [
    {
      id: "individual",
      title: "Individual Seller",
      description: "Sell vehicles as an individual",
      icon: UserCircle,
      benefits: [
        "Quick verification process",
        "Simple documentation",
        "Personal dashboard",
        "Basic selling tools",
      ],
    },
    {
      id: "business",
      title: "Business Seller",
      description: "Sell as a dealership or company",
      icon: Building2,
      benefits: [
        "Multiple user accounts",
        "Advanced analytics",
        "Bulk listing tools",
        "Priority support",
      ],
    },
  ]

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold">Select Seller Type</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose how you want to sell on our platform
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {types.map((type) => {
          const Icon = type.icon
          return (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer p-6 transition-colors ${
                  registration.sellerType === type.id
                    ? "border-gray-900 dark:border-gray-100"
                    : "hover:border-gray-300 dark:hover:border-gray-700"
                }`}
                onClick={() => handleTypeSelect(type.id as SellerType)}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className="mb-4 h-12 w-12 text-gray-900 dark:text-gray-100" />
                  <h3 className="mb-2 text-lg font-semibold">{type.title}</h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {type.description}
                  </p>
                  <ul className="w-full space-y-2 text-left text-sm">
                    {type.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-gray-100" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
