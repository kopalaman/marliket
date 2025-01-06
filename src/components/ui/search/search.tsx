"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBox from "@/components/ui/search/search-box"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

interface Props {
  label: string
  className?: string
  inputClassName?: string
  variant?: "minimal" | "normal" | "with-shadow" | "flat"
  [key: string]: unknown
}

const Search: React.FC<Props> = ({
  label,
  variant,
  className,
  inputClassName,
  ...props
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const [searchTerm, updateSearchTerm] = useState("")
  const handleOnChange = (e: any) => {
    const { value } = e.target
    updateSearchTerm(value)
  }

  const onSearch = (e: any) => {
    e.preventDefault()
    if (!searchTerm) return
    // const { pathname, query } = router;
    // router.push(
    //   {
    //     pathname,
    //     query: { ...query, text: searchTerm },
    //   },
    //   undefined,
    //   {
    //     scroll: false,
    //   }
    // );
  }

  function clearSearch() {
    updateSearchTerm("")
  }

  return (
    <SearchBox
      label={label}
      onSubmit={onSearch}
      onClearSearch={clearSearch}
      onChange={handleOnChange}
      value={searchTerm}
      name="search"
      placeholder={"search for vehicles, parts, services, etc."}
      variant={variant}
      className={className}
      inputClassName={inputClassName}
      {...props}
    />
  )
}

export default Search
