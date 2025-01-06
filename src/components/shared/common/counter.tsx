import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MinusIcon, PlusIcon } from "lucide-react"
import { PropsWithChildren } from "react"

type CounterProps = {
  quantity: number
  onDecrement: (e: any) => void
  onIncrement: (e: any) => void
  disableIncrement?: boolean
  disableDecrement?: boolean
  variant?: "default" | "rounded"
  className?: string
}

export default function Counter({
  quantity,
  onDecrement,
  onIncrement,
  disableIncrement = false,
  disableDecrement = false,
  variant = "default",
}: PropsWithChildren<CounterProps>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const counterType = variant === "rounded" ? "rounded-full" : "rounded-lg"
  return (
    <div
      className={cn(
        "group flex h-11 w-fit flex-shrink-0 items-center overflow-hidden",
        {
          "rounded-lg": variant === "default",
          "rounded-full": variant === "rounded",
        }
      )}
    >
      <Button
        disabled={disableDecrement}
        onClick={onDecrement}
        size="lg"
        className={cn(
          "flex flex-shrink-0 items-center justify-center transition duration-300 ease-in-out focus:outline-none",
          {
            "rounded-l-lg rounded-r-none": variant === "default",
            "rounded-l-full rounded-r-none": variant === "rounded",
          }
        )}
      >
        <MinusIcon className="h-4 w-4" />
      </Button>

      <span className="flex h-full w-12 flex-shrink-0 cursor-default items-center justify-center whitespace-nowrap bg-background px-6 text-sm font-semibold shadow-sm transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:w-16 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
        {quantity}
      </span>

      <Button
        disabled={disableIncrement}
        onClick={onIncrement}
        size="lg"
        className={cn(
          "flex flex-shrink-0 items-center justify-center transition duration-300 ease-in-out focus:outline-none",
          {
            "rounded-l-none rounded-r-lg": variant === "default",
            "rounded-l-none rounded-r-full": variant === "rounded",
          }
        )}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
