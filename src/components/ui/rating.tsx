"use client"

import clsx from "clsx"
import { StarIcon } from "lucide-react"
import RcRate from "rc-rate"
import type { RateProps as RcRateProps } from "rc-rate/lib/Rate"
import type { StarProps as RcStarProps } from "rc-rate/lib/Star"
import { forwardRef } from "react"

const labelClasses = {
  size: {
    sm: "text-xs mb-1",
    DEFAULT: "text-sm mb-1.5",
    lg: "text-sm mb-2",
    xl: "text-base mb-2",
  },
}

const rateClasses = {
  base: "flex items-center [&>li]:cursor-pointer [&.rc-rate-disabled>li]:cursor-default [&>li]:relative [&>li]:mr-0.5 rtl:[&>li]:ml-0.5 [&>li]:inline-block",
  size: {
    sm: "h-4 w-4",
    DEFAULT: "h-[16px] w-[16px]",
    lg: "h-5 w-5",
    xl: "h-[22px] w-[22px]",
  },
  firstStar:
    "[&>li>div>.rc-rate-star-first]:absolute [&>li>div>.rc-rate-star-first]:left-0 rtl:[&>li>div>.rc-rate-star-first]:right-0 [&>li>div>.rc-rate-star-first]:top-0 [&>li>div>.rc-rate-star-first]:w-1/2 [&>li>div>.rc-rate-star-first]:h-full [&>li>div>.rc-rate-star-first]:overflow-hidden",
  color:
    "[&>.rc-rate-star-half>div>.rc-rate-star-first]:text-gray-500 [&>.rc-rate-star-full>div]:text-gray-500",
  transition:
    "[&>li>div]:transition-all [&>li>div]:duration-300 [&>.rc-rate-star:hover]:scale-110",
}

export interface RateProps
  extends Omit<RcRateProps, "character" | "className"> {
  label?: string
  size?: keyof typeof rateClasses.size
  character?: React.ReactNode | Array<React.ReactNode>
  characterClassName?: string
  tooltips?: Array<string>
  helperText?: React.ReactNode
  error?: string
  labelClassName?: string
  rateClassName?: string
  errorClassName?: string
  helperClassName?: string
  className?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Rate = forwardRef<any, RateProps>(
  (
    {
      size = "DEFAULT",
      disabled = false,
      character = <StarIcon />,
      label,
      tooltips,
      error,
      helperText,
      labelClassName,
      characterClassName,
      errorClassName,
      helperClassName,
      rateClassName,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx("aegon-rate", className)}>
        {label && (
          <div
            className={clsx("block", labelClasses.size[size], labelClassName)}
          >
            {label}
          </div>
        )}
        <RcRate
          ref={ref}
          disabled={disabled}
          character={({ index }: RcStarProps) => (
            <div
              className={clsx(
                "[&>svg]:fill-current",
                rateClasses.size[size],
                characterClassName
              )}
            >
              {Array.isArray(character)
                ? character[index as number]
                : character}
            </div>
          )}
          className={clsx(
            rateClasses.base,
            rateClasses.firstStar,
            rateClasses.color,
            !disabled && rateClasses.transition,
            rateClassName
          )}
          {...props}
        />
        {error && <p className="text-red mt-1 text-xs">{error}</p>}
      </div>
    )
  }
)

Rate.displayName = "Rate"
export default Rate
