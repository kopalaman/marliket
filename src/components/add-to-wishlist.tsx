"use client"

import clsx from "clsx"
import { HeartIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"

type WishlistPropsType = {
  onClick: (data: boolean) => void
  isWishListed: boolean
}
export default function AddToWishlist({
  onClick,
  isWishListed,
}: WishlistPropsType) {
  const [addWishlist, setAddWishlist] = useState(isWishListed)

  function handleWishlistAdd() {
    setAddWishlist((prevState) => !prevState)
    onClick && onClick(!addWishlist)
  }

  return (
    <Button
      variant={"secondary"}
      type="button"
      className="absolute right-4 top-4 z-10 inline-block opacity-70 transition-transform duration-200 active:scale-75"
      onClick={() => handleWishlistAdd()}
    >
      <HeartIcon
        className={clsx("h-auto w-[22px]", {
          "!text-red-500": addWishlist,
        })}
      />
    </Button>
  )
}
