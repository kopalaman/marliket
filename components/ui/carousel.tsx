'use client'

import { FC, useRef } from 'react'
// Core modules imports are same as usual
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from './button'

type CarouselPropsType = {
  children: React.ReactNode
  className?: string
  buttonGroupClassName?: string
  prevActivatedId?: string
  nextActivatedId?: string
  paginationFractionId?: string
  prevButtonClasses?: string
  nextButtonClasses?: string
  paginationVariant?: 'default' | 'circle'
  paginationPosition?: 'center' | 'left' | 'right'
  loop?: boolean
  centeredSlides?: boolean
  breakpoints?: {} | any
  pagination?: {} | any
  navigation?: {} | any
  scrollbar?: {} | any
  autoplay?: {} | any
  type?: 'rounded' | 'circle' | 'list'
  isFraction?: boolean
}

const Carousel: FC<CarouselPropsType> = ({
  children,
  className = '',
  buttonGroupClassName = '',
  prevActivatedId = '',
  nextActivatedId = '',
  paginationFractionId = '',
  prevButtonClasses = 'left-0',
  nextButtonClasses = 'right-0',
  paginationVariant = 'default',
  paginationPosition,
  breakpoints,
  navigation = true,
  pagination = false,
  autoplay = false,
  loop = true,
  isFraction = false,
  ...props
}) => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const classPagination = paginationPosition
    ? `pagination-${paginationPosition}`
    : ``

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]}
        loop={loop}
        slidesPerView={'auto'}
        autoplay={autoplay}
        breakpoints={breakpoints}
        pagination={pagination}
        navigation={
          navigation
            ? {
                prevEl: prevActivatedId.length
                  ? `#${prevActivatedId}`
                  : prevRef.current!,
                nextEl: nextActivatedId.length
                  ? `#${nextActivatedId}`
                  : nextRef.current!,
              }
            : {}
        }
        {...props}
      >
        {children}
      </Swiper>
      {(Boolean(navigation) || Boolean(isFraction)) && (
        <div>
          {prevActivatedId.length > 0 ? (
            <Button id={prevActivatedId} aria-label="prev-button">
              <ChevronLeft />
            </Button>
          ) : (
            <button ref={prevRef} aria-label="prev-button">
              <ChevronLeft />
            </button>
          )}
        </div>
      )}

      {Boolean(navigation) && (
        <div
          className="!w-[auto] text-center text-sm sm:text-base"
          id={paginationFractionId}
        />
      )}

      {nextActivatedId.length > 0 ? (
        <Button id={nextActivatedId} aria-label="next-button">
          <ChevronRight />
        </Button>
      ) : (
        <button ref={nextRef} aria-label="next-button">
          <ChevronRight />
        </button>
      )}
    </div>
  )
}

export default Carousel
