import clsx from "clsx"
import Text from "./text"

type SectionProps = {
  className?: string
  id?: string
  children: React.ReactNode
  tag?: "section" | "div"
  headerClassName?: string
  title?: string
  titleClassName?: string
  description?: string
  descriptionClassName?: string
  rightElement?: React.ReactNode
}
export default function Section({
  children,
  className,
  id,
  tag = "section",
  title,
  titleClassName = "text-xl capitalize !leading-4 md:!text-2xl lg:!leading-[34px] 4xl:!leading-[40px] 4xl:!text-3xl",
  descriptionClassName = "font-normal text-sm lg:text-base leading-4 4xl:text-lg text-muted-foreground",
  description,
  headerClassName,
  rightElement,
}: SectionProps) {
  // eslint-disable-next-line prefer-const
  let Component = tag
  return (
    <Component className={className} id={id}>
      {title && (
        <header className={clsx("flex justify-between", headerClassName)}>
          <div>
            <Text tag="h2" className={titleClassName}>
              {title}
            </Text>
            {description && (
              <Text className={descriptionClassName}>{description}</Text>
            )}
          </div>
          {rightElement && <div>{rightElement}</div>}
        </header>
      )}
      {children}
    </Component>
  )
}
