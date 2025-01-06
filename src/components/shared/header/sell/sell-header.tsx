"use client"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"
import { Routes } from "@/config/routes"
import { useIsMounted } from "@/hooks/use-is-mounted"
import { BellIcon, MenuIcon } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import SellNavbar from "./sell-navbar"

export default function SellHeader() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mounted = useIsMounted()
  const headerRef = useRef(null)

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-30 w-full bg-background/65 backdrop-blur-lg transition-all lg:bg-opacity-70"
    >
      <div className="container-fluid py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Section: Logo and Groups Menu */}

          <div className="flex items-center gap-4 lg:gap-8">
            <Link href={Routes.home}>
              <Logo className="h-8 md:h-9" />
            </Link>
          </div>

          {/* Right Section: Nav and Auth */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Mobile Search Icon */}
            <Button variant="outline" size="icon" className="xl:hidden">
              <BellIcon className="h-5 w-5" />
            </Button>
            <div className="xl:hidden">
              <ThemeToggle />
            </div>

            {/* Desktop Nav and Auth */}
            <div className="hidden items-center gap-2 xl:flex">
              <SellNavbar />
              <Button>
                <Link href={Routes.listItem}>List an item</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="outline" size="icon" className="xl:hidden">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar (shown below header)
        <div className="mt-3 md:hidden">
          <Button
            onClick={() => console.log("search")}
            variant="outline"
            className="w-full justify-start"
          >
            <SearchIcon className="mr-2 size-5" />
            Search...
          </Button>
        </div> */}
      </div>
    </header>
  )
}
