"use client"

import CreateListingFooter from "@/components/shared/footer/create-listing-footer"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useSetAtom } from "jotai"
import { RESET } from "jotai/utils"
import { Copy, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { stepAtom, StoreAtom } from "../add-listing"

const ActionCard = ({
  icon: Icon,
  title,
  onClick,
}: {
  icon: any
  title: string
  onClick?: () => void
}) => (
  <Card
    onClick={onClick}
    className={cn(
      "relative cursor-pointer overflow-hidden transition-all duration-200",
      "dark:hover:shadow-lg/10 hover:shadow-lg",
      "group border border-border/40"
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-transparent dark:from-muted/10" />
    <div className="relative flex items-center gap-4 p-6 md:p-8">
      <div
        className={cn(
          "rounded-full p-2.5",
          "bg-gradient-to-br from-background to-muted",
          "dark:from-muted dark:to-background",
          "transition-transform duration-200 group-hover:scale-110",
          "border border-border/20"
        )}
      >
        <Icon className="h-5 w-5 text-foreground/80" />
      </div>
      <span className="text-base font-medium text-foreground/80 md:text-lg">
        {title}
      </span>
    </div>
  </Card>
)

export default function CreateListing() {
  const router = useRouter()
  const setStep = useSetAtom(stepAtom)
  const setStore = useSetAtom(StoreAtom)

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground md:text-2xl">
          Welcome back Nsangu
        </h2>
        <p className="text-muted-foreground">
          Select an option to get started with your listing
        </p>
      </div>

      <div className="space-y-3">
        <ActionCard
          icon={Plus}
          title="Create a new listing"
          onClick={() => {
            setStore(RESET)
            setStep(2)
          }}
        />
        <ActionCard icon={Copy} title="Duplicate an existing listing" />
      </div>

      <CreateListingFooter
        showBackButton={false} // First step, hide back button
        onBack={() => router.back()} // Custom back action
      />
    </div>
  )
}
