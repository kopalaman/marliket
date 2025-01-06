/* eslint-disable @typescript-eslint/no-explicit-any */

export type ServiceTypes = {
  thumbnail: string
  slug: string
  name: string
  description: string
  [key: string]: any
}

export type ListingItemTypes = {
  slides: string[]
  time: string
  caption: string
  title: string
  slug: string
  location: string
  price: string
  rating?: number
  ratingCount?: string
  userAvatar?: string
  [key: string]: any
}

export interface Type {
  id: string
  name: string
  slug?: any
  // banners: Banner[];
  icon?: string
  // promotional_sliders: Attachment[];
  settings: {
    isHome: boolean
    layoutType: string
    productCard?: string
    bestSelling: {
      enable?: boolean
      title?: string
    }
    popularProducts: {
      enable?: boolean
      title?: string
    }
    category: {
      enable?: boolean
      title?: string
    }
    handpickedProducts: {
      enable?: boolean
      title?: string
      // products?: Product[];
      enableSlider?: boolean
    }
    newArrival: {
      enable?: boolean
      title?: string
    }
    authors: {
      enable?: boolean
      title?: string
    }
    manufactures: {
      enable?: boolean
      title?: string
    }
  }
}

export type ProductSpecificationTypes = {
  name: string
  details: string
}[]

export type VendorTypes = {
  name: string
  img: string
  memberSince: string
  languages: string[]
  responseRate: number
  responseTime: string
  location: string
  shopName?: string
  totalReview: number
}

// types.ts or add-listing.ts
interface ItemImage {
  id: string
  url: string
}

export interface StoreState {
  itemName: string
  itemType: string
  brand: string
  price: number
  salePrice: number
  description: string
  sku: string
  stockQuantity: number
  lowStockAlert: number
  categories: string[]
  tags: string[]
  attributes: any[] // You might want to type this properly
  images: ItemImage[] // Changed from never[] to ProductImage[]
  dimensions: {
    length: string
    width: string
    height: string
  }
  weight: string
  shippingClass: string
  hasVariations: boolean
  variations: any[] // You might want to type this properly
  metaTitle: string
  metaDescription: string
  status: "draft" | "published" | "private"
  featuredProduct: boolean

  vendorId: string
}

export interface PersonalProfileState {
  storeName: string
  associationName: string
  identificationToken: string
  bio: string
  gender: string
  tpin: string
  nrc: string
  whatsappNumber: string
  address: {
    street: string
    city: string
    province: string
    postalCode: string
    country: string
    latitude: string | undefined
    longitude: string | undefined
    isPrimary: boolean
  }
}
