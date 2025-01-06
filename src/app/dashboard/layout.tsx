import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from "@/components/dashboard/dashboard/dashboard-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { FC, ReactNode } from "react"

interface DashboardProps {
  children: ReactNode
}

const DashboardLayout: FC<DashboardProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
