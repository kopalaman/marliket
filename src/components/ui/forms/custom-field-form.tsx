"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CustomFieldProps, FormFieldType } from "@/types/form"
import { Eye, EyeOff } from "lucide-react"
import { forwardRef, useState } from "react"
import type { Country } from "react-phone-number-input"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { AutosizeTextarea } from "../autosize-textarea"
import { DateTimePicker } from "../datetime-picker"
import MultipleSelector from "../multi-select"

// Password Input Component
interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showToggle?: boolean
  className?: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showToggle = true, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className={`relative ${className}`}>
        <Input {...props} ref={ref} type={showPassword ? "text" : "password"} />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

// Custom Phone Input Component
interface CustomPhoneInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  defaultCountry?: Country
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  value,
  onChange,
  disabled,
  placeholder,
}) => {
  return (
    <div className="phone-input-container">
      <style jsx global>{`
        .phone-input-container .PhoneInput {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .phone-input-container .PhoneInputCountry {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .phone-input-container .PhoneInputInput {
          flex: 1;
          height: 2.3rem;
          border-radius: 0.7rem;
          border: 1px solid hsl(var(--input));
          background-color: transparent;
          padding: 0.5rem;
          font-size: 0.875rem;
          transition: border-color 0.2s ease;
        }

        .phone-input-container .PhoneInputInput:focus {
          outline: none;
          border-color: hsl(var(--ring));
          ring: 1px hsl(var(--ring));
        }

        .phone-input-container .PhoneInputInput:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry={"ZM"}
        value={value}
        onChange={(value) => onChange(value ?? "")}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  )
}

// Select Input Component
interface SelectInputProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          // Each SelectItem needs a unique key
          <SelectItem key={`select-item-${option.value}`} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
// Custom Checkbox Component
interface CustomCheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  label: string
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onCheckedChange,
  disabled,
  label,
}) => {
  return (
    <div className="mt-2 flex items-center space-x-2">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      <label className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
    </div>
  )
}

const CustomFormField: React.FC<CustomFieldProps> = ({
  fieldType,
  control,
  name,

  label,
  placeholder,
  disabled,
  props,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={fieldType === FormFieldType.CHECKBOX ? "space-y-3" : ""}
        >
          {fieldType === FormFieldType.CHECKBOX ? (
            <FormControl>
              <CustomCheckbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
                label={label}
              />
            </FormControl>
          ) : (
            <>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                {(() => {
                  switch (fieldType) {
                    case FormFieldType.INPUT:
                      if (props?.type === "password") {
                        return (
                          <PasswordInput
                            {...field}
                            placeholder={placeholder}
                            disabled={disabled}
                            showToggle={props?.showPasswordToggle}
                            {...props}
                          />
                        )
                      }
                      return (
                        <Input
                          {...field}
                          placeholder={placeholder}
                          disabled={disabled}
                          {...props}
                        />
                      )
                    case FormFieldType.PHONEINPUT:
                      return (
                        <CustomPhoneInput
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={placeholder}
                          disabled={disabled}
                          defaultCountry={props?.defaultCountry as Country}
                        />
                      )
                    case FormFieldType.SELECT:
                      return (
                        <SelectInput
                          options={props?.options || []}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={placeholder}
                          disabled={disabled}
                        />
                      )
                    case FormFieldType.TEXTAREA:
                      return (
                        <AutosizeTextarea
                          {...field}
                          placeholder={placeholder}
                          disabled={disabled}
                          maxHeight={props?.maxHeight}
                          maxLength={props?.maxLength}
                          showCount={props?.showCount}
                          minHeight={props?.minHeight}
                        />
                      )

                    case FormFieldType.DATETIME:
                      return (
                        <DateTimePicker
                          {...field}
                          hourCycle={props?.hourCycle}
                          yearRange={props?.yearRange}
                          granularity={props?.granularity}
                          disabled={disabled}
                          placeholder={placeholder}
                        />
                      )

                    case FormFieldType.MULTISELECT:
                      return (
                        <MultipleSelector
                          value={field.value}
                          onChange={field.onChange}
                          options={props?.options}
                          placeholder={placeholder}
                          disabled={disabled}
                          maxSelected={props?.maxSelected}
                          creatable={props?.creatable}
                        />
                      )

                    default:
                      return null
                  }
                })()}
              </FormControl>
            </>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
