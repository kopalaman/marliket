import Link from "next/link"
import { Button } from "../ui/button"
import BannerBlock from "./banner-block/banner-block"

export default function AddVehicleBlock() {
  return (
    <BannerBlock
      bgImg="/images/banner/2.jpg"
      title="Add Your Vehicle"
      description="Add your vehicle to My Garage to find items that fit easily."
      className="4xl:!py-[132px] from-primary/10 to-primary/60 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-gradient-to-b md:before:rounded-2xl md:before:bg-gradient-to-r xl:before:hidden"
      contentWrapperClassName="m-auto md:ml-0 max-w-[450px] xl:max-w-[513px] px-8 py-9 md:px-0 md:py-0 flex flex-col justify-center md:justify-start z-20"
      titleClassName="mb-3"
      sectionClassName="4xl:!px-16"
      descriptionClassName="text-sm text-center md:text-left"
    >
      {/* Routes.public.explore */}
      <Button
        size={"lg"}
        variant={"secondary"}
        className="m-auto inline-block w-3/4 md:ml-0"
      >
        <Link href={"/"}>Add Vehicle</Link>
      </Button>
    </BannerBlock>
  )
}
