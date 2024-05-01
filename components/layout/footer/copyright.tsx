import Link from 'next/link'
import { MoveUpIcon } from 'lucide-react'

const year = new Date().getFullYear()
export default function CopyRight() {
  return (
    <div className="pt-5 pb-16 sm:pb-20 md:pb-5 mb-2 border-t">
      <div className="container flex flex-col items-center justify-between md:flex-row">
        <p className="text-xs text-muted-foreground">
          Copyright © {year} Marliket.com. All Rights Reserved.
        </p>
        <ul className="flex items-center mt-5 md:mt-0 text-xs text-muted-foreground font-medium space-x-1">
          <li className="hover:underline hover:text-primary ">
            <Link href="/terms">User agreement</Link>
          </li>
          <span>.</span>
          <li className="hover:underline hover:text-primary">
            <Link href="/terms">Privacy</Link>
          </li>
          <span>.</span>
          <li className="hover:underline hover:text-primary">
            <Link href="/terms">Payments terms of use</Link>
          </li>
          <span>.</span>
          <li className="hover:underline hover:text-primary">
            <Link href="/terms">Cookies</Link>
          </li>
        </ul>
        <p className="text-sm text-muted-foreground font-medium leading-[19px] cursor-pointer">
          <Link href="#siteHeader" className="hover:text-primary">
            Back to top
          </Link>
          <MoveUpIcon size={16} className="inline-block ml-1" />
        </p>
      </div>
    </div>
  )
}
