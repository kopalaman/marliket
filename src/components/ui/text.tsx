import clsx from "clsx"

const classes = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "mt-10 scroll-m-20 pb-1 text-3xl fontmedium tracking-tight transition-colors first:mt-0",
  h3: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "mt-6 scroll-m-20 font-bold text-xl",
  h5: "mt-6 scroll-m-20 font-semibold text-lg",
  h6: "mt-6 scroll-m-20 font-bold text-base",
  p: "leading-7 [&:not(:first-child)]:mt-1.5",
  i: "",
  b: "",
  q: "text-quote",
  em: "",
  strong: "",
  small: "",
  span: "",
  del: "",
  mark: "",
  abbr: "cursor-help",
  pre: "border-2 border py-3 px-4 rounded-xl bg-background",
  code: "border border py-2 px-3 rounded-md shadow",
  kbd: "bg-background border border rounded-lg leading-none inline-flex items-center justify-center text-sm py-1.5 px-2",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  sub: "",
  sup: "",
}

export interface TextProps {
  /**  */
  tag?: keyof typeof classes
  /** title attribute only appear when tag is `abbr` */
  title?: string
  /** Add custom classes for extra style */
  className?: string
}

export default function Text({
  tag = "p",
  title,
  children,
  className,
}: React.PropsWithChildren<TextProps>) {
  const Component = tag
  if (tag === "abbr" && title === undefined) {
    console.warn("title attribute is missing for abbr tag.")
  }
  return (
    <Component
      {...(title && { title })}
      className={clsx(classes[tag], className)}
    >
      {children}
    </Component>
  )
}

Text.displayName = "Text"
