// types/seller-registration.ts
export type SellerType = "individual" | "business"

export interface BaseSellerInfo {
  whatsappPhone?: string
  idNumber: string
  taxpinNumber: string
  associationMembershipName?: string
  identityToken?: string
  address: {
    street: string
    city: string
    province: string
    postalCode: string
    country: string
    latitude: string
    longitude: string
    isPrimary: boolean
  }
}

export interface BusinessSellerInfo extends BaseSellerInfo {
  businessName: string
  businessRegistrationNumber: string
  businessTaxpinNumber: string
  dealerLicense?: string
  description: string
  vatNumber?: string
  tradingLicense?: string
  whatsappPhone?: string
}

export interface SellerRegistrationState {
  plan: {
    type: "starter" | "professional" | "enterprise"
    price: number
    billingCycle: "monthly" | "annual"
  }
  category:
    | "vehicles"
    | "auto-parts"
    | "mechanical-services"
    | "car-rental"
    | "services"
  sellerType: SellerType | null
  // Will contain either individual or business info
  sellerInfo: BaseSellerInfo | BusinessSellerInfo
}
