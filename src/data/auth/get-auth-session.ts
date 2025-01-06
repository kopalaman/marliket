import { createSessionClient } from "@/lib/appwrite"
import { cache } from "react"

/** Use getAuthSession() when you want to optionally check authentication without redirecting*/
export const getAuthSession = cache(async () => {
  try {
    const accountSession = await createSessionClient()
    return await accountSession.account.get()
  } catch (error) {
    console.error("Session error:", error)
    return null
  }
})
