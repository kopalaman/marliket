import configureOpenApi from "@/hono/configure-open-api"
import createHonoApp from "@/hono/create-hono-app"
import auth from "@/hono/routes/auth/auth.index"
import { handle } from "hono/vercel"

const app = createHonoApp()

configureOpenApi(app)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/auth", auth)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes
