// lib/utils/form-helpers.ts
import { SellerRegistrationFormData } from "../validations/seller-registration"

const FORM_STORAGE_KEY = "seller_registration_form"

export const loadFormData = () => {
  if (typeof window === "undefined") return null

  try {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY)
    if (!savedData) return null

    const data = JSON.parse(savedData)

    // Convert stored date strings back to Date objects
    if (data.personalInfo?.dateOfBirth) {
      data.personalInfo.dateOfBirth = new Date(data.personalInfo.dateOfBirth)
    }

    return data
  } catch (error) {
    console.error("Error loading form data:", error)
    return null
  }
}

export const saveFormData = (
  data: Partial<SellerRegistrationFormData> | null
) => {
  if (typeof window === "undefined") return

  if (data === null) {
    localStorage.removeItem(FORM_STORAGE_KEY)
    return
  }

  try {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving form data:", error)
  }
}

export const validateImage = async (file: File) => {
  const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("File type not supported. Please use PNG or JPG images.")
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File is too large. Maximum size is 2MB.")
  }

  // Additional image validation (dimensions)
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
      if (img.width < 300 || img.height < 300) {
        reject(new Error("Image dimensions must be at least 300x300 pixels"))
      }
      resolve(true)
    }

    img.onerror = () => {
      reject(new Error("Invalid image file"))
    }
  })
}

export const getStepProgress = (
  formData: Partial<SellerRegistrationFormData>
) => {
  const progress = {
    business: 0,
    profile: 0,
    personal: 0,
    review: 0,
  }

  // Calculate progress for each step
  if (formData.businessType && formData.storeName) {
    progress.business = formData.profileImage ? 100 : 75
  } else if (formData.businessType || formData.storeName) {
    progress.business = 50
  }

  if (formData.about && formData.location?.province && formData.location.city) {
    progress.profile = 100
  } else if (
    formData.about ||
    (formData.location?.province && formData.location.city)
  ) {
    progress.profile = 50
  }

  const personalInfo = formData.personalInfo
  if (personalInfo) {
    const requiredFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "nationalId",
      "phone",
      "email",
    ]
    const filledFields = requiredFields.filter(
      (field) => !!personalInfo[field as keyof typeof personalInfo]
    )
    progress.personal = (filledFields.length / requiredFields.length) * 100
  }

  if (formData.agreeToTerms && formData.agreeToPrivacyPolicy) {
    progress.review = 100
  } else if (formData.agreeToTerms || formData.agreeToPrivacyPolicy) {
    progress.review = 50
  }

  return progress
}
