import { env } from "@/env"
import { pinoLogger } from "hono-pino"
import pino from "pino"
import pretty from "pino-pretty"

export function PinoLogger() {
  return pinoLogger({
    pino: pino(
      { level: env.LOG_LEVEL },
      env.NODE_ENV === "development" ? pretty() : undefined
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  })
}
