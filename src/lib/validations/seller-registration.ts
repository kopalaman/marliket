/* eslint-disable @typescript-eslint/no-unused-vars */
// lib/validations/seller-registration.ts
import { StepType } from "@/components/ui/stepper"
import { z } from "zod"

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

export const sellerRegistrationSchema = z
  .object({
    businessType: z.enum(["Individual", "RegisteredBusiness", "NonProfit"], {
      required_error: "Please select your business type",
    }),
    storeName: z
      .string()
      .min(3, "Store name must be at least 3 characters")
      .max(50, "Store name must not exceed 50 characters"),
    profileImage: z.string().optional(),
    about: z
      .string()
      .min(50, "About section must be at least 50 characters")
      .max(500, "About section must not exceed 500 characters"),
    location: z.object({
      province: z.string({ required_error: "Province is required" }),
      city: z.string({ required_error: "City is required" }),
      address: z.string({ required_error: "Address is required" }),
    }),
    personalInfo: z.object({
      firstName: z.string().min(2, "First name is required"),
      lastName: z.string().min(2, "Last name is required"),
      dateOfBirth: z.date().refine((date) => {
        const age = new Date().getFullYear() - date.getFullYear()
        return age >= 18
      }, "You must be at least 18 years old"),
      nationalId: z.string().min(6, "Valid National ID is required"),
      tpin: z.string().optional(),
      phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
      alternativePhone: z.string().optional(),
      email: z.string().email("Invalid email address"),
    }),
    agreeToTerms: z.boolean(),
    agreeToPrivacyPolicy: z.boolean(),
  })
  .refine((data) => data.agreeToTerms && data.agreeToPrivacyPolicy, {
    message: "You must agree to both Terms of Service and Privacy Policy",
    path: ["agreeToTerms"],
  })

export type SellerRegistrationFormData = z.infer<
  typeof sellerRegistrationSchema
>

export const sellerFormSteps: StepType[] = [
  {
    id: "business",
    label: "Basic Info",
    description: "Store basics and type",
    fields: ["businessType", "storeName", "profileImage"] as const,
  },
  {
    id: "profile",
    label: "Store Profile",
    description: "Public store information",
    fields: ["about", "location"] as const,
  },
  {
    id: "personal",
    label: "Verification",
    description: "Personal details",
    fields: ["personalInfo"] as const,
  },
  {
    id: "review",
    label: "Review",
    description: "Final review and submit",
    fields: ["agreeToTerms", "agreeToPrivacyPolicy"] as const,
  },
]
