"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LoaderSpin from "@/components/ui/loaders/loader-spin"
import { useAuth, useLogout } from "@/data/auth"
import { useModal } from "@/lib/hooks/use-modal"
import { ChevronDownIcon } from "lucide-react"

export default function AuthUser() {
  const { user, isLoading } = useAuth(false, "LOGIN_VIEW")

  if (isLoading) {
    return <LoaderSpin />
  }

  return user ? <UserNav /> : <AuthButton />
}

const AuthButton = () => {
  const { openModal } = useModal()

  const handleLoginLinkClick = () => {
    openModal("LOGIN_VIEW")
  }

  return <Button onClick={handleLoginLinkClick}>Login or Register</Button>
}

function UserNav() {
  const { user, isLoading } = useAuth(false, "LOGIN_VIEW")
  const { mutate } = useLogout()

  if (isLoading) {
    return <LoaderSpin />
  }
  if (!user) {
    return <div>Please log in.</div>
  }

  const fallback = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="group relative">
          Hi {user?.name}!
          <ChevronDownIcon
            className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center gap-x-3 font-normal">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>
              <span>{fallback}</span>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => mutate()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
