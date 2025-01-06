import React from "react"
import { MapPin } from "lucide-react"

export default function Location() {
  return (
    <div className="flex items-center gap-x-2">
      <MapPin size={20} />
      <span>Lusaka</span>
    </div>
  )
}
