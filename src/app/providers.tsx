"use client"
import Drawer from "@/components/shared/drawer/drawer"
import ManagedModal from "@/components/shared/modals/managed-modal"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryProvider } from "@/components/utils/query-providerl"
import { ThemeProvider } from "@/components/utils/theme-provider"
import { Provider } from "jotai"

import { ReactNode } from "react"

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <ThemeProvider attribute="class" defaultTheme="system">
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Drawer />
          <Toaster />
          <ManagedModal />
        </QueryProvider>
      </ThemeProvider>
    </Provider>
  )
}
