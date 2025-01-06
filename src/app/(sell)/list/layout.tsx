import ListingHeader from "@/components/shared/header/listing-header"

interface SellLayoutProps {
  children: React.ReactNode
}

export default function ListLayout({ children }: SellLayoutProps) {
  return (
    <>
      <ListingHeader />
      <main className="flex flex-grow flex-col">{children}</main>
    </>
  )
}
