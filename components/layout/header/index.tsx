import { BellIcon, SearchIcon } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'

import CategoryMenu from './_components/category-menu'
import Logo from './_components/logo'
import Navbar from './_components/nav-bar'
import SearchBox from './_components/search-box'

export default function SiteHeader() {
  return (
    <header
      id="siteHeader"
      className="bg-background/30 static z-20 w-full border-b backdrop-blur-sm "
    >
      <div className="container z-40 flex h-16 items-center space-x-4 text-current text-sm sm:justify-between sm:space-x-6">
        <Navbar items={siteConfig.navBarMenu} />
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <div className="flex items-center space-x-1">
            <Button
              variant="secondary"
              className="hidden text-muted-foreground hover:text-primary text-xs items-center gap-4 sm:flex "
              // onClick={() => setDisplayMobileHeaderSearch((prev) => !prev)}
            >
              <span className="mr-14">Search your products from here...</span>
              <SearchIcon size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <BellIcon size={20} />
            </Button>
            <ThemeToggle />
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Button size="sm">Become a Seller</Button>
            <Button variant="outline" size="sm">
              Sign In or Register
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
