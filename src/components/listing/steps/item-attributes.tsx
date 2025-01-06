"use client"

import CreateListingFooter from "@/components/shared/footer/create-listing-footer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Text from "@/components/ui/text"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom, useSetAtom } from "jotai"
import { AlertCircle, PlusCircle, X } from "lucide-react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { stepAtom, StoreAtom } from "../add-listing"

// Schema for single attribute value
const attributeValueSchema = z.object({
  id: z.string(),
  value: z.string().min(1, "Value is required"),
})

// Schema for attribute
const attributeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Attribute name is required"),
  values: z.array(attributeValueSchema),
  isVariation: z.boolean().default(false),
})

// Main form schema
const attributesFormSchema = z.object({
  hasVariations: z.boolean().default(false),
  attributes: z
    .array(attributeSchema)
    .min(1, "At least one attribute is required"),
})

type AttributesFormValues = z.infer<typeof attributesFormSchema>

export default function ItemAttributes() {
  const setStep = useSetAtom(stepAtom)
  const [store, setStore] = useAtom(StoreAtom)

  const form = useForm<AttributesFormValues>({
    resolver: zodResolver(attributesFormSchema),
    defaultValues: {
      hasVariations: store.hasVariations || false,
      attributes: store.attributes?.length
        ? store.attributes
        : [
            {
              id: crypto.randomUUID(),
              name: "",
              values: [],
              isVariation: false,
            },
          ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  })

  const onSubmit = (data: AttributesFormValues) => {
    console.log("Form is valid:", form.formState.isValid)
    console.log("Form errors:", form.formState.errors)
    console.log("Form data:", data)
    console.log()
    setStore((prev) => ({
      ...prev,
      hasVariations: data.hasVariations,
      attributes: data.attributes,
    }))
    // If variations are enabled, go to variation management
    setStep(data.hasVariations ? 6 : 7)
  }

  const addAttribute = () => {
    append({
      id: crypto.randomUUID(),
      name: "",
      values: [],
      isVariation: false,
    })
  }

  const addValueToAttribute = (attributeIndex: number, value: string) => {
    const currentValues = form.getValues(`attributes.${attributeIndex}.values`)
    if (!currentValues.find((v) => v.value === value)) {
      const newValue = {
        id: crypto.randomUUID(),
        value: value.trim(),
      }
      form.setValue(`attributes.${attributeIndex}.values`, [
        ...currentValues,
        newValue,
      ])
    }
  }

  const removeValue = (attributeIndex: number, valueId: string) => {
    const currentValues = form.getValues(`attributes.${attributeIndex}.values`)
    form.setValue(
      `attributes.${attributeIndex}.values`,
      currentValues.filter((v) => v.id !== valueId)
    )
  }

  const hasVariations = form.watch("hasVariations")

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Variations Toggle */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Text className="text-base font-medium">Enable Variations</Text>
                <Text className="text-sm text-muted-foreground">
                  Turn on if your product comes in multiple options
                </Text>
              </div>
              <Controller
                name="hasVariations"
                control={form.control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </Card>

          {/* Attributes Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Text className="text-lg font-medium">Product Attributes</Text>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAttribute}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Attribute
              </Button>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id} className="p-6">
                <div className="space-y-4">
                  {/* Attribute Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <Label>Attribute Name</Label>
                      <Input
                        {...form.register(`attributes.${index}.name`)}
                        placeholder="e.g., Size, Color, Material"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Variation Toggle */}
                  {hasVariations && (
                    <div className="flex items-center justify-between border-t pt-4">
                      <Text className="text-sm">Use for variations</Text>
                      <Controller
                        name={`attributes.${index}.isVariation`}
                        control={form.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  )}

                  {/* Values Section */}
                  <div className="space-y-2">
                    <Label>Values</Label>
                    <div className="flex flex-wrap gap-2">
                      <Controller
                        name={`attributes.${index}.values`}
                        control={form.control}
                        render={({ field }) => (
                          <>
                            {field.value.map((val) => (
                              <Badge
                                key={val.id}
                                variant="secondary"
                                className="gap-1"
                              >
                                {val.value}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 p-0 hover:bg-transparent"
                                  onClick={() => removeValue(index, val.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                            <Input
                              className="!mt-0 w-[180px]"
                              placeholder="Type and press Enter"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  const value = e.currentTarget.value.trim()
                                  if (value) {
                                    addValueToAttribute(index, value)
                                    e.currentTarget.value = ""
                                  }
                                }
                              }}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {hasVariations && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You&apos;ll be able to manage variation details in the next
                  step
                </AlertDescription>
              </Alert>
            )}
          </div>

          <CreateListingFooter
            onBack={() => setStep(4)}
            onNext={form.handleSubmit(onSubmit)}
            // isNextDisabled={!form.formState.isValid}
          />
        </form>
      </Form>
    </div>
  )
}
