import {
  ComponentType,
  CSSProperties,
  FC,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
} from 'react'

import { cn } from '@/lib/utils'

type Variant =
  | 'mediumHeading'
  | 'heading'
  | 'body'
  | 'subHeading'
  | 'pageHeading'

interface Props {
  variant?: Variant
  className?: string
  style?: CSSProperties
  children: ReactNode | any
  html?: string
}

const Text: FC<Props> = ({
  variant = 'body',
  style,
  className,
  children,
  html,
}) => {
  const componentsMap: { [P in Variant]: ComponentType<any> | string } = {
    mediumHeading: 'h3',
    heading: 'h4',
    body: 'p',
    subHeading: 'h2',
    pageHeading: 'h1',
  }

  const Component: JSXElementConstructor<any> | ReactElement<any> | string =
    componentsMap![variant!]

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {}

  return (
    <Component
      className={cn(
        {
          'text-sm sm:leading-6 leading-7': variant === 'body',
          'text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold':
            variant === 'mediumHeading',
          'text-sm md:text-base xl:text-lg font-semibold':
            variant === 'heading',
          'text-2xl font-bold': variant === 'pageHeading',
          'text-lg md:text-2xl xl:text-3xl 2xl:text-4xl font-bold':
            variant === 'subHeading',
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  )
}

export default Text
