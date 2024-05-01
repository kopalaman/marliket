import WidgetLink from './widget-link'

interface WidgetsProps {
  widgets: {
    id: number
    widgetTitle?: string
    lists: any
    isCompanyIntro?: boolean
    logo?: any
  }[]
}

export default function Widgets({ widgets }: WidgetsProps) {
  return (
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 xl:gap-4 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24 lg:mb-0.5 2xl:mb-0 3xl:-mb-1">
        {widgets?.map((widget) => (
          <WidgetLink
            key={`widget-${widget.id}`}
            data={widget}
            className="pb-3 md:pb-0"
          />
        ))}
      </div>
    </div>
  )
}
