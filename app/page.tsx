import Link from 'next/link'

import { GridBackground } from '@/components/ui/aceternity/grid-background'
import DealsProducts from '@/components/sliders/deals-products'

export default function IndexPage() {
  return (
    <main>
      <GridBackground />
      <div className="container mt-2">
        <DealsProducts />
      </div>
    </main>
  )
}
