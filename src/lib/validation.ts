import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 6 characters"),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerFormSchema = z
  .object({
    name: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Server request schema without confirmPassword
export const registerSchema = z.object({
  name: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})
// Types
export type RegisterFormData = z.infer<typeof registerFormSchema>
export type RegisterData = z.infer<typeof registerSchema>

export const vendorLoginSchema = z.object({
  accountId: z.string().min(2, "Account ID must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 6 characters"),
})

export type VendorLoginFormData = z.infer<typeof vendorLoginSchema>

export const vendorRegisterFormSchema = z.object({
  vendorName: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  IsOnWhatsApp: z.boolean(),
  companyRegistrationNumber: z
    .string()
    .min(12, "Business registration should be 12 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyType: z.string().min(2, "Company type must be at least 2 characters"),
  tpin: z.string().min(10, "Tax pin/ Tpin must be at least 10 characters"),
  address: z.string().min(1, "Address must be at least 2 characters"),
  provice: z.string().min(2, "Province must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
})

export type VendorRegisterFormData = z.infer<typeof vendorRegisterFormSchema>
