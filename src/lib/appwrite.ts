// src/lib/server/appwrite.js
"use server"
import { env } from "@/env"
import { cookies } from "next/headers"
import { Account, Client } from "node-appwrite"

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(env.APPWRITE_ENDPOINT)
    .setProject(env.APPWRITE_PROJECT_ID)

  const session = (await cookies()).get("AUTH_COOKIE")
  if (!session || !session.value) {
    throw new Error("No session")
  }

  client.setSession(session.value)

  return {
    get account() {
      return new Account(client)
    },
  }
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(env.APPWRITE_ENDPOINT)
    .setProject(env.APPWRITE_PROJECT_ID)
    .setKey(env.APPWRITE_API_KEY)

  return {
    get account() {
      return new Account(client)
    },
  }
}
