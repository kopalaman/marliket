/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  siAudi,
  siBmw,
  siFord,
  siHonda,
  siHyundai,
  siMercedes,
  siToyota,
  siVolkswagen,
  siYoutube,
} from "simple-icons"

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

export const ToyotaIcon = ({ className }: any) => (
  <IconWrapper path={siToyota.path} title="Toyota" className={className} />
)
export const YoutubeIcon = ({ className }: any) => (
  <IconWrapper path={siYoutube.path} title="Youtube" className={className} />
)

export const BMWIcon = ({ className }: any) => (
  <IconWrapper path={siBmw.path} title="BMW" className={className} />
)

export const MercedesIcon = ({ className }: any) => (
  <IconWrapper path={siMercedes.path} title="Mercedes" className={className} />
)

export const VolkswagenIcon = ({ className }: any) => (
  <IconWrapper
    path={siVolkswagen.path}
    title="Volkswagen"
    className={className}
  />
)

export const FordIcon = ({ className }: any) => (
  <IconWrapper path={siFord.path} title="Ford" className={className} />
)

export const HondaIcon = ({ className }: any) => (
  <IconWrapper path={siHonda.path} title="Honda" className={className} />
)

export const HyundaiIcon = ({ className }: any) => (
  <IconWrapper path={siHyundai.path} title="Hyundai" className={className} />
)

export const AudiIcon = ({ className }: any) => (
  <IconWrapper path={siAudi.path} title="Audi" className={className} />
)

export default {
  Toyota: ToyotaIcon,
  BMW: BMWIcon,
  Mercedes: MercedesIcon,
  Volkswagen: VolkswagenIcon,
  Ford: FordIcon,
  Honda: HondaIcon,
  Hyundai: HyundaiIcon,
  Audi: AudiIcon,
  YouTube: YoutubeIcon,
}
