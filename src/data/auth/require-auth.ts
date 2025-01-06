import { redirect } from "next/navigation"
import { getAuthSession } from "./get-auth-session"

/**Use requireAuth() when you want to enforce authentication and automatically redirect */
export async function requireAuth(redirectTo: string) {
  const user = await getAuthSession()
  if (!user) {
    const url = redirectTo
      ? `${redirectTo}?returnTo=${encodeURIComponent(redirectTo)}`
      : "/login"
    redirect(url)
  }
  return user
}
