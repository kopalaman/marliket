import { z } from "@hono/zod-openapi"

export const errorSchema = z.object({
  message: z.string(),
  type: z.string().optional(),
  code: z.string().optional(),
})

export const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "1212121",
    }),
})
