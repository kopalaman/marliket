/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Subcategory {
  value: string
  label: string
  nameTemplate?: string
  examples?: string[]
}

export interface Category {
  value: string
  label: string
  icon: any // You can use Lucide icons
  subcategories: Subcategory[]
  nameGuidelines?: string[]
}

export type ItemCondition = {
  value: string
  label: string
  shortDescription: string
  fullDescription: string
  icon: React.ElementType
  examples: string[]
  guidelines: string[]
}

export interface BasicInfoFormValues {
  itemName: string
  itemType: string
  brand: string
  category: {
    main: string
    sub: string
  }
  condition: string // This will hold the condition value
  price: number
  salePrice?: number
  description: string
  tags: string[]
}
