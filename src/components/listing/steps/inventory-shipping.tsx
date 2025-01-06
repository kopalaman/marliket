"use client"

import CreateListingFooter from "@/components/shared/footer/create-listing-footer"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Text from "@/components/ui/text"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom, useSetAtom } from "jotai"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { stepAtom, StoreAtom } from "../add-listing"
import Counter from "../counter"

const inventoryShippingSchema = z.object({
  sku: z.string().optional(),
  stockQuantity: z.number().min(0, "Stock quantity cannot be negative"),
  lowStockAlert: z.number().min(0, "Alert threshold cannot be negative"),
  weight: z.string().optional(),
  dimensions: z.object({
    length: z.string(),
    width: z.string(),
    height: z.string(),
  }),
  shippingClass: z.string().optional(),
})

type InventoryShippingValues = z.infer<typeof inventoryShippingSchema>

export default function InventoryShipping() {
  const setStep = useSetAtom(stepAtom)
  const [store, setStore] = useAtom(StoreAtom)

  const form = useForm<InventoryShippingValues>({
    resolver: zodResolver(inventoryShippingSchema),
    defaultValues: {
      sku: store.sku,
      stockQuantity: store.stockQuantity,
      lowStockAlert: store.lowStockAlert,
      weight: store.weight,
      dimensions: store.dimensions,
      shippingClass: store.shippingClass,
    },
  })

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form

  function handleInventoryShipping(data: InventoryShippingValues) {
    setStore((prev) => ({
      ...prev,
      ...data,
    }))
    setStep(5)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Form {...form}>
        <form
          noValidate
          onSubmit={handleSubmit(handleInventoryShipping)}
          className="space-y-8"
        >
          {/* Inventory Management */}
          <div className="space-y-4">
            <Text tag="h2" className="text-2xl font-semibold">
              Inventory Management
            </Text>

            <Card className="grid grid-cols-1 gap-6 p-6">
              <div className="space-y-2">
                <Label>SKU (Stock Keeping Unit)</Label>
                <Input {...register("sku")} placeholder="Enter product SKU" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="stockQuantity"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="space-y-2">
                      <Label>Stock Quantity</Label>
                      <Counter
                        count={value || 0}
                        onCount={onChange}
                        countBy={1}
                        className="card-gradient rounded-md border p-2"
                      />
                      {errors.stockQuantity && (
                        <p className="text-sm text-destructive">
                          {errors.stockQuantity.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="lowStockAlert"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="space-y-2">
                      <Label>Low Stock Alert</Label>
                      <Counter
                        count={value || 0}
                        onCount={onChange}
                        countBy={1}
                        className="card-gradient rounded-md border p-2"
                      />
                      {errors.lowStockAlert && (
                        <p className="text-sm text-destructive">
                          {errors.lowStockAlert.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </Card>
          </div>

          {/* Shipping Details */}
          <div className="space-y-4">
            <Text tag="h2" className="text-2xl font-semibold">
              Shipping Information
            </Text>

            <Card className="grid grid-cols-1 gap-6 p-6">
              <div className="space-y-2">
                <Label>Weight</Label>
                <Input {...register("weight")} placeholder="Product weight" />
              </div>

              <div className="space-y-4">
                <Label>Dimensions</Label>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Length
                    </Label>
                    <Input
                      {...register("dimensions.length")}
                      placeholder="Length"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Width
                    </Label>
                    <Input
                      {...register("dimensions.width")}
                      placeholder="Width"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Height
                    </Label>
                    <Input
                      {...register("dimensions.height")}
                      placeholder="Height"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Shipping Class</Label>
                <Input
                  {...register("shippingClass")}
                  placeholder="e.g., Standard, Express"
                />
              </div>
            </Card>
          </div>

          <CreateListingFooter
            onBack={() => setStep(3)}
            onNext={handleSubmit(handleInventoryShipping)}
            // isNextDisabled={!form.formState.isValid}
          />
        </form>
      </Form>
    </div>
  )
}
