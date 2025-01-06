import { type MODAL_VIEWS, modalAtom } from "@/components/shared/modals/atom"
import { useAtom } from "jotai"

export function useModal() {
  const [state, setState] = useAtom(modalAtom)

  const openModal = (view?: MODAL_VIEWS, payload?: unknown) => {
    setState({ view, data: payload, isOpen: true })
  }

  const closeModal = () => {
    setState({ view: undefined, data: null, isOpen: false })
  }

  return {
    ...state,
    openModal,
    closeModal,
  }
}
