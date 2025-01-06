import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BadgeCheck,
  Calendar,
  CarFront,
  Fuel,
  Gauge,
  Heart,
  Info,
  MapPin,
  Settings2,
  Share2,
  Star,
} from "lucide-react"

export default function VehiclePreview() {
  return (
    <div className="container min-h-screen bg-background p-4">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <span>Vehicles</span>
        <span>/</span>
        <span>SUV</span>
        <span>/</span>
        <span className="text-foreground">Nissan X-Trail Hybrid</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              Verified
            </Badge>
            <Badge variant="outline">Hybrid</Badge>
          </div>
          <h1 className="text-2xl font-semibold">Nissan X-Trail Hybrid 2020</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Yokohama, Japan
            </div>
            <div className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              Stock #BW601672
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
          {/* Gallery Area */}
          <Card className="overflow-hidden border-none">
            <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
              Gallery Area
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Gauge className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-medium">26,087 km</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">2020/1</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Settings2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Engine</p>
                  <p className="font-medium">2,000cc</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Fuel className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fuel</p>
                  <p className="font-medium">Hybrid</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="condition">Condition</TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Vehicle Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Vehicle Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {[
                      ["Make", "Nissan"],
                      ["Model", "X-Trail"],
                      ["Year", "2020"],
                      ["Body Type", "SUV"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {label}
                        </span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Technical Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Technical Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {[
                      ["Engine", "2.0L Hybrid"],
                      ["Transmission", "Automatic"],
                      ["Drive Type", "AWD"],
                      ["Fuel Type", "Hybrid(Petrol)"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {label}
                        </span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="features">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {[
                  "Air Conditioning",
                  "Power Steering",
                  "Power Windows",
                  "ABS",
                  "Airbag",
                  "Navigation",
                  "Backup Camera",
                  "Keyless Entry",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 rounded-lg border bg-card p-3"
                  >
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column */}
        <div className="space-y-6 lg:col-span-4">
          {/* Price Card */}
          <Card>
            <CardContent className="space-y-6 p-6">
              <div>
                <p className="text-sm text-muted-foreground">Starting From</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$14,860</span>
                  <span className="text-sm text-muted-foreground">USD</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Total Price: $17,281 (CIF Dar es Salaam)
                </p>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Get Price Quote
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Buy Now
                </Button>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <span className="font-medium">Limited Time Offer:</span>
                  <br />
                  Earn 60pts ($60) with this purchase
                </AlertDescription>
              </Alert>

              <div className="space-y-3 rounded-lg border p-4">
                <h3 className="font-medium">Available Payment Methods</h3>
                <div className="grid grid-cols-3 gap-2">
                  {["Visa", "Bank Transfer", "PayPal"].map((method) => (
                    <div
                      key={method}
                      className="flex aspect-video items-center justify-center rounded bg-muted text-xs"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seller Card */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CarFront className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Premium Auto Sales</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      (128 reviews)
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Rate</span>
                  <span>95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span>2018</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Sales</span>
                  <span>1,234</span>
                </div>
              </div>
            </CardContent>
          </Card>

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
    </div>
  )
}
