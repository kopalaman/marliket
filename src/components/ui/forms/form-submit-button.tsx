"use client"

import React from "react"
import { LoaderPinwheel } from "lucide-react"

import { Button } from "@/components/ui/button"

interface SubmitButtonProps {
  children: React.ReactNode
  isSubmitting?: boolean
  className?: string
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  isSubmitting,
  className,
}) => {
  return (
    <Button type="submit" disabled={isSubmitting} className={className}>
      {isSubmitting && <LoaderPinwheel className="mr-2 size-5 animate-spin" />}
      {children}
    </Button>
  )
}
