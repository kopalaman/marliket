import { UseMutationOptions, useMutation } from "@tanstack/react-query"

import { handleApiResponse } from "@/lib/api-utils"
import { ApiError } from "../error"

interface MutationConfig<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<Response>
  onSuccess?: (data: TData) => void | Promise<void>
  options?: Omit<UseMutationOptions<TData, ApiError, TVariables>, "mutationFn">
}

export function useApiMutation<TData, TVariables>({
  mutationFn,
  onSuccess,
  options = {},
}: MutationConfig<TData, TVariables>) {
  return useMutation<TData, ApiError, TVariables>({
    mutationFn: async (variables) => {
      const response = await mutationFn(variables)
      return handleApiResponse<TData>(response)
    },
    onSuccess,
    ...options,
  })
}
