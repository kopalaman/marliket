import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
    <div className="container relative h-[500px] w-full overflow-hidden rounded-none bg-gray-100 sm:rounded-lg">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="/api/placeholder/1400/500"
          alt="Hero background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center">
          {/* Mobile Content (no card background) */}
          <div className="w-full space-y-2 md:hidden">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Make money selling online
            </h1>
            <p className="text-md text-white/90">
              Sell your items fast—millions of buyers are waiting.
            </p>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white"
            >
              List an item
            </Button>
          </div>

          {/* Desktop Content (hidden on mobile) */}
          <div className="ml-auto hidden w-full max-w-sm md:block">
            <div className="transform rounded-xl bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Make money selling online
                  </h1>
                  <p className="text-base text-gray-600">
                    Sell your items fast—millions of buyers are waiting.
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white"
                >
                  List an item
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
