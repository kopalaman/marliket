import { createRouter } from "@/hono/create-hono-app"
import * as handlers from "./auth.handlers"
import * as routes from "./auth.routes"

const router = createRouter()
  .openapi(routes.login, handlers.login)
  .openapi(routes.register, handlers.register)
  .openapi(routes.logout, handlers.logout)
  .openapi(routes.user, handlers.user)
  .openapi(routes.forgotPassword, handlers.forgotPassword)
  .openapi(routes.resetPassword, handlers.resetPassword)

export default router
