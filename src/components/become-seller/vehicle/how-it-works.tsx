"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Camera, ClipboardCheck, DollarSign, MessageSquare } from "lucide-react"

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: Camera,
      title: "List Your Vehicle",
      description: "Take photos, add detailed description, and set your price",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-500 dark:text-blue-400",
      label: "Step 1",
      features: [
        "Multiple photo uploads",
        "Market price suggestions",
        "Instant listing preview",
      ],
    },
    {
      id: 2,
      icon: MessageSquare,
      title: "Connect with Buyers",
      description: "Receive inquiries and manage communications easily",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-500 dark:text-purple-400",
      label: "Step 2",
      features: ["In-app messaging", "Buyer verification", "Schedule viewings"],
    },
    {
      id: 3,
      icon: ClipboardCheck,
      title: "Verify Documents",
      description: "Handle paperwork and verify documentation online",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-500 dark:text-green-400",
      label: "Step 3",
      features: [
        "Digital document upload",
        "Vehicle history reports",
        "Title verification",
      ],
    },
    {
      id: 4,
      icon: DollarSign,
      title: "Close the Deal",
      description: "Complete the sale with secure payment processing",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-500 dark:text-orange-400",
      label: "Step 4",
      features: ["Secure payments", "Transfer support", "Sale completion"],
    },
  ]

  return (
    <div className="bg-white px-6 dark:bg-gray-950 sm:pb-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Learn How to Start Selling
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Here are some steps to help you get started with listing on our
            platform.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center"
              >
                <Card className="relative h-full w-full border-gray-200 bg-white/50 transition-all duration-200 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700">
                  <CardContent className="flex flex-col items-center p-6">
                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div
                        className={`flex h-24 w-24 items-center justify-center rounded-full ${step.bgColor} transition-transform hover:scale-105`}
                      >
                        <Icon className={`h-12 w-12 ${step.textColor}`} />
                      </div>
                      {/* Step Label */}
                      <span
                        className={`absolute -right-2 -top-2 rounded-full ${step.bgColor} px-3 py-1 text-sm font-medium ${step.textColor}`}
                      >
                        {step.label}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400"
                        >
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-gray-100" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
