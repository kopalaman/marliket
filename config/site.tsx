import {
  Facebook,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Next.js',
  description:
    'Beautifully designed components built with Radix UI and Tailwind CSS.',
  navBarMenu: [
    {
      title: 'Shops',
      href: '/',
    },
    {
      title: 'Daily Deals',
      href: '/',
    },
    {
      title: 'Help & Contact',
      href: '/',
    },
  ],
  footer: {
    widgets: [
      {
        id: 1,
        widgetTitle: 'Make Money with Us',
        lists: [
          {
            id: 1,
            title: 'Sell on Marliket',
            path: '/',
          },
          {
            id: 2,
            title: 'Advertise Your Products',
            path: '/',
          },
          {
            id: 3,
            title: 'Protect & Build Your Brand',
            path: '/',
          },
          {
            id: 4,
            title: 'Become an Affiliate',
            path: '/',
          },
          {
            id: 5,
            title: 'Become a Delivery Partner',
            path: '/',
          },
        ],
      },
      {
        id: 2,
        widgetTitle: 'Buyer Assistance',
        lists: [
          {
            id: 1,
            title: 'Register Business Account',
            path: '/',
          },
          {
            id: 2,
            title: 'Marliket Money Back Guarantee',
            path: '/',
          },
          {
            id: 3,
            title: 'Buying & Bidding Help',
            path: '/',
          },
          {
            id: 4,
            title: 'Shops Directory',
            path: '/',
          },
        ],
      },
      {
        id: 3,
        widgetTitle: 'Know About Us',
        lists: [
          {
            id: 1,
            title: 'Careers',
            path: '/careers',
          },
          {
            id: 2,
            title: 'About Marliket',
            path: '/company',
          },
          {
            id: 3,
            title: 'Marliket Newsletter',
            path: '/newsletter',
          },
          {
            id: 4,
            title: 'Investor relations',
            path: '/',
          },
          {
            id: 5,
            title: 'Policies',
            path: '/',
          },
        ],
      },
      {
        id: 4,
        widgetTitle: 'Let Us Help You',
        lists: [
          {
            id: 1,
            title: 'Account',
            path: '/',
          },
          {
            id: 2,
            title: 'Shipping Rates & Policies',
            path: '/terms',
          },
          {
            id: 3,
            title: 'Returns & Replacements',
            path: '/',
          },
          {
            id: 4,
            title: 'Seller Information Center',
            path: '/',
          },
          {
            id: 5,
            title: 'Contact Us',
            path: '/',
          },
        ],
      },
      {
        id: 5,
        widgetTitle: 'Connect with Us',
        lists: [
          {
            id: 1,
            title: 'Instagram',
            path: 'https://www.instagram.com/marliket',
            icon: <InstagramIcon size={18} />,
          },
          {
            id: 2,
            title: 'Twitter',
            path: 'https://twitter.com/marliket',
            icon: <TwitterIcon size={18} />,
          },
          {
            id: 3,
            title: 'Facebook',
            path: 'https://www.facebook.com/redqinc/',
            icon: <FacebookIcon size={18} />,
          },
          {
            id: 4,
            title: 'Youtube',
            path: 'https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw',
            icon: <YoutubeIcon size={18} />,
          },
        ],
      },
    ],
  },
}
