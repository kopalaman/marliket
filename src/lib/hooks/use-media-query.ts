import { useMedia } from "react-use"

export default function useMediaQuery(query: string) {
  return useMedia(query)
}
