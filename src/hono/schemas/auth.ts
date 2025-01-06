import { z } from "@hono/zod-openapi"

export const registerSchema = z.object({
  name: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

// Define the exact response schema for successful user response
export const UserResponseSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    emailVerification: z.boolean(),
    phoneVerification: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .openapi("UserResponse")

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address").openapi({
    example: "example@mail.com",
    description: "Email address to send password reset link",
  }),
})

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required").openapi({
      example: "token",
      description: "Token received in password reset email",
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .openapi({
        example: "Password123",
        description: "New password",
      }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  })

const providerEnum = ["google", "facebook", "microsoft"] as const

export const OAuthProviderSchema = z.object({
  provider: z.enum(providerEnum),
})

export const OAuthCallbackQuerySchema = z.object({
  userId: z.string(),
  secret: z.string(),
})

export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>

// Create type from the schema
export type UserResponse = z.infer<typeof UserResponseSchema>
