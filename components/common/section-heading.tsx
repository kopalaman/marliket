import { FC } from 'react'
import Link from 'next/link'

import Text from '../ui/text'

interface Props {
  sectionTitle: string
  categorySlug?: string
  className?: string
  textClassName?: string
}

const SectionHeading: FC<Props> = ({
  sectionTitle,
  categorySlug,
  className = 'pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7',
  textClassName = '',
}) => {
  return (
    <div className={`-mt-2 flex items-center justify-between ${className}`}>
      <Text className={textClassName} variant="mediumHeading">
        {sectionTitle}
      </Text>

      {categorySlug && (
        <div>
          <Link href={categorySlug} className="hover:underline">
            see all
          </Link>
        </div>
      )}
    </div>
  )
}

export default SectionHeading
