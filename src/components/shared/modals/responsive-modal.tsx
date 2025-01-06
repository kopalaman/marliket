import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import useMediaQuery from "@/lib/hooks/use-media-query"

interface ResponsiveModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  description?: string
}

export function ResponsiveModal({
  open,
  onClose,
  children,
  title,
  description,
}: ResponsiveModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="mx-auto sm:max-w-[460px]">
          {(title || description) && (
            <DialogHeader>
              {title && (
                <DialogTitle className="text-lg font-semibold">
                  {title}
                </DialogTitle>
              )}
              {description && (
                <p className="text-sm text-gray-500">{description}</p>
              )}
            </DialogHeader>
          )}
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        {(title || description) && (
          <DrawerHeader className="text-left">
            {title && (
              <DrawerTitle className="text-lg font-semibold">
                {title}
              </DrawerTitle>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </DrawerHeader>
        )}
        <div className="px-0">{children}</div>
        <DrawerFooter className="pt-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
