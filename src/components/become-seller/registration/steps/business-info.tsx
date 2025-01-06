"use client"

import { StepAtom, registrationAtom } from "@/atoms/registration"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/ui/forms/custom-field-form"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FormFieldType } from "@/types/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom, useSetAtom } from "jotai"
import { Info, Lock, Upload } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const businessInfoSchema = z.object({
  logo: z.string().default(""),
  businessName: z
    .string()
    .min(3, "Business name must be at least 3 characters"),
  businessRegistrationNumber: z
    .string()
    .min(1, "Registration number is required"),
  businessTaxpinNumber: z.string().min(1, "Tax PIN number is required"),
  dealerLicense: z.string().optional(),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(500, "Description must not exceed 500 characters"),
  vatNumber: z.string().optional(),
  tradingLicense: z.string().optional(),
  whatsappPhone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .optional(),
  businessEmail: z.string().email("Please enter a valid email address"),
  businessPhone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
})

type BusinessInfoFormValues = z.infer<typeof businessInfoSchema>

export default function BusinessInfo() {
  const [registration, setRegistration] = useAtom(registrationAtom)
  const setStep = useSetAtom(StepAtom)

  const form = useForm<BusinessInfoFormValues>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: registration.businessInfo,
  })

  const onSubmit = (data: BusinessInfoFormValues) => {
    setRegistration((prev) => ({
      ...prev,
      businessInfo: data,
    }))
    setStep(3)
  }

  const handleBack = () => {
    setStep(1)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Profile */}
          <Card className="p-6">
            <div className="space-y-6">
              {/* Logo Upload (placeholder for now) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company Profile</h3>
                <div className="flex justify-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
              </div>

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                label="Business Name"
                name="businessName"
                control={form.control}
                placeholder="Enter your business name"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                label="Business Registration Number"
                name="businessRegistrationNumber"
                control={form.control}
                placeholder="Enter business registration number"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                label="Business Tax PIN"
                name="businessTaxpinNumber"
                control={form.control}
                placeholder="Enter business tax PIN"
              />
            </div>
          </Card>

          {/* Business Details */}
          <Card className="p-6">
            <div className="space-y-6">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                label="Business Description"
                name="description"
                control={form.control}
                placeholder="Describe your business..."
                props={{ maxLength: 500, showCount: true }}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  label="Business Email"
                  name="businessEmail"
                  control={form.control}
                  placeholder="Enter business email"
                />

                <CustomFormField
                  fieldType={FormFieldType.PHONEINPUT}
                  label="Business Phone"
                  name="businessPhone"
                  control={form.control}
                  placeholder="Enter business phone"
                />
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <CustomFormField
                      fieldType={FormFieldType.PHONEINPUT}
                      label="WhatsApp Number (Optional)"
                      name="whatsappPhone"
                      control={form.control}
                      placeholder="Enter WhatsApp number"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Adding a WhatsApp number makes it easier for our support
                    team to contact you
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Card>

          {/* Licenses and Certifications */}
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">
                Licenses & Certifications
              </h3>

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                label="Dealer License Number (Optional)"
                name="dealerLicense"
                control={form.control}
                placeholder="Enter dealer license number"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                label="VAT Registration Number (Optional)"
                name="vatNumber"
                control={form.control}
                placeholder="Enter VAT registration number"
              />

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Please ensure all business information is accurate and matches
                  your official registration documents.
                </AlertDescription>
              </Alert>

              <Alert variant="warning">
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  Your business documents are securely stored and will only be
                  used for verification purposes.
                </AlertDescription>
              </Alert>
            </div>
          </Card>

          {/* Navigation */}
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
                <Button type="submit" size="lg" className="w-full">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
