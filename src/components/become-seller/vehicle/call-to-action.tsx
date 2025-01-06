"use client"

import { categoryAtom } from "@/atoms/registration"
import { motion } from "framer-motion"
import { useAtom } from "jotai"
import { ArrowRight, Shield, Target, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

const CallToAction = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Quick Setup",
      description:
        "Start selling in minutes with our streamlined onboarding process",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Protected transactions and verified buyer interactions",
    },
    {
      icon: Target,
      title: "Wide Reach",
      description: "Connect with thousands of potential buyers nationwide",
    },
  ]

  const router = useRouter()
  const [, setCategory] = useAtom(categoryAtom)

  const handleGetStarted = () => {
    setCategory({ category: "vehicles" })
    router.push("/sell/register")
  }

  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-900/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-white/5" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between lg:space-x-10">
          {/* Left Section - Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Start Selling Today
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Join thousands of successful vehicle sellers on our platform. List
              your vehicles and reach millions of potential buyers.
            </p>

            {/* Benefits Grid */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center sm:items-start sm:text-left"
                >
                  <div className="rounded-lg bg-white p-2 shadow-md dark:bg-gray-900">
                    <benefit.icon className="h-6 w-6 text-gray-900 dark:text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:justify-start">
              <motion.button
                onClick={() => handleGetStarted()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
              <button className="text-sm font-semibold text-gray-900 hover:text-gray-800 dark:text-white dark:hover:text-gray-300">
                View Pricing
              </button>
            </div>
          </div>

          {/* Right Section - Stats/Visual */}
          <div className="mt-16 flex flex-col items-center lg:mt-0">
            <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    50K+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active Buyers
                  </div>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-800" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    14 Days
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Average Sale Time
                  </div>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-800" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    95%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Seller Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
