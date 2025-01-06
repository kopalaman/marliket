// hooks/use-query-param.ts
"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function useQueryParam() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      // Update or delete each parameter
      Object.entries(params).forEach(([key, value]) => {
        if (value === "" || value === null || value === undefined) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, value)
        }
      })

      return newSearchParams.toString()
    },
    [searchParams]
  )

  const updateQueryparams = useCallback(
    (name: string, value: string) => {
      // Create new query string
      const queryString = createQueryString({ [name]: value })

      // Update URL without refresh
      const url = pathname + (queryString ? `?${queryString}` : "")
      router.push(url, { scroll: false })
    },
    [pathname, createQueryString, router]
  )

  const deleteQueryParam = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams?.toString())
      params.delete(name)
      const url = pathname + (params.toString() ? `?${params.toString()}` : "")
      router.push(url, { scroll: false })
    },
    [pathname, searchParams, router]
  )

  const updateMultipleParams = useCallback(
    (params: Record<string, string>) => {
      const queryString = createQueryString(params)
      const url = pathname + (queryString ? `?${queryString}` : "")
      router.push(url, { scroll: false })
    },
    [pathname, createQueryString, router]
  )

  const getQueryParam = useCallback(
    (name: string) => {
      return searchParams?.get(name) || ""
    },
    [searchParams]
  )

  return {
    updateQueryparams,
    deleteQueryParam,
    updateMultipleParams,
    getQueryParam,
  }
}
