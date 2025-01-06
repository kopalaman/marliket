import { RefreshCw } from "lucide-react"

const LoaderSpin = ({ className }: { className?: string }) => {
  return (
    <>
      <RefreshCw
        className={`size-7 animate-spin text-muted-foreground ${className}`}
      />
    </>
  )
}

export default LoaderSpin
