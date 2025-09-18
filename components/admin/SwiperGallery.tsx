'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'

interface SwiperGalleryProps {
  images: { image_url: string, people: string }[]
}

const SwiperGallery: React.FC<SwiperGalleryProps> = ({ images }) => {
  return (
    <Swiper
      navigation
      pagination={{ type: 'fraction' }}
      modules={[Navigation, Pagination]}
      className='w-full rounded-lg h-full'
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <div className='h-full flex w-full items-center justify-center rounded-lg'>
            <Image
              src={img.image_url}
              alt={img.image_url}
              width={500}
              height={500}
              className='object-cover block h-full w-full'
            />
          </div>
        </SwiperSlide>
      ))}

    </Swiper>
  )
}

export default SwiperGallery

