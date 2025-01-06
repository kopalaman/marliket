"use client"

import { stepAtom } from "@/components/listing/add-listing"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAtom } from "jotai"

interface CreateListingFooterProps {
  onBack?: () => void
  onNext?: () => void
  backButtonLabel?: string
  nextButtonLabel?: string
  isNextDisabled?: boolean
  isBackDisabled?: boolean
  showBackButton?: boolean
  showNextButton?: boolean
  className?: string
}

export default function CreateListingFooter({
  onBack,
  onNext,
  backButtonLabel = "Back",
  nextButtonLabel = "Next",
  isNextDisabled = false,
  isBackDisabled = false,
  showBackButton = true,
  showNextButton = true,
  className,
}: CreateListingFooterProps) {
  const [currentStep, setStep] = useAtom(stepAtom)

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else if (currentStep > 1) {
      setStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (onNext) {
      onNext()
    } else {
      setStep(currentStep + 1)
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0",
        "bg-background/80 backdrop-blur-sm",
        "border-t border-border",
        "p-4 md:p-6",
        "z-10",
        className
      )}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        {showBackButton && (
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={isBackDisabled}
            className="min-w-[100px]"
          >
            {backButtonLabel}
          </Button>
        )}

        {!showBackButton && <div />}

        {showNextButton && (
          <Button
            onClick={handleNext}
            disabled={isNextDisabled}
            className="min-w-[100px]"
          >
            {nextButtonLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
