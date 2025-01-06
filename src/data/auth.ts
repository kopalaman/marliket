import { client } from "@/lib/rpc"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { useApiMutation } from "@/lib/hooks/use-api-mutation"
import { useApiQuery } from "@/lib/hooks/use-api-query"
import { useModal } from "@/lib/hooks/use-modal"
import { MODAL_VIEWS } from "@/types/modal"
import { InferRequestType, InferResponseType } from "hono"
import { useEffect } from "react"

// Type definitions
type LoginResponse = InferResponseType<(typeof client.api.auth.login)["$post"]>
type LoginRequest = InferRequestType<(typeof client.api.auth.login)["$post"]>

type RegisterResponse = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>
type RegisterRequest = InferRequestType<
  (typeof client.api.auth.register)["$post"]
>
type UserResponse = InferResponseType<(typeof client.api.auth.user)["$get"]>

export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useApiMutation<LoginResponse, LoginRequest>({
    mutationFn: ({ json }) => client.api.auth.login.$post({ json }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      router.refresh()
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useApiMutation<RegisterResponse, RegisterRequest>({
    mutationFn: ({ json }) => client.api.auth.register.$post({ json }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      router.refresh()
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useApiMutation<{ message: string }, void>({
    mutationFn: () => client.api.auth.logout.$post(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] })
      queryClient.clear()
      router.refresh()
    },
  })
}

interface User {
  email: string
  name: string
  id: string
  phone: string
  emailVerification: boolean
  phoneVerification: boolean
}

export function useAuth(requireAuth = false, modalView: MODAL_VIEWS) {
  const { openModal } = useModal()
  const { data, isPending } = useApiQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: () => client.api.auth.user.$get(),
    options: {
      retry: false,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  })
  // Type guard to check if data is of type User
  const user = data && "email" in data ? (data as User) : undefined

  // For handling error messages.
  // const error = data && "message" in data ? data : undefined;

  useEffect(() => {
    if (!isPending && requireAuth && !user) {
      openModal(modalView)
    }
  }, [isPending, modalView, openModal, requireAuth, user])

  return { user, isLoading: isPending, isAuthenticated: !!user }
}
