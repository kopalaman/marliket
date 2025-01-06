"use client"

import {
  ProgressBar,
  StepIndicator,
  type StepType,
} from "@/components/ui/stepper"
import { StoreState } from "@/types"
import { atom, useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"
import dynamic from "next/dynamic"

// Dynamic imports for steps
const CreateListing = dynamic(
  () => import("@/components/listing/steps/create-listing")
)

const BasicInfo = dynamic(() => import("@/components/listing/steps/basic-info"))

const ItemMedia = dynamic(
  () => import("@/components/listing/steps/item-media"),
  { ssr: false }
)

const InventoryShipping = dynamic(
  () => import("@/components/listing/steps/inventory-shipping"),
  { ssr: false }
)

const ItemAttributes = dynamic(
  () => import("@/components/listing/steps/item-attributes"),
  {
    ssr: false,
  }
)

const VariantManagement = dynamic(
  () => import("@/components/listing/steps/variant-management"),
  { ssr: false }
)

const Review = dynamic(() => import("@/components/listing/steps/review"), {
  ssr: false,
})

// Steps configuration
export const steps: StepType[] = [
  {
    label: "Start",
    description: "Choose listing type",
    id: "start",
  },
  {
    label: "Details",
    description: "Basic information",
    id: "details",
    fields: [
      "itemName",
      "itemType",
      "brand",
      "price",
      "salePrice",
      "description",
    ],
  },
  {
    label: "Media",
    description: "Add photos",
    id: "media",
    fields: ["images"],
  },
  {
    label: "Inventory",
    description: "Stock & shipping",
    id: "inventory",
    fields: [
      "sku",
      "stockQuantity",
      "lowStockAlert",
      "weight",
      "dimensions.length",
      "dimensions.width",
      "dimensions.height",
      "shippingClass",
    ],
  },
  {
    label: "Attributes",
    description: "Product options",
    id: "attributes",
    fields: ["hasVariations", "attributes"],
  },
  {
    label: "Variations",
    description: "Manage variations",
    id: "variations",
    fields: ["variations"],
    conditional: "hasVariations", // Only show if hasVariations is true
  },
  {
    label: "Review",
    description: "Final check",
    id: "review",
  },
]

// Atoms
export const stepAtom = atom(1)

export const StoreAtom = atomWithStorage<StoreState>("addNewProduct", {
  // Basic Info
  itemName: "",
  itemType: "",
  brand: "",
  price: 0,
  salePrice: 0,
  description: "",

  // Inventory
  sku: "",
  stockQuantity: 0,
  lowStockAlert: 0,

  // Details
  categories: [],
  tags: [],
  attributes: [], // color, size, material, etc.

  // Media
  images: [], // array of image URLs/files

  // Shipping
  weight: "",
  dimensions: {
    length: "",
    width: "",
    height: "",
  },
  shippingClass: "",

  // Variations
  hasVariations: false,
  variations: [], // array of product variations

  // SEO
  metaTitle: "",
  metaDescription: "",

  // Additional
  status: "draft", // draft, published, private
  featuredProduct: false,
  vendorId: "",
})

export default function AddListing() {
  const step = useAtomValue(stepAtom)

  // Step component mapping
  const getStepComponent = () => {
    switch (step) {
      case 1:
        return <CreateListing />
      case 2:
        return <BasicInfo />
      case 3:
        return <ItemMedia />
      case 4:
        return <InventoryShipping />
      case 5:
        return <ItemAttributes />
      case 6:
        return <VariantManagement />
      case 7:
        return <Review />
      default:
        return <CreateListing />
    }
  }

  return (
    <div className="mx-auto min-h-[90vh] w-full max-w-4xl">
      <div className="px-4 py-6">
        <StepIndicator currentStep={step - 1} steps={steps} />
        <ProgressBar currentStep={step - 1} totalSteps={steps.length} />
      </div>

      <div className="flex flex-grow items-center justify-center px-4 pb-20 pt-8">
        {getStepComponent()}
      </div>
    </div>
  )
}
