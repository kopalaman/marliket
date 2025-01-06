import * as z from "zod"

export const basicInfoSchema = z.object({
  itemName: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),

  itemType: z.string().min(1, "Product type is required"),

  brand: z
    .string()
    .min(1, "Brand is required")
    .max(50, "Brand name must be less than 50 characters"),

  category: z.object({
    main: z.string().min(1, "Category is required"),
    sub: z.string().min(1, "Subcategory is required"),
  }),

  price: z
    .number()
    .min(0, "Price cannot be negative")
    .max(1000000, "Price is too high"),

  salePrice: z
    .number()
    .min(0, "Sale price cannot be negative")
    .max(1000000, "Sale price is too high")
    .optional()
    .refine((val, ctx) => {
      if (val === undefined || val === 0) return true
      const price = ctx.parent.price
      return val <= price
    }, "Sale price must be less than regular price"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be less than 2000 characters"),

  tags: z.array(z.string()).default([]),
})

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>
