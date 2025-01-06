// atoms/drawer.ts
import { atom } from "jotai"

interface DrawerState {
  isOpen: boolean
  view: "FILTER_MENU" | null
  placement: "left" | "right"
}

const initialDrawerState: DrawerState = {
  isOpen: false,
  view: null,
  placement: "right",
}

export const drawerStateAtom = atom(initialDrawerState)
