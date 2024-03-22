import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"

// Initialize environment variables
dotenv.config()

// Create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })
}

// Declare global variable for Prisma Client in the TypeScript global namespace
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// Initialize Prisma Client: Use existing global instance or create a new one
const prisma = globalThis.prisma ?? prismaClientSingleton()

// Export the Prisma Client instance
export default prisma

// In non-production environments, reuse the Prisma Client instance across hot reloads
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma
}
