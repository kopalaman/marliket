
import { OpenAPIHono } from "@hono/zod-openapi"
import { notFound, onError } from "stoker/middlewares"
import { defaultHook } from "stoker/openapi"
import { PinoLogger } from "./middlewares/pino-logger"


export function createRouter() {
  return new OpenAPIHono({
    defaultHook
  })
  

}

export default function createHonoApp() {
  const app = createRouter().basePath("/api")

  app.use(PinoLogger())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
