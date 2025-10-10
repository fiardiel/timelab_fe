'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useState } from 'react'

interface GalleryImageProps {
  imageSrc: string
}

const GalleryImage: React.FC<GalleryImageProps> = ({ imageSrc }) => {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <div className='w-full rounded-lg'>
      <div className='group'>
        <Image
          width={500}
          height={500}
          src={imageSrc}
          alt={imageSrc}
          className={cn(
            'object-cover group-hover:opacity-75 duration-700 ease-in-out aspect-[4/3] rounded-lg',
            isLoading
              ? 'grayscale blur-lg'
              : 'opacity-100 grayscale-0 blur-0'
          )}
          onLoad={() => setIsLoading(false)}
        />
      </div >
    </div >
  )
}

export default GalleryImage
