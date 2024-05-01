import React from 'react'
import Link from 'next/link'

import { siteConfig } from '@/config/site'
import LoadingSpinner from '@/components/ui/loader-spinner'

import Logo from '../header/_components/logo'
import CopyRight from './copyright'
import Widgets from './widgets'

export default function Footer() {
  return (
    <footer className="relative px-5 md:px-10 lg:px-[55px] mt-9 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2 xl:px-16 flex w-full flex-col">
      <Widgets widgets={siteConfig.footer.widgets} />
      <CopyRight />
    </footer>
  )
}
