import MarketHeader from "@/components/shared/header/market-header"

export default function SharedLayout({
  children,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <MarketHeader />
      <main className="flex-grow">{children}</main>
    </>
  )
}
