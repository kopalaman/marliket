import MarketHeader from "@/components/shared/header/market-header"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function ItemLayout({ children }: RootLayoutProps) {
  return (
    <>
      <MarketHeader />
      <main className="flex-grow">{children}</main>
      {/* <StoreFooter /> */}
    </>
  )
}
