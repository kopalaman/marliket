import Image from "next/image"
import { FC } from "react"

const testimonials = [
  {
    name: "David Chen",
    description:
      "As a car dealer, this platform has transformed how we sell vehicles. The inventory management tools and buyer reach are exceptional. We've seen a 40% increase in sales.",
    profession: "Car Dealership Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  },
  {
    name: "Sarah Williams",
    profession: "Independent Car Seller",
    description:
      "Sold my BMW in just 2 weeks! The platform made it easy to list, communicate with buyers, and handle the paperwork. The pricing suggestions were spot-on.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    name: "Michael Rodriguez",
    profession: "Vintage Car Specialist",
    description:
      "Perfect for classic car sales. The detailed listing options help showcase vehicle history and special features. Connected with serious collectors quickly.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  },
  {
    name: "Emma Thompson",
    profession: "Fleet Manager",
    description:
      "Managing our company's vehicle fleet sales has never been easier. The bulk listing tools and analytics dashboard save us hours of work every week.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
  },
  {
    name: "James Wilson",
    profession: "Automotive Dealer",
    description:
      "The verification system gives buyers confidence, and the secure payment process protects both parties. We've reduced our selling time by 50%.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
  {
    name: "Lisa Anderson",
    profession: "Car Import Specialist",
    description:
      "The platform's international reach helped us expand our import business. The multi-language support and currency conversion make selling across borders simple.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
]

interface TestimonialCardProps {
  name: string
  description: string
  image: string
  profession: string
  location?: string
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  name,
  description,
  image,
  profession,
}) => {
  return (
    <div
      className={`relative flex h-auto max-w-[22rem] select-none flex-col items-start justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-gray-800/30`}
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 opacity-10 blur-3xl dark:from-gray-100 dark:to-gray-200"></div>
      <div className="mb-0 flex h-fit flex-row items-center gap-3">
        <Image
          className="m-0 block h-12 w-12 rounded-full border-2 border-gray-100 object-cover dark:border-gray-800"
          src={image}
          alt={name}
          width={48}
          height={48}
        />
        <div className="mb-0 flex h-fit flex-col items-start">
          <h3 className="m-0 text-base font-medium text-gray-900 dark:text-gray-100">
            {name}
          </h3>
          <p className="m-0 text-sm text-gray-600 dark:text-gray-400">
            {profession}
          </p>
        </div>
      </div>
      <p className="mb-0 mt-3 text-left text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}

const VehicleTestimonials = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-5 bg-gray-50 px-6 py-24 dark:bg-gray-950">
      <div className="absolute inset-0 bg-grid-gray-900/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-white/5"></div>
      <div className="relative">
        <h2 className="mb-1 max-w-2xl text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Success Stories from Vehicle Sellers
        </h2>
        <p className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
          Join thousands of successful sellers who have transformed their
          vehicle sales business using our platform.
        </p>
      </div>

      <div className="relative mt-16 flex h-full w-full flex-col items-center justify-center gap-5 md:flex-row">
        {[0, 1, 2].map((colIndex) => (
          <div key={colIndex} className="flex flex-col justify-center gap-4">
            {testimonials
              .slice(colIndex * 2, colIndex * 2 + 2)
              .map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VehicleTestimonials
