import { atom } from "jotai"

export type MODAL_VIEWS =
  | "REGISTER_VIEW"
  | "LOGIN_VIEW"
  | "FORGOT_VIEW"
  | "SELLER_CATEGORY_OPTION"
// ... other view types

interface ModalState {
  view?: MODAL_VIEWS
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  isOpen: boolean
}

export const modalAtom = atom<ModalState>({
  view: undefined,
  isOpen: false,
  data: null,
})
