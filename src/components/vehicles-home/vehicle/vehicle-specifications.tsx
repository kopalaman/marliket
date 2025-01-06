import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  CalendarDays,
  Car,
  DoorOpen,
  FileText,
  Fuel,
  Gauge,
  MapPin,
  PaintBucket,
  Ruler,
  Settings2,
  Users,
} from "lucide-react"

export function VehicleSpecifications({
  specifications,
  vehicleDetails,
}: VehicleSpecificationsProps) {
  // Combined basic details including reference numbers (excluding VIN)
  const basicDetails = [
    {
      label: "Make & Model",
      value: `${vehicleDetails.make} ${vehicleDetails.model}`,
      icon: Car,
    },
    {
      label: "Year",
      value: vehicleDetails.year,
      icon: CalendarDays,
    },
    {
      label: "Mileage",
      value: `${vehicleDetails.mileage.toLocaleString()} km`,
      icon: Gauge,
    },
    {
      label: "Engine",
      value: vehicleDetails.engineSize,
      icon: Car,
    },
    {
      label: "Transmission",
      value: vehicleDetails.transmission,
      icon: Settings2,
    },
    {
      label: "Fuel Type",
      value: vehicleDetails.fuel,
      icon: Fuel,
    },
    {
      label: "Body Style",
      value: vehicleDetails.bodyStyle,
      icon: Car,
    },
    {
      label: "Steering",
      value: vehicleDetails.steering,
      icon: Car,
    },
    {
      label: "Seats",
      value: vehicleDetails.seats,
      icon: Users,
    },
    {
      label: "Doors",
      value: vehicleDetails.doors,
      icon: DoorOpen,
    },
    {
      label: "Location",
      value: vehicleDetails.location,
      icon: MapPin,
    },
    {
      label: "Exterior Color",
      value: vehicleDetails.exteriorColor,
      icon: PaintBucket,
    },
    {
      label: "Interior Color",
      value: vehicleDetails.interiorColor,
      icon: PaintBucket,
    },
    {
      label: "Chassis No.",
      value: vehicleDetails.chassisNo,
      icon: FileText,
    },
    {
      label: "Ref. No.",
      value: vehicleDetails.refNo,
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Basic Vehicle Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {basicDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex items-center gap-3 rounded-lg border bg-card p-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                  <detail.icon className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {detail.label}
                  </p>
                  <p
                    className={cn(
                      "font-medium",
                      (detail.label === "Chassis No." ||
                        detail.label === "Ref. No.") &&
                        "font-mono"
                    )}
                  >
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="performance"
                className="flex items-center gap-2"
              >
                <Car className="h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger
                value="dimensions"
                className="flex items-center gap-2"
              >
                <Ruler className="h-4 w-4" />
                Dimensions
              </TabsTrigger>
              <TabsTrigger value="fuel" className="flex items-center gap-2">
                <Fuel className="h-4 w-4" />
                Fuel
              </TabsTrigger>
            </TabsList>

            {Object.entries(specifications).map(([category, specs]) => (
              <TabsContent key={category} value={category}>
                <Table>
                  <TableBody>
                    {specs.map((spec) => (
                      <TableRow key={spec.name}>
                        <TableCell className="w-1/3 font-medium">
                          {spec.name}
                        </TableCell>
                        <TableCell>{spec.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
// Optional Loading State Component
export function VehicleSpecificationsSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-9 animate-pulse rounded bg-muted" />
              ))}
            </div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
                  <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
