"use server"
import { createAdminClient } from "@/lib/appwrite"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { OAuthProvider } from "node-appwrite"

export async function signUpWithGoogle() {
  const { account } = await createAdminClient()

  const origin = (await headers()).get("origin")

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/signup`
  )

  return redirect(redirectUrl)
}
