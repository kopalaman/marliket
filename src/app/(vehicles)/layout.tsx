import Footer from "@/components/shared/footer/vehicle-footer"
import MarketHeader from "@/components/shared/header/market-header"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function MarketLayout({ children }: RootLayoutProps) {
  return (
    <>
      <MarketHeader />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  )
}
