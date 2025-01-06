"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useModal } from "@/lib/hooks/use-modal"
import { Car, CarFront, ShoppingBag, Wrench } from "lucide-react"
import { useRouter } from "next/navigation"
import { ScrollArea } from "../ui/scroll-area"

const SellerCategory = () => {
  const router = useRouter()
  const { closeModal } = useModal()

  const categories = [
    {
      id: "vehicles",
      title: "Vehicle Sales",
      description: "List and sell new or used vehicles",
      icon: Car,
      features: [
        "List multiple vehicles",
        "Manage inventory",
        "Track inquiries",
      ],
      path: "/sell/vehicles",
    },
    {
      id: "parts & accessories",
      title: "Auto Parts Store",
      description: "Sell automotive parts and accessories",
      icon: ShoppingBag,
      features: ["Parts catalog", "Inventory management", "Order tracking"],
      path: "/sell/parts-&-accessories",
    },
    {
      id: "services",
      title: "Mechanical Services",
      description: "Offer repair and maintenance services",
      icon: Wrench,
      features: [
        "Service bookings",
        "Workshop management",
        "Customer tracking",
      ],
      path: "/sell/services",
    },
    {
      id: "rental",
      title: "Car Rental",
      description: "Manage your rental vehicle fleet",
      icon: CarFront,
      features: ["Fleet management", "Booking system", "Rental tracking"],
      path: "/sell/rental",
    },
  ]

  const handleCategorySelect = (path: string) => {
    closeModal()
    router.push(path)
  }

  return (
    <ScrollArea className="flex max-h-[80vh] flex-col px-2 py-2">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Card
            key={category.id}
            className="my-3 w-full cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleCategorySelect(category.path)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="shrink-0 rounded-lg bg-gray-900 p-2 dark:bg-gray-700">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1.5 text-base font-semibold">
                    {category.title}
                  </h3>
                  <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                    {category.description}
                  </p>
                  <ul className="space-y-1.5">
                    {category.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="mr-2 h-1 w-1 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </ScrollArea>
  )
}

export default SellerCategory
