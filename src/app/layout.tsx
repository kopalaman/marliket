import type { Metadata } from "next"
import { Nunito_Sans as FontSans } from "next/font/google"
import "./globals.css"
import AppProviders from "./providers"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Marliket Auto",
  description: "An AI powered automotive marketplace",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
