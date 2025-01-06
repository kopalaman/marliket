// components/condition-selector.tsx
import { ITEM_CONDITIONS } from "@/data/condition"
import { cn } from "@/lib/utils"
import { Control, Controller, FieldValues } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import Text from "../ui/text"

// Make the component generic
interface ConditionSelectorProps<T extends FieldValues> {
  control: Control<T>
  name?: string // Optional: allow custom field name
}

export function ConditionSelector<T extends FieldValues>({
  control,
  name = "condition", // Default to "condition" if not provided
}: ConditionSelectorProps<T>) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Text className="text-lg font-medium">Item Condition</Text>
          <Text className="text-sm text-muted-foreground">
            Select the condition that best describes your item
          </Text>
        </div>

        <Controller
          name={name as any}
          control={control}
          render={({ field }) => (
            <div className="space-y-6">
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid gap-4 md:grid-cols-2"
              >
                {ITEM_CONDITIONS.map((condition) => (
                  <div key={condition.value} className="relative">
                    <RadioGroupItem
                      value={condition.value}
                      id={condition.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={condition.value}
                      className={cn(
                        "flex cursor-pointer flex-col gap-2 rounded-lg border p-4",
                        "hover:bg-muted/50 hover:shadow-sm",
                        "peer-data-[state=checked]:border-primary",
                        "peer-data-[state=checked]:bg-primary/5",
                        "[&:has([data-state=checked])]:border-primary"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <condition.icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{condition.label}</span>
                      </div>
                      <Text className="text-sm text-muted-foreground">
                        {condition.shortDescription}
                      </Text>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {field.value && (
                <Card className="bg-muted/50">
                  {(() => {
                    const selectedCondition = ITEM_CONDITIONS.find(
                      (c) => c.value === field.value
                    )

                    if (!selectedCondition) return null

                    const Icon = selectedCondition.icon

                    return (
                      <>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Icon className="h-5 w-5" />
                            {selectedCondition.label} Condition Guidelines
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Text className="font-medium">Description</Text>
                            <Text className="text-sm text-muted-foreground">
                              {selectedCondition.fullDescription}
                            </Text>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Text className="font-medium">Examples</Text>
                              <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
                                {selectedCondition.examples.map(
                                  (example, i) => (
                                    <li key={i}>{example}</li>
                                  )
                                )}
                              </ul>
                            </div>

                            <div>
                              <Text className="font-medium">Guidelines</Text>
                              <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
                                {selectedCondition.guidelines.map(
                                  (guideline, i) => (
                                    <li key={i}>{guideline}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </>
                    )
                  })()}
                </Card>
              )}
            </div>
          )}
        />
      </div>
    </Card>
  )
}
