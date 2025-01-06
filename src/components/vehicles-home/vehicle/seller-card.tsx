// components/vehicles-home/vehicle/seller-card.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BadgeCheck,
  Car,
  Clock,
  MapPin,
  MessageSquare,
  Star,
} from "lucide-react"

interface SellerReviews {
  overall: number
  communication: number
  pricing: number
  experience: number
}

interface SellerCardProps {
  seller: {
    name: string
    image: string
    verifiedDealer: boolean
    memberSince: string
    location: string
    responseRate: number
    responseTime: string
    totalListings: number
    totalReviews: number
    rating: number
    reviews: SellerReviews
  }
}

export function SellerCard({ seller }: SellerCardProps) {
  // Convert rating to star display
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    )
  }

  // Convert rating to percentage for progress bar
  const ratingToPercentage = (rating: number) => (rating / 5) * 100

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        {/* Seller Header */}
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={seller.image} alt={seller.name} />
            <AvatarFallback>
              {seller.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-semibold">{seller.name}</h3>
              {seller.verifiedDealer && (
                <BadgeCheck className="h-4 w-4 flex-shrink-0 text-primary" />
              )}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex gap-0.5">{renderStars(seller.rating)}</div>
              <span className="text-sm text-muted-foreground">
                ({seller.totalReviews} reviews)
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Seller Stats */}
        <div className="grid gap-3 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{seller.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span>{seller.totalListings.toLocaleString()} vehicles listed</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span>Response Rate</span>
                <span className="font-medium">{seller.responseRate}%</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {seller.responseTime}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="w-fit">
            Member since {seller.memberSince}
          </Badge>
        </div>

        <Separator />

        {/* Detailed Ratings */}
        <div className="space-y-3">
          <h4 className="font-medium">Rating Breakdown</h4>
          <div className="space-y-2">
            {Object.entries(seller.reviews).map(([category, rating]) => (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize text-muted-foreground">
                    {category}
                  </span>
                  <span className="font-medium">{rating.toFixed(1)}</span>
                </div>
                <Progress
                  value={ratingToPercentage(rating)}
                  className="h-1.5"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Button */}
        <Button variant="outline" className="w-full gap-2">
          <MessageSquare className="h-4 w-4" />
          Chat with Seller
        </Button>
      </CardContent>
    </Card>
  )
}
