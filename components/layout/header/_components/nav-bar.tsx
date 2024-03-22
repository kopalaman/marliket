import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import Logo from './logo'
import { MarliketDropdown } from './maliket-dropdown'

interface NavbarProps {
  items?: {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
  }[]
}

export default function Navbar({ items }: NavbarProps) {
  return (
    <div className="hidden shrink-0 items-center lg:flex">
      <Logo />
      <div className="ml-4 mr-auto hidden  items-center  xl:flex"></div>
      {items?.length ? (
        <nav className="hidden shrink-0 items-center gap-2 lg:flex">
          {/* <MarliketDropdown /> */}
          {items?.map(
            (item, index) =>
              item.href && (
                <Button variant="link" key={index} className="p-2">
                  <Link
                    href={item.href}
                    className={cn(
                      'text-muted-foreground hover:text-primary focus:text-primary flex focus:outline-none items-center font-medium transition-colors duration-200',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                  >
                    {item.title}
                  </Link>
                </Button>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
