"use client"

import { StepAtom, registrationAtom } from "@/atoms/registration"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/ui/forms/custom-field-form"
import { FormFieldType } from "@/types/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom, useSetAtom } from "jotai"
import { Info, MapPin } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
})

type AddressFormValues = z.infer<typeof addressSchema>

const provinceOptions = [
  { label: "Lusaka", value: "lusaka" },
  { label: "Copperbelt", value: "copperbelt" },
  { label: "Central", value: "central" },
  { label: "Eastern", value: "eastern" },
  { label: "Western", value: "western" },
  { label: "Southern", value: "southern" },
  { label: "Northern", value: "northern" },
  { label: "Luapula", value: "luapula" },
  { label: "North-Western", value: "north-western" },
  { label: "Muchinga", value: "muchinga" },
]

export default function AddressInfo() {
  const [registration, setRegistration] = useAtom(registrationAtom)
  const setStep = useSetAtom(StepAtom)
  const [mapError, setMapError] = useState("")

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: registration.address,
  })

  const onSubmit = (data: AddressFormValues) => {
    // Validate map location if required
    // if (!data.latitude || !data.longitude) {
    //   setMapError("Please select your location on the map")
    //   return
    // }

    setRegistration((prev) => ({
      ...prev,
      address: {
        ...data,
        isPrimary: true,
        latitude: data.latitude || "",
        longitude: data.longitude || "",
      },
    }))
    setStep(4) // Move to next step
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  // Handle map click to update coordinates
  const handleMapClick = (lat: string, lng: string) => {
    form.setValue("latitude", lat)
    form.setValue("longitude", lng)
    setMapError("")
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="relative mx-auto w-full max-w-2xl px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Address Details */}
            <Card className="p-6 shadow-lg">
              <div className="grid gap-6">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  label="Street Address"
                  name="street"
                  control={form.control}
                  placeholder="Enter your street address"
                  props={{ maxLength: 50, showCount: true }}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    label="City"
                    name="city"
                    control={form.control}
                    placeholder="Enter city"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    label="Province"
                    name="province"
                    control={form.control}
                    props={{ options: provinceOptions }}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    label="Postal Code"
                    name="postalCode"
                    control={form.control}
                    placeholder="Enter postal code"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    label="Country"
                    name="country"
                    control={form.control}
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </Card>

            {/* Map Section */}
            <Card className="p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Select Location on Map
                  </h3>
                  <MapPin className="h-5 w-5 text-gray-500" />
                </div>

                <div className="h-[300px] w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                  {/* Map Component Goes Here */}
                  {/* Replace this with your map implementation */}
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    Map Component Placeholder
                  </div>
                </div>

                {mapError && <p className="text-sm text-red-500">{mapError}</p>}

                <div className="grid grid-cols-2 gap-4">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    label="Latitude"
                    name="latitude"
                    control={form.control}
                    props={{ readOnly: true }}
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    label="Longitude"
                    name="longitude"
                    control={form.control}
                    props={{ readOnly: true }}
                  />
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Your exact location helps buyers find vehicles in their
                    area. This information will be visible on your listings.
                  </AlertDescription>
                </Alert>
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
