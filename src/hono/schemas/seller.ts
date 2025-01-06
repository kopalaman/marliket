import { z } from "@hono/zod-openapi"

// Common address schema
const addressSchema = z.object({
  street: z
    .string()
    .min(1, "Street is required")
    .openapi({ example: "123 Main St" }),
  unit: z.string().optional().openapi({ example: "Apt 101" }),
  city: z.string().min(1, "City is required").openapi({ example: "Lusaka" }),
  state: z
    .string()
    .min(1, "State is required")
    .openapi({ example: "Copperbelt" }),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .openapi({ example: "10101" }),
  country: z
    .string()
    .min(1, "Country is required")
    .openapi({ example: "Zambia" }),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

// Schema for registering as a personal seller
export const personalSellerSchema = z.object({
  avatar: z
    .string()
    .optional()
    .openapi({ example: "https://example.com/avatar.jpg" }),
  bio: z.string().optional(),
  serviceCategories: z
    .array(z.string())
    .min(1, "At least one service category is required"),
  address: addressSchema,
  serviceAreas: z
    .array(z.string())
    .min(1, "At least one service area is required"),
})

// Operating hours schema
const operatingHoursSchema = z.record(
  z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]),
  z.object({
    open: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    close: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    closed: z.boolean().default(false),
  })
)

// Schema for registering as a business seller
export const businessSellerSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  businessType: z.enum([
    "DEALER",
    "PARTS_SUPPLIER",
    "SERVICE_CENTER",
    "INSURANCE_PROVIDER",
    "RENTAL_AGENCY",
    "OTHER",
  ]),
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  website: z.string().url().optional(),
  logo: z.string().optional(),
  description: z.string().optional(),
  yearEstablished: z
    .number()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),
  employeeCount: z.number().positive().optional(),
  businessEmail: z.string().email().optional(),
  businessPhone: z.string().optional(),
  supportEmail: z.string().email().optional(),
  supportPhone: z.string().optional(),
  address: addressSchema,
  operatingHours: operatingHoursSchema,
  serviceAreas: z
    .array(z.string())
    .min(1, "At least one service area is required"),
  serviceCategories: z
    .array(z.string())
    .min(1, "At least one service category is required"),
  socialLinks: z.record(z.string(), z.string().url()).optional(),
})

// Response schemas
export const sellerProfileResponse = z.object({
  type: z.enum(["personal", "business"]),
  profile: z.union([
    z.object({
      type: z.literal("personal"),
      avatar: z.string().optional(),
      bio: z.string().optional(),
      serviceCategories: z.array(z.string()),
      address: addressSchema,
      serviceAreas: z.array(z.string()),
    }),
    z.object({
      type: z.literal("business"),
      businessName: z.string(),
      businessType: z.enum([
        "DEALER",
        "PARTS_SUPPLIER",
        "SERVICE_CENTER",
        "INSURANCE_PROVIDER",
        "RENTAL_AGENCY",
        "OTHER",
      ]),
      // ... other business fields
      address: addressSchema,
      operatingHours: operatingHoursSchema,
      serviceAreas: z.array(z.string()),
      serviceCategories: z.array(z.string()),
    }),
  ]),
})
