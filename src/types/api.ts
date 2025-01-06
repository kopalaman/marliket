/* eslint-disable @typescript-eslint/no-explicit-any */

// types/api.ts
export interface ApiSuccessResponse<T = any> {
  message?: string
  data?: T
  [key: string]: any
}

export interface ApiErrorResponse {
  message: string
  code?: string
  type?: string[]
}
