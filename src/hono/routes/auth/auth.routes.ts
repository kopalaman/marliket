import { appwriteSession } from "@/hono/middlewares/appwrite-session"
import { errorSchema } from "@/hono/schemas"
import {
  forgotPasswordSchema,
  OAuthCallbackQuerySchema,
  OAuthProviderSchema,
  resetPasswordSchema,
  UserResponseSchema,
} from "@/hono/schemas/auth"
import { loginSchema, registerSchema } from "@/lib/validation"
import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers"
import { createMessageObjectSchema } from "stoker/openapi/schemas"

const tags = ["Auth"]
export const login = createRoute({
  tags,
  path: "/login",
  method: "post",
  request: {
    body: jsonContentRequired(loginSchema, "login credentials"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("login successful"),
      "Login successful response"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorSchema,
      "Invalid credentials"
    ),
    [HttpStatusCodes.TOO_MANY_REQUESTS]: jsonContent(
      errorSchema,
      "Too many login attempts"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorSchema,
      "Authentication failed"
    ),
  },
})

export const register = createRoute({
  tags,
  path: "/register",
  method: "post",
  request: {
    body: jsonContentRequired(registerSchema, "register user data"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      createMessageObjectSchema("register successful"),
      "Register successful response"
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(errorSchema, "User already exists"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      errorSchema,
      "Invalid request data"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorSchema,
      "Registration failed"
    ),
  },
})
export const logout = createRoute({
  tags,
  path: "/logout",
  method: "post",
  middleware: [appwriteSession] as const, // Use `as const` to ensure TypeScript infers the middleware's Context.
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("logout successful"),
      "logout route"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorSchema,
      "Logout failed"
    ),
  },
})

export const user = createRoute({
  tags,
  path: "/user",
  method: "get",
  middleware: [appwriteSession] as const, // Use `as const` to ensure TypeScript infers the middleware's Context.
  responses: {
    [HttpStatusCodes.OK]: jsonContent(UserResponseSchema, "current user route"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorSchema, "User not found"),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorSchema,
      "Failed to fetch user data"
    ),
  },
})

export const forgotPassword = createRoute({
  tags,
  path: "/forgot-password",
  method: "post",
  request: {
    body: jsonContentRequired(forgotPasswordSchema, "Email for password reset"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Password reset email sent"),
      "Reset email sent response"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(errorSchema, "Invalid email"),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorSchema,
      "Failed to send reset email"
    ),
  },
})

export const resetPassword = createRoute({
  tags,
  path: "/reset-password",
  method: "post",
  request: {
    body: jsonContentRequired(
      resetPasswordSchema,
      "New password with reset token"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Password reset successful"),
      "Password reset response"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      errorSchema,
      "Invalid reset token or password"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorSchema,
      "Failed to reset password"
    ),
  },
})

export const oauthRedirect = createRoute({
  tags,
  path: "/oauth/{provider}",
  method: "get",
  request: {
    params: OAuthProviderSchema,
  },
  responses: {
    [HttpStatusCodes.TEMPORARY_REDIRECT]: {
      description: "Redirect to OAuth provider",
    },
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(errorSchema, "Invalid provider"),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorSchema,
      "Failed to initialize OAuth"
    ),
  },
})

export const oauthCallback = createRoute({
  tags,
  path: "/oauth/callback/{provider}",
  method: "get",
  request: {
    params: OAuthProviderSchema,
    query: OAuthCallbackQuerySchema,
  },
  responses: {
    [HttpStatusCodes.TEMPORARY_REDIRECT]: {
      description: "Redirect to success/error page",
      headers: {
        Location: {
          description: "Redirect URL",
          type: "string",
        },
      },
    },
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      errorSchema,
      "Invalid callback parameters"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorSchema,
      "Authentication failed"
    ),
  },
})

export type LoginRoute = typeof login
export type RegisterRoute = typeof register
export type LogoutRoute = typeof logout
export type UserRoute = typeof user
export type ForgotPasswordRoute = typeof forgotPassword
export type ResetPasswordRoute = typeof resetPassword
export type OAuthProvider = z.infer<typeof OAuthProviderSchema>["provider"]
export type OAuthCallbackQuery = z.infer<typeof OAuthCallbackQuerySchema>
export type OAuthRedirectRoute = typeof oauthRedirect
export type OAuthCallbackRoute = typeof oauthCallback
