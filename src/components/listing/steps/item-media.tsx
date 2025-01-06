"use client"

import CreateListingFooter from "@/components/shared/footer/create-listing-footer"
import Text from "@/components/ui/text"
import { UploadDropzone } from "@/components/ui/upload-dropzone"
import { useAtom, useSetAtom } from "jotai"
import { ImageIcon, X } from "lucide-react"
import Image from "next/image"
import { stepAtom, StoreAtom } from "../add-listing"

import { Button } from "@/components/ui/button"

interface UploadedImage {
  id: string
  url: string
}

interface PreviewProps {
  file: File
  imageUrl: string
  onDelete: () => void
}

const ImagePreview = ({ file, imageUrl, onDelete }: PreviewProps) => {
  return (
    <div className="group relative aspect-square w-full overflow-hidden rounded-lg border bg-background">
      <Image
        src={imageUrl}
        alt={file.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="destructive"
          size="icon"
          className="h-8 w-8"
          onClick={onDelete}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default function ItemMedia() {
  const setStep = useSetAtom(stepAtom)
  const [store, setStore] = useAtom(StoreAtom)

  const handleImagesUpload = (files: File[]) => {
    const newImages = files.map((file) => ({
      id: `upload-${URL.createObjectURL(file)}`,
      url: URL.createObjectURL(file),
    }))

    setStore((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...newImages],
    }))
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form noValidate onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-6">
          <div>
            <Text tag="h2" className="text-2xl font-semibold tracking-tight">
              Add Product Images
            </Text>
            <Text className="text-muted-foreground">
              Add high-quality images of your product
            </Text>
          </div>

          <UploadDropzone
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".webp"],
            }}
            maxSize={1024 * 1024 * 4} // 4MB
            maxFiles={10}
            onDrop={handleImagesUpload}
          >
            <div className="flex flex-col items-center justify-center gap-4 p-12">
              <div className="rounded-full bg-muted p-4">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <Text className="font-medium">
                  Drag images here or click to upload
                </Text>
                <Text className="text-sm text-muted-foreground">
                  Upload up to 10 images (max 4MB each)
                </Text>
              </div>
            </div>
          </UploadDropzone>

          {store.images && store.images.length > 0 && (
            <div className="mt-8">
              <Text className="mb-4 font-medium">Uploaded Images</Text>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {store.images.map((image: UploadedImage) => (
                  <ImagePreview
                    key={image.id}
                    file={new File([], "image")} // Placeholder for type compatibility
                    imageUrl={image.url}
                    onDelete={() => {
                      setStore((prev) => ({
                        ...prev,
                        images: prev.images.filter(
                          (img) => img.id !== image.id
                        ),
                      }))
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <CreateListingFooter
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
          isNextDisabled={!store.images?.length}
        />
      </form>
    </div>
  )
}
