import RenderAuth from "@/components/auth/auth-form"
import SellerCategory from "@/components/become-seller/seller-category"
import { useModal } from "@/lib/hooks/use-modal"
import { ResponsiveModal } from "./responsive-modal"

const ManagedModal = () => {
  const { isOpen, view, closeModal } = useModal()

  const getModalConfig = () => {
    switch (view) {
      case "LOGIN_VIEW":
      case "REGISTER_VIEW":
        return {
          title: "Login or Register to continue",
          component: <RenderAuth />,
        }
      case "SELLER_CATEGORY_OPTION":
        return {
          title: "Vendor Category",
          component: <SellerCategory />,
        }
      // Add other cases here
      default:
        return null
    }
  }

  const modalConfig = getModalConfig()

  if (!modalConfig) return null

  return (
    <ResponsiveModal
      open={isOpen}
      onClose={closeModal}
      title={modalConfig.title}
    >
      {modalConfig.component}
    </ResponsiveModal>
  )
}

export default ManagedModal
