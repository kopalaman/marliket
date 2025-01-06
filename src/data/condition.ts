// data/conditions.ts
import { ItemCondition } from "@/types/item"
import {
  AlertTriangle, // Like New
  Check, // New - Other
  CircleDot, // Used
  // New
  PackageOpen,
  Sparkles, // Open Box
  ThumbsUp,
} from "lucide-react"

export const ITEM_CONDITIONS: ItemCondition[] = [
  {
    value: "new",
    label: "New",
    icon: Sparkles,
    shortDescription: "Brand new, unused item",
    fullDescription:
      "A brand-new, unused item in its original packaging with all original tags/labels attached. Packaging is intact and pristine.",
    examples: [
      "Item is sealed in original packaging",
      "All tags and labels are attached",
      "No signs of wear or damage",
    ],
    guidelines: [
      "Must be in original packaging",
      "All accessories must be included",
      "No signs of use or handling",
    ],
  },
  {
    value: "new_other",
    label: "New - Open Box",
    icon: PackageOpen,
    shortDescription: "New item with opened/damaged packaging",
    fullDescription:
      "A new, unused item with no signs of wear. Original packaging may be missing or damaged. All original accessories are included.",
    examples: [
      "Opened but unused electronics",
      "Display items never used",
      "Items with damaged packaging",
    ],
    guidelines: [
      "Item must be unused",
      "All original accessories required",
      "Can have damaged/missing packaging",
    ],
  },
  {
    value: "like_new",
    label: "Like New",
    icon: ThumbsUp,
    shortDescription: "Used once or twice, as new condition",
    fullDescription:
      "An item that was used minimally and appears new. Original packaging may be available. No signs of wear or defects.",
    examples: [
      "Worn once clothing with tags",
      "Opened but barely used electronics",
      "Items in pristine condition",
    ],
    guidelines: [
      "No visible signs of wear",
      "All functions perfectly",
      "Complete with all parts",
    ],
  },
  {
    value: "used_excellent",
    label: "Used - Excellent",
    icon: Check,
    shortDescription: "Minimal wear, fully functional",
    fullDescription:
      "Item shows minimal signs of use with minor cosmetic marks. Fully functional with all essential parts and accessories.",
    examples: [
      "Gently used electronics",
      "Lightly worn clothing",
      "Well-maintained items",
    ],
    guidelines: [
      "Minor cosmetic marks only",
      "Fully functional",
      "All essential parts included",
    ],
  },
  {
    value: "used_good",
    label: "Used - Good",
    icon: CircleDot,
    shortDescription: "Regular wear, works perfectly",
    fullDescription:
      "Item shows regular signs of use but remains in good working condition. May have cosmetic scratches or wear.",
    examples: [
      "Used electronics in good working order",
      "Regularly worn clothing without damage",
      "Furniture with normal wear",
    ],
    guidelines: [
      "Normal wear is acceptable",
      "Must be fully functional",
      "No major defects",
    ],
  },
  {
    value: "for_parts",
    label: "For Parts or Not Working",
    icon: AlertTriangle,
    shortDescription: "Not functioning or missing parts",
    fullDescription:
      "Item is not fully functional or missing essential components. Suitable for repairs or parts extraction. All defects must be clearly listed.",
    examples: [
      "Broken electronics for repair",
      "Damaged items for parts",
      "Incomplete items",
    ],
    guidelines: [
      "List all defects clearly",
      "Specify missing parts",
      "Describe any damage",
    ],
  },
]
