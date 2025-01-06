import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

//Registration steps tracking
export const StepAtom = atom(1)

export interface SellerCategoryType {
  category:
    | "vehicles"
    | "auto-parts"
    | "mechanical-services"
    | "car-rental"
    | "services"
    | null
}

export interface PlanType {
  name: "Starter" | "Professional" | "Enterprise"
  monthlyPrice?: number
  annualPrice?: number
  billingCycle: "M" | "A"
}

export interface SellerRegistrationState {
  // Plan info (from price selection)
  plan: PlanType | null
  category: SellerCategoryType | null

  sellerType: "individual" | "business" | null

  // Will contain either individual or business info
  individualInfo: {
    gender: string
    nationalId: string
    taxpinNumber: string
    associationName?: string
    identityToken?: string
    whatsappPhone?: string
  }

  businessInfo: {
    logo: string
    businessName: string
    businessRegistrationNumber: string
    businessTaxpinNumber: string
    dealerLicense?: string
    description: string
    vatNumber?: string
    tradingLicense?: string
    whatsappPhone?: string
    businessEmail: string
    businessPhone: string
  }

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

const initialState: SellerRegistrationState = {
  category: null,
  plan: null,
  sellerType: null,
  individualInfo: {
    gender: "",
    nationalId: "",
    taxpinNumber: "",
    associationName: "",
    identityToken: "",
    whatsappPhone: "",
  },
  businessInfo: {
    logo: "",
    businessName: "",
    businessRegistrationNumber: "",
    businessTaxpinNumber: "",
    dealerLicense: "",
    description: "",
    vatNumber: "",
    tradingLicense: "",
    whatsappPhone: "",
    businessEmail: "",
    businessPhone: "",
  },
  address: {
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    latitude: "",
    longitude: "",
    isPrimary: true,
  },
}

export const registrationAtom = atomWithStorage(
  "seller-registration",
  initialState
)

// Optional: Create derived atoms for specific parts of the state
export const planAtom = atom(
  (get) => get(registrationAtom).plan,
  (get, set, plan: PlanType) => {
    const current = get(registrationAtom)
    set(registrationAtom, { ...current, plan })
  }
)

export const categoryAtom = atom(
  (get) => get(registrationAtom).category,
  (get, set, category: SellerCategoryType) => {
    const current = get(registrationAtom)
    set(registrationAtom, { ...current, category })
  }
)

export const clearRegistrationAtom = atom(null, (get, set) => {
  set(registrationAtom, initialState)
})
