import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import paymentMethodIcons from "@/components/ui/payment-method-icons"
import { Info, LandmarkIcon } from "lucide-react"

const PAYMENT_METHOD = [
  { id: "Bank-transfer", name: "Bank Transfer", icon: LandmarkIcon },
  {
    id: "credit-debit-card",
    name: "Credit/Debit card",
    icon: paymentMethodIcons.Visa,
    icon2: paymentMethodIcons.MasterCard,
  },
  { id: "paypal", name: "Paypal", icon: paymentMethodIcons.Paypal },
]

interface VehiclePriceCardProps {
  price: number
  totalPrice: number
  destination: string
  pointsReward?: number
  paymentMethods?: Array<{
    name: string
    icon: string
  }>
}

export function VehiclePriceCard({
  price,
  totalPrice,
  destination,
  pointsReward = 0,
  paymentMethods = [],
}: VehiclePriceCardProps) {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        {/* Price Display */}
        <div>
          <p className="text-sm text-muted-foreground">Starting From</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              ${price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">USD</span>
          </div>
          <div className="mt-1 space-y-1">
            <p className="text-sm">
              Total Price: ${totalPrice.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">CIF {destination}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full" size="lg">
            Get Price Quote
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            Buy Now
          </Button>
        </div>

        {/* Points Reward Alert */}
        {pointsReward > 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <span className="font-medium">Limited Time Offer:</span>
              <br />
              Earn {pointsReward}pts (${pointsReward}) with this purchase
            </AlertDescription>
          </Alert>
        )}

        {/* Payment Methods */}
        {paymentMethods.length > 0 && (
          <div className="space-y-3 rounded-lg border p-4">
            <h3 className="font-medium">Available Payment Methods</h3>
            <div className="grid grid-cols-3 gap-2">
              {PAYMENT_METHOD.map((method) => {
                const Icon = method.icon
                return (
                  <div
                    key={method.name}
                    className="relative rounded-lg border bg-muted/40 p-3"
                  >
                    <div className="flex h-full flex-col items-center justify-center space-y-2 text-center">
                      <Icon className="h-8 w-8 fill-black dark:fill-white" />
                      <span className="text-xs font-medium">{method.name}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>* Price excludes tax and registration fees</p>
          <p>* Final price may vary based on shipping method</p>
        </div>
      </CardContent>
    </Card>
  )
}
