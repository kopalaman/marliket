import { env } from "@/env"
import * as schema from "@/hono/db/schema"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

const sql = neon(env.DATABASE_URL!)
const db = drizzle({ client: sql, schema })

export default db
