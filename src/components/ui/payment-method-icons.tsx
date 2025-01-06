/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { siMastercard, siPaypal, siVisa } from "simple-icons"

const IconWrapper = ({ path, title, className = "" }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    aria-label={title}
  >
    <title>{title}</title>
    <path d={path} />
  </svg>
)

export const VisaIcon = ({ className }: any) => (
  <IconWrapper path={siVisa.path} title="Visa" className={className} />
)

export const MasterCardIcon = ({ className }: any) => (
  <IconWrapper path={siMastercard.path} title="BMW" className={className} />
)
export const PaypalIcon = ({ className }: any) => (
  <IconWrapper path={siPaypal.path} title="BMW" className={className} />
)

export default {
  Visa: VisaIcon,
  MasterCard: MasterCardIcon,
  Paypal: PaypalIcon,
}
