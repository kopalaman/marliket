"use client"

import CreateListingFooter from "@/components/shared/footer/create-listing-footer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Text from "@/components/ui/text"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom, useSetAtom } from "jotai"
import { InfoIcon } from "lucide-react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { stepAtom, StoreAtom } from "../add-listing"

// Types for variation structure
type VariationAttribute = {
  name: string
  value: string
}

// Schema for single variation
const variationSchema = z.object({
  id: z.string(),
  attributes: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ),
  price: z.number().min(0, "Price must be positive"),
  salePrice: z.number().min(0).optional(),
  sku: z.string().optional(),
  stockQuantity: z.number().min(0, "Stock must be positive"),
  enabled: z.boolean().default(true),
})

// Schema for form
const variationFormSchema = z.object({
  variations: z.array(variationSchema),
})

type VariationFormValues = z.infer<typeof variationFormSchema>

export default function VariantManagement() {
  const setStep = useSetAtom(stepAtom)
  const [store, setStore] = useAtom(StoreAtom)

  // Generate combinations of variations from attributes
  const generateVariations = () => {
    const variationAttributes = store.attributes.filter(
      (attr) => attr.isVariation
    )

    const generateCombinations = (
      attributeIndex: number,
      current: VariationAttribute[] = []
    ): VariationAttribute[][] => {
      if (attributeIndex === variationAttributes.length) {
        return [current]
      }

      const attribute = variationAttributes[attributeIndex]
      const combinations: VariationAttribute[][] = []

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      attribute.values.forEach((value: any) => {
        const newCurrent = [
          ...current,
          { name: attribute.name, value: value.value },
        ]
        combinations.push(
          ...generateCombinations(attributeIndex + 1, newCurrent)
        )
      })

      return combinations
    }

    const combinations = generateCombinations(0)

    return combinations.map((attrs) => ({
      id: attrs
        .map((a) => `${a.name}-${a.value}`)
        .join("-")
        .toLowerCase(),
      attributes: attrs,
      price: store.price || 0,
      salePrice: store.salePrice,
      sku: "",
      stockQuantity: 0,
      enabled: true,
    }))
  }

  // Initialize form
  const form = useForm<VariationFormValues>({
    resolver: zodResolver(variationFormSchema),
    defaultValues: {
      variations: store.variations?.length
        ? store.variations
        : generateVariations(),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: "variations",
  })

  // Handle form submission
  const onSubmit = (data: VariationFormValues) => {
    setStore((prev) => ({
      ...prev,
      variations: data.variations,
    }))
    setStep(7)
  }

  // Bulk actions
  const applyBulkPrice = (price: number) => {
    fields.forEach((_, index) => {
      form.setValue(`variations.${index}.price`, price)
    })
  }

  const applyBulkStock = (quantity: number) => {
    fields.forEach((_, index) => {
      form.setValue(`variations.${index}.stockQuantity`, quantity)
    })
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-2xl font-semibold">Product Variations</Text>
              <Text className="text-sm text-muted-foreground">
                Manage pricing and inventory for each variation
              </Text>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const newVariations = generateVariations()
                form.reset({ variations: newVariations })
              }}
            >
              Regenerate All
            </Button>
          </div>

          {/* Bulk Actions */}
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <Text className="text-sm font-medium">Bulk Actions</Text>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Price"
                    className="w-24"
                    onChange={(e) => applyBulkPrice(Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="Stock"
                    className="w-24"
                    onChange={(e) => applyBulkStock(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Variations Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Switch />
                  </TableHead>
                  <TableHead>Variation</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Sale Price</TableHead>
                  <TableHead>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell>
                      <Controller
                        name={`variations.${index}.enabled`}
                        control={form.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {field.attributes.map((attr, i) => (
                          <Badge key={i} variant="secondary">
                            {attr.value}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        {...form.register(`variations.${index}.sku`)}
                        placeholder="SKU"
                        className="w-32"
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={`variations.${index}.price`}
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            placeholder="0.00"
                            className="w-24"
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={`variations.${index}.salePrice`}
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            placeholder="0.00"
                            className="w-24"
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={`variations.${index}.stockQuantity`}
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            placeholder="0"
                            className="w-20"
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Info Alert */}
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Disabled variations will not be available for purchase
            </AlertDescription>
          </Alert>

          <CreateListingFooter
            onBack={() => setStep(5)}
            onNext={form.handleSubmit(onSubmit)}
            // isNextDisabled={!form.formState.isValid}
          />
        </form>
      </Form>
    </div>
  )
}
