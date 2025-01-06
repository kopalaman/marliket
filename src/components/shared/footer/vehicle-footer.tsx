"use client"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share"

const footerNav = [
  {
    title: "Help Centre",
    content: [
      "Monday to Friday 9:00 - 18:00",
      "Saturday 9:00 - 17:30",
      "Sundays and Bank Holidays CLOSED",
    ],
  },
  {
    title: "Car news and advice",
    links: [
      { name: "Car reviews", href: "/reviews" },
      { name: "Compare cars", href: "/compare" },
      { name: "Find a car", href: "/search" },
      { name: "New car deals", href: "/deals" },
      { name: "Nearly new cars", href: "/nearly-new" },
      { name: "Used cars", href: "/used" },
      { name: "Car leasing", href: "/leasing" },
      { name: "Sell my car", href: "/sell" },
      { name: "Car finance", href: "/finance" },
      { name: "Car insurance", href: "/insurance" },
      { name: "Car warranty", href: "/warranty" },
      { name: "Car valuation", href: "/valuation" },
    ],
  },
  {
    title: "About us",
    links: [
      { name: "Contact us", href: "/contact" },
      { name: "Leadership team", href: "/team" },
      { name: "Authors and experts", href: "/experts" },
      { name: "How we test cars", href: "/testing" },
      { name: "Carwow newsroom", href: "/news" },
      { name: "Careers", href: "/careers" },
      { name: "Dealer & brand partners", href: "/partners" },
      { name: "Refer a friend", href: "/refer" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Car guides", href: "/guides" },
      { name: "Car reviews", href: "/reviews" },
      { name: "Car comparison tool", href: "/compare" },
      { name: "Car running costs", href: "/costs" },
      { name: "Electric cars", href: "/electric" },
      { name: "Hybrid cars", href: "/hybrid" },
      { name: "Car tax calculator", href: "/tax" },
    ],
  },
]

function FooterSection({
  title,
  links,
  content,
  className,
}: {
  title: string
  links?: { name: string; href: string }[]
  content?: string[]
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  const LinksContent = () => (
    <ul className="space-y-1.5">
      {links?.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            className="text-sm text-gray-300 hover:text-white hover:underline"
          >
            {link.name}
          </a>
        </li>
      ))}
      {content?.map((text, index) => (
        <li key={index} className="text-sm text-gray-300">
          {text}
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {/* Mobile Collapsible Version */}
      <div className={cn("lg:hidden", className)}>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="border-b border-gray-700 py-3"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-between p-0 hover:bg-transparent"
            >
              <span className="text-base font-semibold text-white">
                {title}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-gray-400 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <LinksContent />
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop Version */}
      <div className={cn("hidden w-52 lg:block", className)}>
        <h3 className="mb-3 text-base font-semibold text-white">{title}</h3>
        <LinksContent />
      </div>
    </>
  )
}

function SocialLinks() {
  const shareUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://example.com"

  return (
    <div className="flex items-center justify-center gap-4">
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon round size={32} />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl}>
        <XIcon round size={32} />
      </TwitterShareButton>
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon round size={32} />
      </LinkedinShareButton>
    </div>
  )
}

// Placeholder for payment methods
function PaymentMethods() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Add your payment method icons here */}
      <div className="h-8 w-12 rounded bg-gray-800"></div>
      <div className="h-8 w-12 rounded bg-gray-800"></div>
      <div className="h-8 w-12 rounded bg-gray-800"></div>
      <div className="h-8 w-12 rounded bg-gray-800"></div>
      <div className="h-8 w-12 rounded bg-gray-800"></div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-6">
          {footerNav.map((section) => (
            <FooterSection key={section.title} {...section} />
          ))}
        </div>

        <div className="mt-8 space-y-6 border-gray-800 border-transparent pt-6 md:border-t">
          {/* Social Links */}
          <SocialLinks />

          {/* Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-center text-sm font-medium text-white">
              Payment Methods
            </h4>
            <PaymentMethods />
          </div>

          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-4 text-center text-xs">
            <a href="/terms" className="hover:underline">
              Terms & conditions
            </a>
            <span className="text-gray-600">|</span>
            <a href="/privacy" className="hover:underline">
              Privacy policy
            </a>
            <span className="text-gray-600">|</span>
            <a href="/cookies" className="hover:underline">
              Manage cookies & privacy
            </a>
            <span className="text-gray-600">|</span>
            <a href="/fraud" className="hover:underline">
              Fraud disclaimer
            </a>
            <span className="text-gray-600">|</span>
            <a href="/esg" className="hover:underline">
              ESG Policy
            </a>
            <span className="text-gray-600">|</span>
            <a href="/modern-slavery" className="hover:underline">
              Modern slavery statement
            </a>
            <span className="text-gray-600">|</span>
            <a href="/sitemap" className="hover:underline">
              Sitemap
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs">
            © {new Date().getFullYear()} Marliket Ltd. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
