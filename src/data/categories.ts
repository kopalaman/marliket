// data/categories.ts
import { Category } from "@/types/item"
import { Shirt, Smartphone } from "lucide-react"

export const CATEGORIES: Category[] = [
  {
    value: "electronics",
    label: "Electronics",
    icon: Smartphone,
    nameGuidelines: [
      "Include brand name",
      "Specify model number",
      "Mention key specifications",
      "Add color/variant",
    ],
    subcategories: [
      {
        value: "smartphones",
        label: "Smartphones",
        nameTemplate: "[Brand] [Model] - [Storage] - [Color]",
        examples: [
          "iPhone 13 Pro - 256GB - Pacific Blue",
          "Samsung Galaxy S21 Ultra - 512GB - Phantom Black",
        ],
      },
      {
        value: "laptops",
        label: "Laptops & Computers",
        nameTemplate: "[Brand] [Model] [Processor] [RAM] [Storage]",
        examples: [
          "Dell XPS 15 - i7 11th Gen - 32GB RAM - 1TB SSD",
          "MacBook Pro 14 M1 Pro - 16GB RAM - 512GB",
        ],
      },
      // Add more subcategories...
    ],
  },
  {
    value: "fashion",
    label: "Fashion",
    icon: Shirt,
    nameGuidelines: [
      "Start with gender if applicable",
      "Include brand name",
      "Specify type of clothing",
      "Mention material",
      "Add color",
      "Include size range if listing covers multiple sizes",
    ],
    subcategories: [
      {
        value: "mens-clothing",
        label: "Men's Clothing",
        nameTemplate: "[Brand] Men's [Item Type] - [Material] - [Color]",
        examples: [
          "Nike Men's Running Shorts - Dri-FIT - Black",
          "Levi's Men's 501 Original Jeans - Cotton - Dark Blue",
        ],
      },
      // Add more subcategories...
    ],
  },
  // Add more categories...
]
