"use client"

import { cn } from "@/lib/utils"
import { useDropzone, type DropzoneOptions } from "react-dropzone"

interface UploadDropzoneProps extends Omit<DropzoneOptions, "children"> {
  children?: React.ReactNode
  className?: string
}

export function UploadDropzone({
  children,
  className,
  ...props
}: UploadDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...props,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative cursor-pointer rounded-lg border border-dashed border-muted-foreground/25",
        "transition-colors hover:bg-muted/50",
        isDragActive && "border-muted-foreground/50 bg-muted/50",
        className
      )}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  )
}
