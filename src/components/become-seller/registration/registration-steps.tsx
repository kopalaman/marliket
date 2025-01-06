// components/registration/RegistrationSteps.tsx
"use client"

import { registrationAtom, StepAtom } from "@/atoms/registration"
import { Skeleton } from "@/components/ui/skeleton"
import { ProgressBar, StepIndicator, StepType } from "@/components/ui/stepper"
import { useModal } from "@/lib/hooks/use-modal"
import { useAtom } from "jotai"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import {
  AddressInfoSkeleton,
  BusinessInfoSkeleton,
  IndividualInfoSkeleton,
  ReviewSkeleton,
  SellerTypeSkeleton,
} from "./loading-skeletons"

const SellerType = dynamic(() => import("./steps/seller-type"))
const IndividualInfo = dynamic(() => import("./steps/individual-info"))
const BusinessInfo = dynamic(() => import("./steps/business-info"))
const AddressInfo = dynamic(() => import("./steps/address-info"))
const Review = dynamic(() => import("./steps/review"))

export function getSteps(
  sellerType: "individual" | "business" | null
): StepType[] {
  const baseSteps = [
    {
      label: "Seller Type",
      description: "Choose your seller type",
      id: "type",
      fields: ["sellerType"],
    },
  ]

  const individualSteps = [
    {
      label: "Personal Information",
      description: "Your personal details",
      id: "individual",
      fields: ["firstName", "lastName", "email", "phone", "idNumber"],
    },
  ]

  const businessSteps = [
    {
      label: "Business Information",
      description: "Your business details",
      id: "business",
      fields: ["businessName", "registrationNumber", "dealerLicense"],
    },
  ]

  const commonSteps = [
    {
      label: "Address",
      description: "Location details",
      id: "address",
      fields: ["address"],
    },
    {
      label: "Review",
      description: "Review your information",
      id: "review",
      fields: [],
    },
  ]

  return [
    ...baseSteps,
    ...(sellerType === "individual"
      ? individualSteps
      : sellerType === "business"
        ? businessSteps
        : []),
    ...commonSteps,
  ]
}

export default function RegistrationSteps() {
  const { openModal } = useModal()
  const [step] = useAtom(StepAtom)
  const [registration] = useAtom(registrationAtom)
  const [isHydrated, setIsHydrated] = useState(false)
  const steps = getSteps(registration.sellerType)

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Protect the route only after hydration
  useEffect(() => {
    if (isHydrated && (!registration.category || !registration.plan?.name)) {
      openModal("SELLER_CATEGORY_OPTION")
    }
  }, [isHydrated, openModal, registration])

  const getLoadingSkeleton = () => {
    if (step === 1) return <SellerTypeSkeleton />
    if (step === 2)
      return registration.sellerType === "individual" ? (
        <IndividualInfoSkeleton />
      ) : (
        <BusinessInfoSkeleton />
      )
    if (step === 3) return <AddressInfoSkeleton />
    if (step === 4) return <ReviewSkeleton />
  }

  // Show nothing until hydration is complete
  if (!isHydrated) {
    return (
      <div className="relative min-h-[90vh] w-full">
        <div className="absolute inset-0 -z-10 bg-grid-gray-900/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-white/5" />
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-2 w-full" />
          </div>
        </div>

        <div className="container flex flex-grow items-center justify-center px-4 pb-20 pt-8">
          {getLoadingSkeleton()}
        </div>
      </div>
    )
  }

  const getStepComponent = () => {
    if (step === 1) return <SellerType />

    if (registration.sellerType === "individual") {
      switch (step) {
        case 2:
          return <IndividualInfo />
        case 3:
          return <AddressInfo />
        case 4:
          return <Review />
      }
    }

    if (registration.sellerType === "business") {
      switch (step) {
        case 2:
          return <BusinessInfo />
        case 3:
          return <AddressInfo />
        case 4:
          return <Review />
      }
    }
  }

  return (
    <div className="relative min-h-[90vh] w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-gray-900/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-white/5" />
      <div className="mx-auto max-w-4xl px-4 py-6">
        <StepIndicator currentStep={step - 1} steps={steps} />
        <ProgressBar currentStep={step - 1} totalSteps={steps.length} />
      </div>

      <div className="container flex flex-grow items-center justify-center px-4 pb-20 pt-8">
        {getStepComponent()}
      </div>
    </div>
  )
}
