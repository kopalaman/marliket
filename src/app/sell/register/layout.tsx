import SellHeader from "@/components/shared/header/sell/sell-header"

interface SellLayoutProps {
  children: React.ReactNode
}

export default function SellRegistrationLayout({ children }: SellLayoutProps) {
  return (
    <>
      <SellHeader />
      <main className="flex-grow">{children}</main>
    </>
  )
}
