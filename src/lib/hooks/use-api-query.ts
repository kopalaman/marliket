import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { handleApiResponse } from "@/lib/api-utils"
import { ApiError } from "../error"

interface QueryConfig<TData> {
  queryKey: string[]
  queryFn: () => Promise<Response>
  options?: Omit<UseQueryOptions<TData, ApiError>, "queryKey" | "queryFn">
}

export function useApiQuery<TData>({
  queryKey,
  queryFn,
  options = {},
}: QueryConfig<TData>) {
  return useQuery<TData, ApiError>({
    queryKey,
    queryFn: async () => {
      const response = await queryFn()
      return handleApiResponse<TData>(response)
    },
    ...options,
  })
}
