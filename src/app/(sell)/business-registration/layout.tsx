import MinimalHeader from "@/components/shared/header/sell/minimal-header"

interface SellLayoutProps {
  children: React.ReactNode
}

export default function InfoLayout({ children }: SellLayoutProps) {
  return (
    <>
      <MinimalHeader />
      <main className="flex-grow">{children}</main>
    </>
  )
}
