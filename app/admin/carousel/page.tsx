import React from 'react'
import { fetchImages } from '@/lib/fetchImages'
import SwiperGallery from '@/components/admin/SwiperGallery'

const page = async () => {
  const images = await fetchImages()

  return (
    <div className='container'>
      <SwiperGallery images={images} />
    </div>
  )
}

export default page
