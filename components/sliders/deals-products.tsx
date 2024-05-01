'use client'

import { SwiperSlide } from 'swiper/react'

import SectionHeading from '../common/section-heading'
import Carousel from '../ui/carousel'

interface DealsProductsProps {
  sectionHeading?: string
  className?: string
  products?: any[]
}

const breakpoints = {
  '1500': {
    slidesPerView: 5,
    spaceBetween: 28,
  },
  '1025': {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  '768': {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  '480': {
    slidesPerView: 3,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
}

export default function DealsProducts({
  sectionHeading = 'Deals of the Day',
  className = 'relative mb-10 md:mb-12 xl:mb-14',
}: DealsProductsProps) {
  const error = false
  return (
    <div className={`${className} 2xl:pt-2`}>
      <div className="mb-5 md:mb-6">
        <SectionHeading
          sectionTitle={sectionHeading}
          className="mb-0"
          categorySlug="/"
        />
      </div>
      {error ? (
        <div>Error</div>
      ) : (
        <Carousel
          autoplay={{
            delay: 3500,
          }}
          breakpoints={breakpoints}
          buttonGroupClassName="-mt-10 md:-mt-12 xl:-mt-14"
        >
          {/* {isLoading && data?.productFlashSellGridTwo?.length
            ? Array.from({ length: 10 }).map((_, idx) => (
                <ProductCardGridLoader
                	key={idx}
                	uniqueKey={`flash-sale-${idx}`}
                />
                <div key={idx}>Loading...</div>
              ))
            : data?.productFlashSellGridTwo?.map((product: any) => (
                <SwiperSlide key={`product--key-${product.id}`}>
                  <ProductCard
										product={product}
										imgWidth={335}
										imgHeight={335}
										variant="gridSlim"
									/>
                  products
                </SwiperSlide>
              ))} */}

          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
          <SwiperSlide key={`product--key-${1}`}>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">This product description</p>
              <p className="text-sm font-medium">$12</p>
            </div>
          </SwiperSlide>
        </Carousel>
      )}
    </div>
  )
}
