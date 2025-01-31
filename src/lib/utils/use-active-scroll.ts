"use client"

import { checkIsScrollingStart } from "@/lib/constants"
import { useAtom } from "jotai"
import { RefObject, useEffect } from "react"

export function useActiveScroll<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  topOffset: number = 80
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUnderMaintenanceStart] = useAtom(checkIsScrollingStart)
  useEffect(() => {
    const element = ref?.current
    const listener = () => {
      if (window.scrollY > topOffset) {
        element?.classList.add("is-scrolling")
        setUnderMaintenanceStart(true)
      } else {
        element?.classList.remove("is-scrolling")
        setUnderMaintenanceStart(false)
      }
    }
    document.addEventListener("scroll", listener)
    return () => {
      document.removeEventListener("scroll", listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
