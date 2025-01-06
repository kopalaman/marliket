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
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FormFieldType } from "@/types/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom, useSetAtom } from "jotai"
import { Info, Lock } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const individualInfoSchema = z.object({
  gender: z.string().min(1, "Gender is required"),
  nationalId: z.string().min(1, "National ID is required"),
  taxpinNumber: z.string().min(1, "Tax PIN number is required"),
  associationName: z.string().optional(),
  identityToken: z.string().optional(),
  whatsappPhone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .optional(),
})

type IndividualInfoFormValues = z.infer<typeof individualInfoSchema>

export default function IndividualInfo() {
  const [registration, setRegistration] = useAtom(registrationAtom)
  const setStep = useSetAtom(StepAtom)

  const form = useForm<IndividualInfoFormValues>({
    resolver: zodResolver(individualInfoSchema),
    defaultValues: registration.individualInfo,
  })

  const onSubmit = (data: IndividualInfoFormValues) => {
    setRegistration((prev) => ({
      ...prev,
      individualInfo: data,
    }))
    setStep(3)
  }

  const handleBack = () => {
    setStep(1)
  }

  return (
    <div className="relative min-h-screen pb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-900/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-white/5" />

      <div className="relative mx-auto w-full max-w-2xl px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <Card className="p-6 shadow-lg">
              <div className="grid gap-6">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  label="Gender"
                  name="gender"
                  control={form.control}
                />

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  label="National ID"
                  name="nationalId"
                  control={form.control}
                  placeholder="******/**/*"
                />

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  label="Tax PIN Number"
                  name="taxpinNumber"
                  control={form.control}
                  placeholder="Enter your tpin number"
                />

                <CustomFormField
                  fieldType={FormFieldType.PHONEINPUT}
                  label="WhatsApp Phone"
                  name="whatsappPhone"
                  control={form.control}
                  placeholder="e.g., +260123456789"
                />
              </div>
            </Card>

            {/* Additional Information */}
            <Card className="p-6 shadow-lg">
              <div className="space-y-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <CustomFormField
                          fieldType={FormFieldType.INPUT}
                          label="Association Name (Optional)"
                          name="associationName"
                          control={form.control}
                          placeholder="Enter your association name if applicable"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        If you&apos;re a member of a vehicle sellers
                        association, enter the name here. This can help verify
                        your credentials.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <CustomFormField
                          fieldType={FormFieldType.INPUT}
                          label="Identity Token (Optional)"
                          name="identityToken"
                          control={form.control}
                          placeholder="Enter your identity token if you have one"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Your identity token from previous registrations or
                        associated platforms can speed up verification.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Your information will be verified for security purposes.
                      Make sure all details are accurate and match your
                      documents.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="destructive">
                    <Lock className="h-4 w-4" />
                    <AlertDescription>
                      Your personal information is securely stored and will not
                      be shared publicly. Only required details will be visible
                      to verified buyers.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </Card>
          </form>
        </Form>
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
              type="submit"
              size="lg"
              className="w-full"
              onClick={form.handleSubmit(onSubmit)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
