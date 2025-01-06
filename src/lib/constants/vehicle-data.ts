export const VEHICLE_MAKES = {
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "4Runner", "Tacoma"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "HR-V", "Odyssey"],
  Ford: ["F-150", "Mustang", "Explorer", "Escape", "Edge", "Bronco"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "M3", "M5"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "AMG GT"],
}

export type Make = keyof typeof VEHICLE_MAKES
export type Model = (typeof VEHICLE_MAKES)[Make][number]
