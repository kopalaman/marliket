/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env"

import { createUser, getUserById } from "@/hono/db/queries"
import { UserResponse } from "@/hono/schemas/auth"
import { AppRouteHandler } from "@/hono/types"
import { createAdminClient } from "@/lib/appwrite"
import { AUTH_COOKIE } from "@/lib/constants"
import { deleteCookie, setCookie } from "hono/cookie"
import { AppwriteException, ID } from "node-appwrite"
import * as HttpStatusCodes from "stoker/http-status-codes"
import {
  ForgotPasswordRoute,
  LoginRoute,
  LogoutRoute,
  RegisterRoute,
  ResetPasswordRoute,
  UserRoute,
} from "./auth.routes"

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const { email, password } = c.req.valid("json")

  try {
    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return c.json(
      {
        message: "Login successful",
      },
      HttpStatusCodes.OK
    )
  } catch (error) {
    if (error instanceof AppwriteException) {
      switch (error.code) {
        case 401:
          return c.json(
            {
              message: error.message,
              code: "AUTH_INVALID_CREDENTIALS",
              type: error.type,
            },
            HttpStatusCodes.UNAUTHORIZED
          )
        case 429:
          return c.json(
            {
              message: "Too many login attempts",
              code: "AUTH_RATE_LIMIT_EXCEEDED",
              type: error.type,
            },
            HttpStatusCodes.TOO_MANY_REQUESTS
          )
        default:
          console.error("Login error:", error)
          return c.json(
            {
              message: "Authentication failed",
              code: "AUTH_INTERNAL_ERROR",
              type: error.type,
            },
            HttpStatusCodes.INTERNAL_SERVER_ERROR
          )
      }
    }

    return c.json(
      {
        message: "Authentication failed",
        code: "AUTH_INTERNAL_ERROR",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
export const register: AppRouteHandler<RegisterRoute> = async (c) => {
  const { email, password, name } = c.req.valid("json")

  try {
    const { account } = await createAdminClient()

    // Create Appwrite account
    const appwriteUser = await account.create(
      ID.unique(),
      email,
      password,
      name
    )

    // Create basic user in our database
    await createUser({
      id: appwriteUser.$id,
      email,
      name,
      emailVerified: false,
      phoneVerified: false,
    })

    // Create session
    const session = await account.createEmailPasswordSession(email, password)

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    })

    return c.json(
      {
        message: "Registration successful",
        userId: appwriteUser.$id,
      },
      HttpStatusCodes.CREATED
    )
  } catch (error) {
    if (error instanceof AppwriteException) {
      switch (error.code) {
        case 409:
          return c.json(
            {
              message: "User already exists",
              code: "USER_ALREADY_EXISTS",
              type: error.type,
            },
            HttpStatusCodes.CONFLICT
          )
        case 400:
          return c.json(
            {
              message: error.message,
              code: "INVALID_REGISTRATION_DATA",
              type: error.type,
            },
            HttpStatusCodes.BAD_REQUEST
          )
        default:
          console.error("Registration error:", error)
          return c.json(
            {
              message: "Registration failed",
              code: "REGISTRATION_INTERNAL_ERROR",
              type: error.type,
            },
            HttpStatusCodes.INTERNAL_SERVER_ERROR
          )
      }
    }

    return c.json(
      {
        message: "Registration failed",
        code: "REGISTRATION_INTERNAL_ERROR",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
export const logout: AppRouteHandler<LogoutRoute> = async (c) => {
  try {
    const account = c.get("account")

    await account.deleteSession("current")

    // Clear the auth cookie
    deleteCookie(c, AUTH_COOKIE, {
      path: "/",
      secure: env.NODE_ENV === "production",
      httpOnly: true,
    })

    return c.json(
      {
        message: "Logout successful",
      },
      HttpStatusCodes.OK
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return c.json(
      {
        message: "Logout failed",
        code: "AUTH_LOGOUT_ERROR",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const user: AppRouteHandler<UserRoute> = async (c) => {
  try {
    const user = c.get("user")

    if (!user) {
      return c.json(
        {
          message: "User not found",
          code: "AUTH_USER_NOT_FOUND",
        },
        HttpStatusCodes.NOT_FOUND
      )
    }
    const dbUser = await getUserById(user.$id)

    const response: UserResponse = {
      id: user.$id,
      name: user.name,
      email: user.email,
      phone: user.phone ?? undefined,
      emailVerification: Boolean(user.emailVerification),
      phoneVerification: Boolean(user.phoneVerification),
      createdAt: user.$createdAt,
      updatedAt: user.$updatedAt,
      ...(dbUser && {
        name: dbUser.name,
        email: dbUser.email,
        phone: dbUser.phone ?? undefined,
      }),
    }

    return c.json(response, HttpStatusCodes.OK)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return c.json(
      {
        message: "Failed to fetch user data",
        code: "AUTH_USER_FETCH_ERROR",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const forgotPassword: AppRouteHandler<ForgotPasswordRoute> = async (
  c
) => {
  const { email } = c.req.valid("json")

  try {
    const { account } = await createAdminClient()

    await account.createRecovery(
      email,
      `${env.NEXT_PUBLIC_APP_URL}/reset-password`
    )

    return c.json(
      {
        message: "Password reset email sent",
      },
      HttpStatusCodes.OK
    )
  } catch (error) {
    if (error instanceof AppwriteException) {
      switch (error.code) {
        case 404:
          return c.json(
            {
              message: "Email not found",
              code: "AUTH_EMAIL_NOT_FOUND",
              type: error.type,
            },
            HttpStatusCodes.BAD_REQUEST
          )
        default:
          console.error("Password reset error:", error)
          return c.json(
            {
              message: "Failed to send reset email",
              code: "AUTH_RESET_ERROR",
              type: error.type,
            },
            HttpStatusCodes.INTERNAL_SERVER_ERROR
          )
      }
    }

    return c.json(
      {
        message: "Failed to send reset email",
        code: "AUTH_RESET_ERROR",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const resetPassword: AppRouteHandler<ResetPasswordRoute> = async (c) => {
  const { token, password } = c.req.valid("json")

  try {
    const { account } = await createAdminClient()

    await account.updateRecovery(token, password, password)

    return c.json(
      {
        message: "Password reset successful",
      },
      HttpStatusCodes.OK
    )
  } catch (error) {
    if (error instanceof AppwriteException) {
      switch (error.code) {
        case 401:
          return c.json(
            {
              message: "Invalid or expired reset token",
              code: "AUTH_INVALID_RESET_TOKEN",
              type: error.type,
            },
            HttpStatusCodes.BAD_REQUEST
          )
        default:
          console.error("Password reset error:", error)
          return c.json(
            {
              message: "Failed to reset password",
              code: "AUTH_RESET_ERROR",
              type: error.type,
            },
            HttpStatusCodes.INTERNAL_SERVER_ERROR
          )
      }
    }

    return c.json(
      {
        message: "Failed to reset password",
        code: "AUTH_RESET_ERROR",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
