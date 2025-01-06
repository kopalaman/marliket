"use client"

import FormError from "@/components/auth/form-error"
import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/ui/forms/custom-field-form"
import { SubmitButton } from "@/components/ui/forms/form-submit-button"
import { useCreateVendor } from "@/data/vendors"
import { ApiError } from "@/lib/error"
import { vendorLoginSchema, vendorRegisterFormSchema } from "@/lib/validation"
import { FormFieldType } from "@/types/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import VendorAuthWrapper from "./auth-wrapper"

function VendorLoginForm() {
  const isPending = false

  const form = useForm<z.infer<typeof vendorLoginSchema>>({
    resolver: zodResolver(vendorLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = async (data: z.infer<typeof vendorLoginSchema>) => {}
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="col-span-2">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email"
            placeholder="Enter your email"
            disabled={isPending}
            props={{ type: "email" }}
          />
        </div>
        <div className="col-span-2">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="password"
            label="Password"
            placeholder="Enter your password"
            disabled={isPending}
            props={{ type: "password" }}
          />
        </div>

        {/* {error instanceof ApiError && <FormError message={error?.message} />} */}
        <SubmitButton
          isSubmitting={isPending}
          className="col-span-2 mt-3 text-center"
        >
          {isPending ? "Loading..." : "Login"}
        </SubmitButton>
      </form>
    </Form>
  )
}
function VendorRegisterForm() {
  const {
    mutateAsync: registerMutate,
    isPending,
    error,
    isSuccess,
  } = useCreateVendor()

  const form = useForm<z.infer<typeof vendorRegisterFormSchema>>({
    resolver: zodResolver(vendorRegisterFormSchema),
    defaultValues: {
      vendorName: "",
      phone: "",
      IsOnWhatsApp: false,
      email: "",
      companyName: "",
      companyRegistrationNumber: "",
      companyType: "",
      tpin: "",
      address: "",
      provice: "",
      city: "",
    },
  })

  const handleSubmit = async (
    data: z.infer<typeof vendorRegisterFormSchema>
  ) => {
    try {
      await registerMutate({ json: data })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="col-span-2 space-y-4">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="vendorName"
            label="Seller Name or Vendor Name"
            placeholder="Enter your account name"
            disabled={isPending}
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="companyName"
            label="Registered Company Name"
            placeholder="Enter your company name"
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col items-start">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONEINPUT}
            name="phone"
            label="Phone"
            placeholder="Enter your phone number"
            disabled={isPending}
            props={{ type: "phone" }}
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.CHECKBOX}
            name="IsOnWhatsApp"
            label="Is on WhatsApp?"
            placeholder=""
            disabled={isPending}
            className="mt-2"
          />
        </div>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="Enter your email"
          disabled={isPending}
          props={{ type: "email" }}
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="companyRegistrationNumber"
          label="Business/Company Registration Number"
          placeholder="Enter your company registration"
          disabled={isPending}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="companyType"
          label="Company Type"
          placeholder="select type"
          disabled={isPending}
          props={{
            options: [
              { value: "Limited Company", label: "Limited company" },
              { value: "Sole Proprietor", label: "Sole proprietor" },
              { value: "Partnership", label: "Partnership" },
              { value: "Business Name", label: "Business name" },
              { value: "Non-Profit", label: "Non-profit" },
              { value: "Other", label: "Other" },
            ],
          }}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="tpin"
          label="Tax ID or Tpin"
          placeholder="Enter your tax ID or Tpin"
          disabled={isPending}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="address"
          label="Address"
          placeholder="Enter your address"
          disabled={isPending}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="provice"
          label="Province"
          placeholder="select province"
          disabled={isPending}
          props={{
            options: [
              { value: "Central", label: "Central Province" },
              { value: "Copperbelt", label: "Copperbelt Province" },
              { value: "Eastern", label: "Eastern Province" },
              { value: "Luapula", label: "Luapula Province" },
              { value: "Lusaka", label: "Lusaka Province" },
              { value: "Muchinga", label: "Muchinga Province" },
              { value: "Northern", label: "Northern Province" },
              { value: "North-Western", label: "North-Western Province" },
              { value: "Southern", label: "Southern Province" },
              { value: "Western", label: "Western Province" },
            ],
          }}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="city"
          label="City"
          placeholder="Enter your city"
          disabled={isPending}
        />
        {error instanceof ApiError && <FormError message={error?.message} />}
        <SubmitButton
          isSubmitting={isPending}
          className="col-span-2 mt-3 text-center"
        >
          {isPending ? "Registering..." : "Register"}
        </SubmitButton>
      </form>
    </Form>
  )
}

// RenderAuth.tsx
const RenderVendorAuth: React.FC = () => {
  // Get initial state from localStorage or default to LOGIN_VIEW
  const [view, setView] = useState<"LOGIN_VIEW" | "REGISTER_VIEW">(() => {
    const savedView = localStorage.getItem("vendorAuthView")
    return savedView === "LOGIN_VIEW" || savedView === "REGISTER_VIEW"
      ? savedView
      : "LOGIN_VIEW"
  })

  // Update localStorage when view changes
  useEffect(() => {
    localStorage.setItem("vendorAuthView", view)
  }, [view])

  const handleRedirectLinkClick = () => {
    setView(view === "LOGIN_VIEW" ? "REGISTER_VIEW" : "LOGIN_VIEW")
  }

  return (
    <VendorAuthWrapper
      headerTitle={
        view === "REGISTER_VIEW" ? "Start your free trial" : "Welcome back"
      }
      headerDescription={
        view === "REGISTER_VIEW"
          ? "Enter your details to create a new account"
          : "Enter your credentials to sign in to your account"
      }
      redirectText={
        view === "REGISTER_VIEW"
          ? "Already have an account?"
          : "Don't have an account?"
      }
      redirectLinkText={view === "REGISTER_VIEW" ? "Login" : "Sign up"}
      redirectLinkView={view}
      handleRedirectLinkClick={handleRedirectLinkClick}
    >
      {view === "REGISTER_VIEW" ? <VendorRegisterForm /> : <VendorLoginForm />}
    </VendorAuthWrapper>
  )
}
export default RenderVendorAuth
