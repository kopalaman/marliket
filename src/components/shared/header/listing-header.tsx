"use client"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"
import { addScrollingClass } from "@/components/utils/add-scrolling-class"
import { Routes } from "@/config/routes"
import { BellIcon, MenuIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export default function ListingHeader() {
  const router = useRouter()
  const headerRef = useRef(null)
  addScrollingClass(headerRef)

  // function handleSaveExit() {
  //   console.log("Save and Exit")
  //   router.push(Routes.vendor)
  // }

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
              <h1 className="animate-textGradient bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-xl font-bold text-transparent">
                List your items faster and easier
              </h1>
            </div>
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
              <Button>
                <Link href={Routes.becomeSeller}>Get Started Selling</Link>
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
