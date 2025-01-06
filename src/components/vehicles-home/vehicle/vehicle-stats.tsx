import { Card } from "@/components/ui/card"
import { Calendar, Fuel, Gauge, Settings2, type LucideIcon } from "lucide-react"

interface QuickStat {
  label: string
  value: string
  icon: LucideIcon
}

interface VehicleStatsProps {
  stats: {
    mileage: number
    year: number
    engineSize: string
    fuel: string
  }
}

export function VehicleStats({ stats }: VehicleStatsProps) {
  // Map stats to quick stat format with icons
  const quickStats: QuickStat[] = [
    {
      label: "Mileage",
      value: `${stats.mileage.toLocaleString()} km`,
      icon: Gauge,
    },
    {
      label: "Year",
      value: stats.year.toString(),
      icon: Calendar,
    },
    {
      label: "Engine",
      value: stats.engineSize,
      icon: Settings2,
    },
    {
      label: "Fuel",
      value: stats.fuel,
      icon: Fuel,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {quickStats.map((stat, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="font-medium">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
