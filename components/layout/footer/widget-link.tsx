import Link from 'next/link'

import Logo from '../header/_components/logo'

interface Props {
  className?: string
  data: {
    widgetTitle?: string
    lists: {
      id: number
      path?: string
      title: string
      icon?: any
    }[]
    isCompanyIntro?: boolean
    logo?: any
    description?: string
  }
}

export default function WidgetLink({ data, className }: Props) {
  return (
    <div className={`${className} ${data?.isCompanyIntro && 'col-span-2'}`}>
      {!data?.isCompanyIntro ? (
        <>
          <h4 className="mb-5 text-sm font-semibold md:text-base xl:text-md 2xl:mb-6 3xl:mb-7">
            {data?.widgetTitle}
          </h4>
          <ul className="text-xs lg:text-sm flex flex-col space-y-2 lg:space-y-2.5">
            {data?.lists.map((list) => (
              <li key={`widget-link-${list.id}`} className="flex items-center">
                {list.icon && <span className="mr-2">{list.icon}</span>}
                <Link href={list.path ? list.path : '#!'}>{list.title}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="mr-4 flex flex-col space-y-7 lg:space-y-7.5">
            <Logo />
            <p className="text-xs lg:text-sm text-muted-foreground">
              {data.description}
            </p>
            <ul className="text-xs lg:text-sm flex flex-col space-y-2 lg:space-y-2.5">
              {data?.lists.map((list) => (
                <li key={`widget-link-${list.id}`}>
                  {list.icon && (
                    <span className="mr-2 relative top-0.5 lg:top-1">
                      {list.icon}
                    </span>
                  )}
                  <Link href={list.path ? list.path : '#!'}>{list.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
