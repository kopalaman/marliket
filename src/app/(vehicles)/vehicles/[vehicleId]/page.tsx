// app/vehicles/[id]/page.tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VehicleGallery from "@/components/vehicles-home/vehicle/vehicle-gallery"
import { BadgeCheck, Heart, Info, MapPin, Share2, XCircle } from "lucide-react"

import { similarVehicles } from "@/../public/data/similar-vehicles"
import { vehicleData } from "@/../public/data/vehicle-details"
import VehicleSkeleton from "@/components/ui/loaders/skeletons/vehicle-details"
import { PurchaseFlow } from "@/components/vehicles-home/vehicle/purchase-flow"
import { SellerCard } from "@/components/vehicles-home/vehicle/seller-card"
import { SimilarVehicles } from "@/components/vehicles-home/vehicle/similar-vehicles"
import { VehiclePriceCard } from "@/components/vehicles-home/vehicle/vehicle-price-card"
import { VehicleReviews } from "@/components/vehicles-home/vehicle/vehicle-review"
import { VehicleSpecifications } from "@/components/vehicles-home/vehicle/vehicle-specifications"
import { VehicleStats } from "@/components/vehicles-home/vehicle/vehicle-stats"
import { cn } from "@/lib/utils"

interface VehicleDetailPageProps {
  params: {
    id: string
  }
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  // This would normally come from your API or state management
  // const { vehicleData } = useVehicleData(params.id)

  if (!vehicleData) {
    return <VehicleSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <span>Vehicles</span>
        <span>/</span>
        <span>{vehicleData.category}</span>
        <span>/</span>
        <span className="text-foreground">
          {vehicleData.vehicleDetails.make} {vehicleData.vehicleDetails.model}
        </span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              Verified
            </Badge>
            <Badge variant="outline">
              {/* {vehicleData.vehicleDetails.fuelType} */}
            </Badge>
          </div>
          <h1 className="text-2xl font-semibold">
            {vehicleData.vehicleDetails.year} {vehicleData.vehicleDetails.make}{" "}
            {vehicleData.vehicleDetails.model}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {vehicleData.seller.location}
            </div>
            <div className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              Stock #{vehicleData.stockNo}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Heart className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column */}
        <div className="space-y-8 lg:col-span-8">
          {/* Gallery */}
          <Card className="overflow-hidden border-none">
            <VehicleGallery
              images={vehicleData.gallery.map((url) => ({
                url,
                alt: `${vehicleData.vehicleDetails.make} ${vehicleData.vehicleDetails.model}`,
              }))}
            />
          </Card>

          {/* Price card for mobile view only */}
          <div className="block lg:hidden">
            <VehiclePriceCard
              price={vehicleData.price}
              totalPrice={vehicleData.totalPrice}
              destination={vehicleData.destination}
              pointsReward={vehicleData.pointsReward}
              paymentMethods={vehicleData.paymentMethods}
            />
          </div>

          {/* Quick Stats */}
          <VehicleStats stats={vehicleData.vehicleDetails} />

          {/* Tabs Section */}
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="condition">Condition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="mt-6">
              <VehicleSpecifications
                specifications={vehicleData.specifications}
                vehicleDetails={vehicleData.vehicleDetails}
              />
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {vehicleData.features.map((feature) => (
                  <div
                    key={feature.name}
                    className={cn(
                      "flex items-center gap-3 rounded-lg p-3 transition-all",
                      feature.available
                        ? "border border-primary/20 bg-primary/5 hover:bg-primary/10"
                        : "border border-border bg-background hover:bg-muted/50"
                    )}
                  >
                    {feature.available ? (
                      <div className="rounded-full bg-primary/10 p-1">
                        <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-muted p-1">
                        <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.available
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="condition" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">
                    {vehicleData.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <VehicleReviews reviews={vehicleData.reviews} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column */}
        <div className="space-y-6 lg:col-span-4">
          {/* Price card for desktop view only */}
          <div className="hidden lg:block">
            <VehiclePriceCard
              price={vehicleData.price}
              totalPrice={vehicleData.totalPrice}
              destination={vehicleData.destination}
              pointsReward={vehicleData.pointsReward}
              paymentMethods={vehicleData.paymentMethods}
            />
          </div>
          {/* Seller Card */}
          <SellerCard seller={vehicleData.seller} />

          {/* Disclaimers */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>* All prices are FOB unless otherwise stated.</p>
                <p>* Actual vehicle may differ from images shown.</p>
                <p>* Final price depends on shipping method and destination.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Purchase Flow Section */}
      <div className="mt-12">
        <h2 className="mb-6 text-xl font-semibold">How to Purchase</h2>
        <PurchaseFlow />
      </div>

      {/* Similar Vehicles Section */}
      <div className="hidden md:block">
        <SimilarVehicles vehicles={similarVehicles} />
      </div>
    </div>
  )
}
