"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { Award, Car, Shield, Timer, Truck, Users } from "lucide-react"
import { useEffect, useRef } from "react"

const Counter = ({
  value,
  direction = "up",
}: {
  value: number
  direction?: "up" | "down"
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : 0)
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value)
    }
  }, [motionValue, isInView])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            latest.toFixed(0)
          )
        }
      }),
    [springValue]
  )

  return <span ref={ref} />
}

const VehicleShowcase = () => {
  const categories = [
    {
      name: "New Cars",
      icon: Car,
      count: 2543,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Used Cars",
      icon: Car,
      count: 5789,
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      name: "Commercial",
      icon: Truck,
      count: 1234,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
    },
  ]

  const stats = [
    {
      icon: Shield,
      label: "Verified Sellers",
      value: 15000,
    },
    {
      icon: Timer,
      label: "Average Sale Time",
      value: 14,
      suffix: "days",
    },
    {
      icon: Users,
      label: "Active Buyers",
      value: 50000,
    },
    {
      icon: Award,
      label: "Customer Rating",
      value: 4.8,
      suffix: "/5",
    },
  ]

  return (
    <div className="sm:pn-32 bg-white px-6 pb-24 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Vehicle Categories
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Browse through our extensive collection of vehicles
          </p>
        </div>

        {/* Categories */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-gray-200 transition-all hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`rounded-lg ${category.bgColor} p-3`}>
                        <Icon className={`h-6 w-6 ${category.textColor}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {category.name}
                        </h3>
                        <div className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-gray-900 dark:text-white">
                          <Counter value={category.count} /> listings
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <Icon className="h-6 w-6 text-gray-900 dark:text-white" />
                </div>
                <div className="mt-3 text-2xl font-bold tabular-nums tracking-tight text-gray-900 dark:text-white">
                  <Counter value={stat.value} />
                  {stat.suffix}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VehicleShowcase
