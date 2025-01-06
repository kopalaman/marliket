"use client"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import * as React from "react"
import { useImperativeHandle } from "react"

interface UseAutosizeTextAreaProps {
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>
  minHeight?: number
  maxHeight?: number
  value: string
}

export const useAutosizeTextArea = ({
  textAreaRef,
  value,
  maxHeight = Number.MAX_SAFE_INTEGER,
  minHeight = 0,
}: UseAutosizeTextAreaProps) => {
  React.useEffect(() => {
    const textArea = textAreaRef.current
    if (textArea) {
      // Reset height to allow proper calculation
      textArea.style.height = `${minHeight}px`

      // Get the computed styles
      const style = window.getComputedStyle(textArea)
      const borderHeight =
        parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)

      // Calculate new height
      const scrollHeight = textArea.scrollHeight
      const newHeight = Math.min(
        Math.max(scrollHeight + borderHeight, minHeight),
        maxHeight
      )

      textArea.style.height = `${newHeight}px`
    }
  }, [textAreaRef, value, maxHeight, minHeight])
}

export type AutosizeTextAreaRef = {
  textArea: HTMLTextAreaElement
  maxHeight: number
  minHeight: number
  focus: () => void
}

interface AutosizeTextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value"> {
  maxHeight?: number
  minHeight?: number
  label?: string
  description?: string
  error?: string
  showCount?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const AutosizeTextarea = React.forwardRef<
  AutosizeTextAreaRef,
  AutosizeTextAreaProps
>(
  (
    {
      maxHeight = Number.MAX_SAFE_INTEGER,
      minHeight = 52,
      className,
      label,
      description,
      error,
      showCount,
      value = "",
      onChange,
      maxLength,
      disabled,
      ...props
    }: AutosizeTextAreaProps,
    ref: React.Ref<AutosizeTextAreaRef>
  ) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null)

    useAutosizeTextArea({
      textAreaRef,
      value: value || "",
      maxHeight,
      minHeight,
    })

    useImperativeHandle(ref, () => ({
      textArea: textAreaRef.current as HTMLTextAreaElement,
      focus: () => textAreaRef?.current?.focus(),
      maxHeight,
      minHeight,
    }))

    return (
      <div className="space-y-2">
        {label && <Label className="text-base font-medium">{label}</Label>}
        <textarea
          {...props}
          ref={textAreaRef}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "resize-none",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          {error && <span className="text-destructive">{error}</span>}
          {showCount && (
            <span
              className={cn(
                "ml-auto",
                maxLength && value.length >= maxLength && "text-destructive"
              )}
            >
              {value.length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  }
)

AutosizeTextarea.displayName = "AutosizeTextarea"
