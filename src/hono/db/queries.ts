import { eq } from "drizzle-orm"
import db from "."
import { users } from "./schema"

export async function createUser(userData: typeof users.$inferInsert) {
  return db.insert(users).values(userData).returning()
}

export async function getUserById(id: string) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
}

export async function updateUser(
  id: string,
  userData: Partial<typeof users.$inferInsert>
) {
  return db
    .update(users)
    .set({ ...userData, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning()
}
