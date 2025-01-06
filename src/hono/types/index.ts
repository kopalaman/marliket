import { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi"
import { AdditionalContext } from "../middlewares/appwrite-session"

export type AppOpenAPI = OpenAPIHono

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AdditionalContext
>
