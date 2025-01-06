import { Category, Subcategory } from "@/types/item"
import { Card } from "../ui/card"
import Text from "../ui/text"

// components/item-name-guidelines.tsx
interface ItemNameGuidelinesProps {
  category?: Category
  subcategory?: Subcategory
}

export function ItemNameGuidelines({
  category,
  subcategory,
}: ItemNameGuidelinesProps) {
  return (
    <Card className="bg-muted/50 p-4">
      <div className="space-y-4">
        {/* General Guidelines */}
        <div>
          <Text className="font-medium">General Guidelines</Text>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>• Keep it clear and descriptive</li>
            <li>• Avoid unnecessary punctuation (!!! ???)</li>
            <li>• Don&apos;t use ALL CAPS</li>
            <li>• Stick to relevant information</li>
          </ul>
        </div>

        {/* Category Specific Guidelines */}
        {category && (
          <div>
            <Text className="font-medium">{category.label} Guidelines</Text>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {category.nameGuidelines?.map((guideline, index) => (
                <li key={index}>• {guideline}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Template and Examples */}
        {subcategory && (
          <>
            <div>
              <Text className="font-medium">Suggested Format</Text>
              <code className="mt-1 block rounded bg-muted p-2 text-sm">
                {subcategory.nameTemplate}
              </code>
            </div>

            <div>
              <Text className="font-medium">Examples</Text>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {subcategory.examples?.map((example, index) => (
                  <li key={index}>✓ {example}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* What to Avoid */}
        <div>
          <Text className="font-medium text-destructive">What to Avoid</Text>
          <ul className="mt-2 space-y-1 text-sm text-destructive">
            <li>✗ &quot;Best [Product] Ever!!!&quot;</li>
            <li>✗ &quot;AMAZING DEAL - MUST SEE&quot;</li>
            <li>✗ &quot;cheap good quality [product]&quot;</li>
            <li>✗ &quot;*****Great Price*****&quot;</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
