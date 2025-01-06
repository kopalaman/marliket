// components/ui/drawer.tsx
"use client"

import { drawerStateAtom } from "@/atoms/drawer"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import Filter from "@/components/vehicles-expore/vehicles/filter"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { useAtom } from "jotai"

export default function Drawer() {
  const [drawerState, setDrawerState] = useAtom(drawerStateAtom)

  const handleOpenChange = (open: boolean) => {
    setDrawerState((prev) => ({
      ...prev,
      isOpen: open,
      view: open ? prev.view : null,
    }))
  }

  return (
    <Sheet open={drawerState.isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side={drawerState.placement}
        className="w-full p-0 sm:w-[540px]"
      >
        <VisuallyHidden.Root>
          <SheetTitle>Drawer items</SheetTitle>
        </VisuallyHidden.Root>

        {drawerState.view === "FILTER_MENU" && <Filter />}
      </SheetContent>
    </Sheet>
  )
}
