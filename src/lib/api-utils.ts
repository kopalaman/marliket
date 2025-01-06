/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiErrorResponse } from "@/types/api"
import { ApiError } from "./error"

export function isErrorResponse(data: any): data is ApiErrorResponse {
  return "message" in data && ("code" in data || "type" in data)
}

export async function handleApiResponse<T>(response: Response): Promise<T> {
  const data = await response.json()
  if (!response.ok) {
    if (isErrorResponse(data)) {
      throw new ApiError(data.message, {
        code: data.code,
        type: data.type,
      })
    }

    throw new ApiError("Request failed")
  }
  return data as T
}
