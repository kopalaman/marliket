// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export default function UserLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <main className="flex-grow">{children}</main>
    </>
  )
}
