"use client"

import { useEffect, useState } from "react"

export function useTimeout() {
  const [state, setState] = useState(false)
  useEffect(() => {
    const loading = setTimeout(() => {
      setState(true)
    }, 800)
    return () => clearTimeout(loading)
  }, [])

  return { state }
}
