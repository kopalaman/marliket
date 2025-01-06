import { env } from "@/env"
import { AUTH_COOKIE } from "@/lib/constants"
import { getCookie } from "hono/cookie"
import { createMiddleware } from "hono/factory"
import {
  Account,
  Account as AccountType,
  AppwriteException,
  Client,
  Models,
  Storage,
  Storage as StorageType,
  Teams,
  Teams as TeamsType,
  Users,
  Users as UsersType,
} from "node-appwrite"
import * as HttpStatusCodes from "stoker/http-status-codes"

// Define error types
export enum AuthErrorCode {
  SESSION_EXPIRED = "SESSION_EXPIRED",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  AUTH_REQUIRED = "AUTH_REQUIRED",
  AUTH_ERROR = "AUTH_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
}

export type AdditionalContext = {
  Variables: {
    account: AccountType
    storage: StorageType
    users: UsersType
    user: Models.User<Models.Preferences>
    client: Client
    teams: TeamsType
  }
}

export const appwriteSession = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const session = getCookie(c, AUTH_COOKIE)

    if (!session) {
      return c.json(
        {
          message: "Authentication required",
          code: AuthErrorCode.AUTH_REQUIRED,
        },
        HttpStatusCodes.UNAUTHORIZED
      )
    }

    try {
      // Initialize Appwrite client
      const client = new Client()
        .setEndpoint(env.APPWRITE_ENDPOINT)
        .setProject(env.APPWRITE_PROJECT_ID)
        .setSession(session)

      // Initialize services
      const account = new Account(client)
      const storage = new Storage(client)
      const users = new Users(client)
      const teams = new Teams(client)

      // Get user
      const user = await account.get()

      // Set context variables
      c.set("client", client)
      c.set("account", account)
      c.set("storage", storage)
      c.set("users", users)
      c.set("user", user)
      c.set("teams", teams)

      // Set security headers
      c.header("Cache-Control", "no-store, no-cache, must-revalidate")
      c.header("Pragma", "no-cache")
      c.header("X-Content-Type-Options", "nosniff")
      c.header("X-Frame-Options", "DENY")
      c.header("X-XSS-Protection", "1; mode=block")

      await next()
    } catch (error) {
      console.error("Appwrite session error:", {
        error:
          error instanceof AppwriteException
            ? {
                code: error.code,
                type: error.type,
                message: error.message,
              }
            : error,
      })

      if (error instanceof AppwriteException) {
        switch (error.code) {
          case 401:
            return c.json(
              {
                message: "Session expired",
                code: AuthErrorCode.SESSION_EXPIRED,
                type: error.type,
              },
              HttpStatusCodes.UNAUTHORIZED
            )
          case 404:
            return c.json(
              {
                message: "User not found",
                code: AuthErrorCode.USER_NOT_FOUND,
                type: error.type,
              },
              HttpStatusCodes.UNAUTHORIZED
            )
          default:
            return c.json(
              {
                message: "Authentication error",
                code: AuthErrorCode.AUTH_ERROR,
                type: error.type,
              },
              HttpStatusCodes.UNAUTHORIZED
            )
        }
      }

      return c.json(
        {
          message: "Internal server error",
          code: AuthErrorCode.SERVER_ERROR,
        },
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    }
  }
)
