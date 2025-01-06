// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeQueryString(queryObj: any) {
  // eslint-disable-next-line prefer-const
  let path = []
  for (const [key, value] of Object.entries(queryObj)) {
    path.push(`${key}=${value}`)
  }
  return path.join("&").toString()
}
