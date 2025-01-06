"use client"

import { motion } from "framer-motion"
import { BarChart2, Boxes, Building2, Users2 } from "lucide-react"
import Image from "next/image"

const BusinessSellerSection = () => {
  const features = [
    {
      icon: Building2,
      title: "Multi-Location Support",
      description: "Manage inventory across multiple dealership locations",
    },
    {
      icon: BarChart2,
      title: "Advanced Analytics",
      description: "Track performance and market trends with detailed insights",
    },
    {
      icon: Users2,
      title: "Team Management",
      description: "Add staff accounts with customizable permissions",
    },
    {
      icon: Boxes,
      title: "Bulk Operations",
      description: "Upload and manage multiple listings efficiently",
    },
  ]

  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Content Section */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Selling as a business?
                <br />
                We make it easy
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                We&apos;ve got powerful tools to help you manage your inventory
                and orders, track your sales, and build your dealership brand.
              </p>

              {/* Features Grid */}
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 dark:bg-gray-800">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <button className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                  Learn more about business features
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-900"
            >
              <Image
                src="/business-seller.jpg" // You'll need to add your image
                alt="Business seller dashboard"
                width={600}
                height={400}
                className="rounded-lg object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessSellerSection
