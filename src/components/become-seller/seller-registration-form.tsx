"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/ui/forms/custom-field-form"
import { SubmitButton } from "@/components/ui/forms/form-submit-button"
import {
  SellerRegistrationFormData,
  sellerRegistrationSchema,
} from "@/lib/validations/personal-profile"
import { FormFieldType } from "@/types/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

function SellerInfoForm() {
  const router = useRouter()
  const isPending = false

  const form = useForm<SellerRegistrationFormData>({
    resolver: zodResolver(sellerRegistrationSchema),
    defaultValues: {
      storeName: "",
      businessType: "Individual",
      location: {
        province: "",
        city: "",
        address: "",
      },
      personalInfo: {
        firstName: "",
        lastName: "",
        dateOfBirth: new Date(),
        nationalId: "",
        tpin: "",
        phone: "",
        alternativePhone: "",
      },
      agreeToTerms: false,
      agreeToPrivacyPolicy: false,
    },
  })

  const businessType = form.watch("businessType")

  useEffect(() => {
    if (businessType !== "Individual") {
      router.push("/seller/business-registration")
    }
  }, [businessType, router])

  const handleSubmit = async (data: SellerRegistrationFormData) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto max-w-3xl space-y-8"
      >
        {/* Business Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Seller Type</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="businessType"
              label="Type of Seller"
              placeholder="Select seller type"
              disabled={isPending}
              props={{
                options: [
                  { value: "Individual", label: "Individual Seller" },
                  { value: "RegisteredBusiness", label: "Registered Business" },
                  { value: "NonProfit", label: "Non-Profit Organization" },
                ],
              }}
            />
          </CardContent>
        </Card>

        {/* Public Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Public Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                This information will be visible to the public on your store
                profile.
              </AlertDescription>
            </Alert>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="storeName"
              label="Store Name"
              placeholder="Enter your store name"
              disabled={isPending}
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name="about"
              label="About Your Store"
              placeholder="Tell potential buyers about yourself and your vehicles"
              disabled={isPending}
            />

            <div className="grid grid-cols-2 gap-4">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="location.province"
                label="Province"
                placeholder="Select province"
                disabled={isPending}
                props={{
                  options: [
                    { value: "Lusaka", label: "Lusaka Province" },
                    // ... other provinces
                  ],
                }}
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="location.city"
                label="City"
                placeholder="Enter your city"
                disabled={isPending}
              />

              <div className="col-span-2">
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  name="location.address"
                  label="Address"
                  placeholder="Enter your address"
                  disabled={isPending}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                This information is for verification purposes only and will not
                be shared publicly.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="personalInfo.firstName"
                label="First Name"
                placeholder="Enter your first name"
                disabled={isPending}
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="personalInfo.lastName"
                label="Last Name"
                placeholder="Enter your last name"
                disabled={isPending}
              />
            </div>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATETIME}
              name="personalInfo.dateOfBirth"
              label="Date of Birth"
              disabled={isPending}
              props={{
                granularity: "day",
              }}
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="personalInfo.nationalId"
              label="National ID Number"
              placeholder="Enter your National ID number"
              disabled={isPending}
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="personalInfo.tpin"
              label="Tax ID (TPIN) - Optional"
              placeholder="Enter your TPIN if available"
              disabled={isPending}
            />

            <div className="grid grid-cols-2 gap-4">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.PHONEINPUT}
                name="personalInfo.phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                disabled={isPending}
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.PHONEINPUT}
                name="personalInfo.alternativePhone"
                label="Alternative Phone (Optional)"
                placeholder="Enter alternative phone number"
                disabled={isPending}
              />
            </div>
          </CardContent>
        </Card>

        {/* Terms and Agreements */}
        <Card>
          <CardHeader>
            <CardTitle>Terms and Agreements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.CHECKBOX}
              name="agreeToTerms"
              label="I agree to the Terms of Service and Vehicle Listing Guidelines"
              disabled={isPending}
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.CHECKBOX}
              name="agreeToPrivacyPolicy"
              label="I understand and agree to the Privacy Policy regarding the handling of my personal information"
              disabled={isPending}
            />
          </CardContent>
        </Card>

        <SubmitButton isSubmitting={isPending} className="w-full">
          {isPending ? "Registering..." : "Complete Registration"}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default SellerInfoForm
