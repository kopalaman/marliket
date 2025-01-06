"use client"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"
import { addScrollingClass } from "@/components/utils/add-scrolling-class"
import { Routes } from "@/config/routes"
import { useIsMounted } from "@/hooks/use-is-mounted"
import { BellIcon, MenuIcon, SearchIcon, ShoppingCartIcon } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import AuthUser from "./auth-user"
import GroupsDropdownMenu from "./menu/groups-menu"
import Navbar from "./navbar"

export default function MarketHeader() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mounted = useIsMounted()
  const headerRef = useRef(null)

  addScrollingClass(headerRef)

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
            <div className="hidden xl:block">
              <GroupsDropdownMenu />
            </div>
          </div>

          {/* Center Section: Search (becomes full width on mobile) */}
          <div className="hidden max-w-[350px] flex-1 md:block lg:max-w-[500px]">
            <Button
              onClick={() => console.log("search")}
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <SearchIcon className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline">Search...</span>
            </Button>
          </div>

          {/* Right Section: Nav and Auth */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Mobile Search Icon */}
            <Button variant="outline" size="icon" className="xl:hidden">
              <BellIcon className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="xl:hidden">
              <ShoppingCartIcon className="h-5 w-5" />
            </Button>
            <div className="xl:hidden">
              <ThemeToggle />
            </div>

            {/* Desktop Nav and Auth */}
            <div className="hidden items-center gap-2 xl:flex">
              <Navbar />
              <AuthUser />
            </div>

            {/* Mobile Menu Button */}
            <Button variant="outline" size="icon" className="xl:hidden">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar (shown below header) */}
        <div className="mt-3 md:hidden">
          <Button
            onClick={() => console.log("search")}
            variant="outline"
            className="w-full justify-start"
          >
            <SearchIcon className="mr-2 size-5" />
            Search...
          </Button>
        </div>
      </div>
    </header>
  )
}
