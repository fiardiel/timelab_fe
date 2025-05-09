import { fetchImages } from '@/lib/fetchImages'
import React from 'react'
import SvgFollowPage from './images'

const page = async () => {
  const images = await fetchImages()
  return (
    <div>
      <SvgFollowPage images={images} />
    </div>
  )
}

export default page
