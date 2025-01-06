import Logo from "@/components/ui/logo"
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react"
import Link from "next/link"

const Footer = () => {
  const footerSections = {
    trust: {
      title: "Trust & Safety",
      items: [
        { label: "Buyer Verification", href: "/trust/verification" },
        { label: "Secure Payments", href: "/trust/payments" },
        { label: "Fraud Protection", href: "/trust/protection" },
        { label: "Seller Insurance", href: "/trust/insurance" },
        { label: "Safe Trading Tips", href: "/trust/tips" },
      ],
    },
    resources: {
      title: "Resources",
      items: [
        { label: "Seller Guide", href: "/resources/guide" },
        { label: "Market Reports", href: "/resources/reports" },
        { label: "Documentation", href: "/resources/docs" },
        { label: "Pricing Calculator", href: "/resources/calculator" },
        { label: "Success Stories", href: "/resources/stories" },
      ],
    },
    support: {
      title: "Support",
      items: [
        { label: "Help Center", href: "/support" },
        { label: "FAQs", href: "/support/faq" },
        { label: "Contact Us", href: "/support/contact" },
        { label: "Report Issue", href: "/support/report" },
        { label: "Feedback", href: "/support/feedback" },
      ],
    },
    legal: {
      title: "Legal",
      items: [
        { label: "Terms of Service", href: "/legal/terms" },
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Cookie Policy", href: "/legal/cookies" },
        { label: "Seller Agreement", href: "/legal/seller-terms" },
      ],
    },
  }

  const contactInfo = {
    support: {
      phone: "+260 123 456 789",
      email: "support@marliket.com",
      hours: "24/7 Support Available",
    },
    social: [
      { icon: Facebook, href: "#", label: "Facebook" },
      { icon: Twitter, href: "#", label: "Twitter" },
      { icon: Instagram, href: "#", label: "Instagram" },
      { icon: Youtube, href: "#", label: "Youtube" },
    ],
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-950">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-8 sm:pt-14 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company Info */}
          <div className="space-y-8">
            <div>
              <Logo className="-ml-3 h-9" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                The trusted platform for buying and selling vehicles
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Phone className="h-5 w-5" />
                <span>{contactInfo.support.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Mail className="h-5 w-5" />
                <span>{contactInfo.support.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Clock className="h-5 w-5" />
                <span>{contactInfo.support.hours}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              {contactInfo.social.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {footerSections.trust.title}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerSections.trust.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {footerSections.resources.title}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerSections.resources.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {footerSections.support.title}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerSections.support.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {footerSections.legal.title}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerSections.legal.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Marliket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
