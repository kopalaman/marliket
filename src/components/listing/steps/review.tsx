/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import CreateListingFooter from "@/components/shared/footer/create-listing-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import Text from "@/components/ui/text"
import { useAtom, useSetAtom } from "jotai"
import { ImageIcon, PackageSearch, Pencil, Settings, Tags } from "lucide-react"
import Image from "next/image"
import { stepAtom, StoreAtom } from "../add-listing"

export default function Review() {
  const setStep = useSetAtom(stepAtom)
  const [store] = useAtom(StoreAtom)

  const handlePublish = () => {
    // Here you would typically submit the data to your API
    console.log("Publishing product:", store)
  }

  // Section with edit button
  const Section = ({
    title,
    step,
    icon: Icon,
    children,
  }: {
    title: string
    step: number
    icon: any
    children: React.ReactNode
  }) => (
    <Card className="relative overflow-hidden">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <Text className="font-medium">{title}</Text>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => setStep(step)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </Card>
  )

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="space-y-6">
        <div>
          <Text className="text-2xl font-semibold">Review Your Product</Text>
          <Text className="text-muted-foreground">
            Review all information before publishing
          </Text>
        </div>

        {/* Basic Information */}
        <Section title="Basic Information" step={2} icon={Settings}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Name</TableCell>
                <TableCell>{store.itemName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Type</TableCell>
                <TableCell>{store.itemType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Brand</TableCell>
                <TableCell>{store.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Price</TableCell>
                <TableCell>${store.price}</TableCell>
              </TableRow>
              {store.salePrice > 0 && (
                <TableRow>
                  <TableCell className="font-medium">Sale Price</TableCell>
                  <TableCell>${store.salePrice}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell className="font-medium">Description</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {store.description}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* Media */}
        <Section title="Product Images" step={3} icon={ImageIcon}>
          <div className="grid grid-cols-4 gap-4">
            {store.images?.map((image, index) => (
              <div key={image.id} className="relative aspect-square">
                <Image
                  src={image.url}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Inventory & Shipping */}
        <Section title="Inventory & Shipping" step={4} icon={PackageSearch}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">SKU</TableCell>
                <TableCell>{store.sku}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Stock Quantity</TableCell>
                <TableCell>{store.stockQuantity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Low Stock Alert</TableCell>
                <TableCell>{store.lowStockAlert}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Weight</TableCell>
                <TableCell>{store.weight}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Dimensions</TableCell>
                <TableCell>
                  {store.dimensions.length} × {store.dimensions.width} ×{" "}
                  {store.dimensions.height}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* Variations */}
        {store.hasVariations && (
          <Section title="Product Variations" step={5} icon={Tags}>
            <div className="space-y-4">
              {/* Attributes */}
              <div className="space-y-2">
                <Text className="font-medium">Attributes</Text>
                <div className="flex flex-wrap gap-2">
                  {store.attributes.map((attr) => (
                    <Badge key={attr.id} variant="outline">
                      {attr.name}:{" "}
                      {attr.values.map((v: any) => v.value).join(", ")}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Variations Table */}
              {store.variations && store.variations.length > 0 && (
                <Table>
                  <TableBody>
                    {store.variations.map((variation) => (
                      <TableRow key={variation.id}>
                        <TableCell>
                          {variation.attributes
                            .map((attr: any) => attr.value)
                            .join(" / ")}
                        </TableCell>
                        <TableCell>SKU: {variation.sku}</TableCell>
                        <TableCell>${variation.price}</TableCell>
                        <TableCell>Stock: {variation.stockQuantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </Section>
        )}
      </div>

      <CreateListingFooter
        onBack={() => setStep(store.hasVariations ? 6 : 5)}
        nextButtonLabel="Publish Product"
        onNext={handlePublish}
      />
    </div>
  )
}
