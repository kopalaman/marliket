interface SellLayoutProps {
  children: React.ReactNode
}

export default function InfoLayout({ children }: SellLayoutProps) {
  return (
    <>
      <main className="flex-grow">{children}</main>
    </>
  )
}
