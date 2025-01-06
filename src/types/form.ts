/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control } from "react-hook-form"

// types/form.ts

export type FormState = {
  error: string | null
}

export enum FormFieldType {
  INPUT = "input",
  PHONEINPUT = "phoneInput",
  SELECT = "select",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  DATETIME = "datetime",
  MULTISELECT = "multiselect",
  FILE = "file", // New
}

export interface CustomFieldProps {
  fieldType: FormFieldType
  control: Control<any>
  name: string
  label: string
  placeholder?: string
  disabled?: boolean
  className?: string
  props?: Record<string, any> & {
    showPasswordToggle?: boolean // Add this to the type
    type?: string
    options?: { value: string; label: string }[]
    // New props for the new field types
    maxHeight?: number
    minHeight?: number
    hourCycle?: 12 | 24
    yearRange?: number
    granularity?: "day" | "hour" | "minute" | "second"
    maxSelected?: number
    creatable?: boolean
    accept?: string // For file input
    multiple?: boolean // For file input
  }
}
