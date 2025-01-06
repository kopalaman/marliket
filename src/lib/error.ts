export class ApiError extends Error {
  code?: string
  type?: string[]

  constructor(
    message: string,
    options: {
      code?: string
      type?: string[]
    } = {}
  ) {
    super(message)
    this.name = "ApiError"
    this.code = options.code
    this.type = options.type
  }
}
