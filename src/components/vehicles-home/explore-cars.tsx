"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Section from "@/components/ui/section"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  siAudi,
  siBmw,
  siFerrari,
  siFord,
  siHonda,
  siHyundai,
  siMazda,
  siMercedes,
  siPorsche,
  siSubaru,
  siToyota,
  siVolkswagen,
} from "simple-icons"

// Define types
interface IconWrapperProps {
  path: string
  title: string
  className?: string
}

const IconWrapper = ({ path, title, className = "" }: IconWrapperProps) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-10 w-10", className)}
    aria-label={title}
  >
    <title>{title}</title>
    <path d={path} />
  </svg>
)

// Car Types Data
const carTypes = [
  "SUVs",
  "Hatchbacks",
  "Saloons",
  "Coupes",
  "Estate cars",
  "People carriers",
  "Sports cars",
  "Convertibles",
]

// Car Manufacturers Data
const manufacturers = [
  { name: "Toyota", icon: siToyota },
  { name: "BMW", icon: siBmw },
  { name: "Mercedes", icon: siMercedes },
  { name: "Volkswagen", icon: siVolkswagen },
  { name: "Ford", icon: siFord },
  { name: "Honda", icon: siHonda },
  { name: "Hyundai", icon: siHyundai },
  { name: "Audi", icon: siAudi },
  { name: "Ferrari", icon: siFerrari },
  { name: "Porsche", icon: siPorsche },
  { name: "Mazda", icon: siMazda },
  { name: "Subaru", icon: siSubaru },
]

// Car Type Button Component
function CarTypeButton({ name }: { name: string }) {
  return (
    <Link
      href={`/vehicles/type/${name.toLowerCase()}`}
      className="group flex-shrink-0"
    >
      <Button
        variant="outline"
        className={cn(
          "h-20 w-full min-w-[160px] bg-background/80 backdrop-blur-sm",
          "hover:border-primary hover:bg-primary/5 dark:bg-background/50",
          "mt-2 transition-all duration-300 ease-in-out",
          "group-hover:translate-y-[-2px] group-hover:shadow-lg"
        )}
      >
        <span className="text-base font-medium">{name}</span>
      </Button>
    </Link>
  )
}

// Manufacturer Button Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ManufacturerButton({ name, icon }: { name: string; icon: any }) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-3 rounded-lg p-3 transition-all",
        "hover:bg-gray-50 dark:hover:bg-gray-800/50"
      )}
    >
      <IconWrapper
        path={icon.path}
        title={name}
        className="h-7 w-7 shrink-0 fill-gray-600 dark:fill-gray-400"
      />
      <span className="text-sm font-medium text-gray-600 group-hover:underline dark:text-gray-400">
        {name}
      </span>
    </button>
  )
}

// Browse by Car Type Section
export function BrowseByType() {
  return (
    <Section
      title="Browse by car type"
      className="group/section lg:container-fluid mt-12 overflow-hidden pl-4 sm:pl-6 lg:mt-16"
    >
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex w-full gap-4">
          {carTypes.map((type) => (
            <CarTypeButton key={type} name={type} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Section>
  )
}

// Browse by Manufacturer Section
export function BrowseByManufacturer() {
  return (
    <Section
      title="Browse by car manufacturer"
      className="group/section lg:container-fluid my-12 overflow-hidden pl-4 sm:pl-6 lg:my-16"
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {manufacturers.map((manufacturer) => (
          <Link
            href={`/vehicles/manufacturer/${manufacturer.name.toLowerCase()}`}
            key={manufacturer.name}
            className="group rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <ManufacturerButton {...manufacturer} />
          </Link>
        ))}
      </div>
    </Section>
  )
}
