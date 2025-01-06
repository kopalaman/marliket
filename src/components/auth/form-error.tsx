import { FC } from "react"
import { TriangleAlert } from "lucide-react"

interface FormErrorProps {
  message?: string | null
}
const FormError: FC<FormErrorProps> = ({ message }) => {
  if (!message) return null
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive shadow">
      <TriangleAlert className="size-5" />
      <span>{message}</span>
    </div>
  )
}

export default FormError
