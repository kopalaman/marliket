import { motion } from "framer-motion"
import { CheckCircle, Circle } from "lucide-react"

export interface StepType {
  label: string
  description: string
  id?: string
  fields?: readonly string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conditional?: string | ((store: any) => boolean)
}

interface StepIndicatorProps {
  currentStep: number
  steps: StepType[] // Changed from typeof steps to StepType[]
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
}) => (
  <div className="flex justify-between">
    {steps.map((step, index) => (
      <div key={step.label} className="flex flex-col items-center">
        <motion.div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            index <= currentStep ? "bg-primary/15 text-primary" : "bg-secondary"
          }`}
          initial={false}
          animate={{ scale: index === currentStep ? 1.2 : 1 }}
        >
          {index < currentStep ? (
            <CheckCircle size={20} />
          ) : (
            <Circle size={20} />
          )}
        </motion.div>
        <div className="mt-2 text-center">
          <div className="text-sm font-medium">{step.label}</div>
          <div className="text-xs text-muted-foreground">
            {step.description}
          </div>
        </div>
      </div>
    ))}
  </div>
)

export const ProgressBar: React.FC<{
  currentStep: number
  totalSteps: number
}> = ({ currentStep, totalSteps }) => (
  <motion.div className="relative mt-4 h-2 w-full rounded-full bg-secondary">
    <motion.div
      className="absolute left-0 top-0 h-full rounded-full bg-primary"
      initial={{ width: "0%" }}
      animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
)
