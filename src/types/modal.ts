export type MODAL_VIEWS = "LOGIN_VIEW" | "REGISTER_VIEW"
// Add more modal types as needed

export interface ModalState {
  isOpen: boolean
  view: MODAL_VIEWS | null
  data?: unknown
}
