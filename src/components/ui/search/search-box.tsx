/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from "react"

import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"
import { Button } from "../button"
import { Input } from "../input"
import { Label } from "../label"

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  inputClassName?: string
  label: string
  variant?: "minimal" | "normal" | "with-shadow" | "flat"
  onSubmit: (e: any) => void
  onClearSearch: (e: any) => void
}

const classes = {
  normal:
    "bg-background pl-6 pr-14 rounded-tr-none rounded-br-none  border border-r-0  border-transparent focus:border-accent",
  minimal:
    "search-minimal bg-gray-100 pl-10 pr-4 md:pl-14  border border-transparent focus:border-accent focus:bg-background",
  flat: "bg-whitepl-10 rtl:pr-10pr-4 rtl:pl-4md:pl-14 rtl:md:pr-14 border-0",
  "with-shadow":
    "search-with-shadow bg-light pl-10  pr-12  md:pl-14  focus:bg-background border-0",
}

const SearchBox: React.FC<Props> = ({
  className,
  inputClassName,
  label,
  onSubmit,
  onClearSearch,
  variant = "normal",
  value,
  ...rest
}) => {
  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)}>
      <div
        className={cn("relative flex rounded md:rounded-lg", {
          "h-14 shadow-md": variant === "normal",
          "h-10 md:h-11": variant === "minimal",
          "h-auto !rounded-none": variant === "flat",
          "h-16 shadow-xl": variant === "with-shadow",
        })}
      >
        <Label htmlFor={label} className="sr-only">
          {label}
        </Label>

        <Input
          id={label}
          type="text"
          value={value}
          autoComplete="off"
          className={cn(
            "search item-center flex h-full w-full appearance-none overflow-hidden truncate text-sm transition duration-300 ease-in-out focus:outline-0 focus:ring-0",
            {
              "placeholder:text-muted": variant === "flat",
            },
            inputClassName,
            classes[variant]
          )}
          {...rest}
        />
        {value && (
          <Button
            type="button"
            onClick={onClearSearch}
            className={cn(
              "absolute flex h-full w-7 cursor-pointer items-center justify-center transition-colors duration-200 hover:text-accent focus:text-accent focus:outline-0 md:w-12",
              {
                "right-36": variant === "normal",
                "right-0": variant !== "normal",
              }
            )}
          >
            <span className="sr-only">close</span>
            <X className="h-3.5 w-3.5 md:h-3 md:w-3" />
          </Button>
        )}

        {variant === "normal" ? (
          <Button
            variant={"ghost"}
            className="flex h-full min-w-[143px] items-center justify-center rounded-lg rounded-bl-none rounded-tl-none px-8 font-semibold text-muted transition-colors duration-200"
          >
            <Search className="mr-2.5 h-4 w-4" />
            Search...
          </Button>
        ) : (
          <Button
            variant={"outline"}
            className="absolute left-0 flex h-full w-7 items-center justify-center transition-colors duration-200 md:w-12"
          >
            <span className="sr-only">Search</span>
            <Search className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  )
}

export default SearchBox
