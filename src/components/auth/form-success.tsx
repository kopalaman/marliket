import { FC } from "react"
import { CircleCheckBig } from "lucide-react"

interface FormSuccessProps {
  message?: string | null
}
const FormSuccess: FC<FormSuccessProps> = ({ message }) => {
  if (!message) return null
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/20 p-3 text-sm text-emerald-600 shadow">
      <CircleCheckBig className="size-5" />
      <span>{message}</span>
    </div>
  )
}

export default FormSuccess
