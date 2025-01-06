"use client"

import { StepAtom, registrationAtom } from "@/atoms/registration"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAtom, useSetAtom } from "jotai"
import { AlertCircle, Check, Edit, MapPin, Shield, Store } from "lucide-react"
import { useState } from "react"

export default function ReviewInfo() {
  const [registration] = useAtom(registrationAtom)
  const setStep = useSetAtom(StepAtom)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEdit = (step: number) => {
    setStep(step)
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      // API call to submit registration
      // await submitRegistration(registration)

      // Navigate to success page or dashboard
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="relative mx-auto w-full max-w-2xl px-4">
        <div className="space-y-8">
          {/* Category and Plan Info */}
          <Card className="p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Selected Plan</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(1)}
                className="h-8 px-2"
              >
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">
                      {registration.category?.category}
                    </p>
                    <p className="text-sm text-gray-500">Category</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <div>
                  <p className="font-medium">{registration.plan?.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatMoney(registration.plan?.monthlyPrice || 0)}/month
                  </p>
                </div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </Card>

          {/* Individual/Business Info */}
          <Card className="p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {registration.sellerType === "individual"
                  ? "Personal Information"
                  : "Business Information"}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(2)}
                className="h-8 px-2"
              >
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
            </div>
            <div className="space-y-4">
              {registration.sellerType === "individual" ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">National ID</p>
                      <p className="font-medium">
                        {registration.individualInfo.nationalId}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Tax PIN</p>
                      <p className="font-medium">
                        {registration.individualInfo.taxpinNumber}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">
                        {registration.individualInfo.gender}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">WhatsApp</p>
                      <p className="font-medium">
                        {registration.individualInfo.whatsappPhone ||
                          "Not provided"}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Business Name</p>
                    <p className="font-medium">
                      {registration.businessInfo.businessName}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">
                        Registration Number
                      </p>
                      <p className="font-medium">
                        {registration.businessInfo.businessRegistrationNumber}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Tax PIN</p>
                      <p className="font-medium">
                        {registration.businessInfo.businessTaxpinNumber}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Address Information */}
          <Card className="p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Location</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(3)}
                className="h-8 px-2"
              >
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">{registration.address.street}</p>
                  <p className="text-sm text-gray-500">
                    {registration.address.city}, {registration.address.province}{" "}
                    {registration.address.postalCode}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Confirmation Alert */}
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Please review all information carefully. Once submitted, some
              details cannot be changed without contacting support.
            </AlertDescription>
          </Alert>

          {/* Terms and Privacy */}
          <div className="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                By clicking Submit, you agree to our Terms of Service and
                Privacy Policy. Your information will be verified before account
                activation.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>

      {/* Fixed Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              size="lg"
              className="w-full"
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
