import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check } from "lucide-react"
import Section from "../ui/section"

export default function PricingPlans() {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for getting started with basic selling features",
      features: [
        "Up to 20 product listings",
        "Basic store customization",
        "Standard support",
        "Single payment gateway",
        "Basic analytics",
        "Manual inventory tracking",
        "Basic order management",
        "Standard shipping options",
      ],
      button: {
        text: "Get Started",
        variant: "outline",
      },
      popular: false,
    },
    {
      name: "Standard",
      price: "29",
      description: "Best for growing businesses that need more features",
      features: [
        "Unlimited product listings",
        "Advanced store customization",
        "Priority support",
        "Multiple payment gateways",
        "Advanced analytics & reports",
        "Automated inventory system",
        "Bulk product upload",
        "Advanced shipping rules",
      ],
      button: {
        text: "Try Standard Plan",
        variant: "default",
      },
      popular: true,
    },
  ]

  return (
    <Section
      title="Simple & Transparent Pricing"
      description="Choose the plan that best suits your business needs"
      className="container space-y-10 py-8 md:space-y-16 lg:py-16"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col ${
              plan.popular ? "border-primary shadow-lg" : ""
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 right-4" variant="default">
                Most Popular
              </Badge>
            )}

            <CardHeader>
              <CardTitle className="flex flex-col gap-4">
                <div>
                  <span className="text-2xl font-bold">{plan.name}</span>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <div>
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button className="w-full" size="lg">
                {plan.button.text}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>All plans include a 14-day free trial. No credit card required.</p>
        <p className="mt-2">
          Need custom features?{" "}
          <Button variant="link" className="h-auto p-0">
            Contact us
          </Button>
        </p>
      </div>
    </Section>
  )
}
