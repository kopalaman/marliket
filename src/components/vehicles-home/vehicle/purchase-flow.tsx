// components/vehicles-home/vehicle/purchase-flow.tsx
import {
  ArrowRight,
  CreditCard,
  Package,
  Ship,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react"

interface PurchaseStep {
  step: number
  title: string
  description: string
  icon: string
}

interface PurchaseFlowProps {
  steps?: PurchaseStep[]
}

export function PurchaseFlow({ steps }: PurchaseFlowProps) {
  const defaultSteps = [
    {
      step: 1,
      title: "ORDER",
      description: "Get a quote and confirm your order",
      icon: "ShoppingCart",
    },
    {
      step: 2,
      title: "PAYMENT",
      description: "Choose your payment method",
      icon: "CreditCard",
    },
    {
      step: 3,
      title: "SHIPMENT",
      description: "Vehicle preparation and shipping",
      icon: "Ship",
    },
    {
      step: 4,
      title: "DELIVERY",
      description: "Receive your vehicle",
      icon: "Package",
    },
  ]

  const iconMap: Record<string, LucideIcon> = {
    ShoppingCart,
    CreditCard,
    Ship,
    Package,
  }

  const flowSteps = steps || defaultSteps

  return (
    <div className="w-full rounded-lg bg-secondary/50 p-6 md:p-8">
      {/* Desktop View */}
      <div className="hidden items-start justify-between md:flex">
        {flowSteps.map((step, index) => {
          const IconComponent = iconMap[step.icon] || ShoppingCart
          const isLast = index === flowSteps.length - 1

          return (
            <div key={step.step} className="relative flex-1 text-center">
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div className="mb-4">
                  <div className="relative inline-flex items-center justify-center">
                    <div className="absolute inset-0 scale-75 transform rounded-full bg-background transition-transform group-hover:scale-90" />
                    <IconComponent className="relative h-8 w-8 text-primary" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-1.5">
                  <div className="font-medium text-foreground">
                    {step.title}
                  </div>
                  <p className="mx-auto max-w-[200px] text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              {!isLast && (
                <div className="absolute left-[calc(50%+60px)] top-3 flex w-[calc(100%-120px)] items-center justify-center">
                  <div className="w-full border-t border-dashed border-muted-foreground/30" />
                  <ArrowRight className="absolute h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile View */}
      <div className="space-y-6 md:hidden">
        {flowSteps.map((step, index) => {
          const IconComponent = iconMap[step.icon] || ShoppingCart
          const isLast = index === flowSteps.length - 1

          return (
            <div key={step.step} className="relative flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="relative inline-flex items-center justify-center">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="mb-1 font-medium text-foreground">
                  {step.title}
                </div>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Step Number */}
              <div className="flex-shrink-0 text-sm font-medium text-muted-foreground">
                Step {step.step}
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div className="absolute left-3 top-10 h-8 w-px bg-border" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
