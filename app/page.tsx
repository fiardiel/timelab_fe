import FileUploadDemo from '@/components/admin/ImageUpload'
import { Button } from '@/components/ui/button'
import { Images } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <FileUploadDemo />
      <Button size={'lg'} className='text-lg mt-6 bg-blue-500 ' asChild color='blue'>
        <Link href={'/gallery'}>
          View Gallery <Images />
        </Link>
      </Button>
    </div>
  )
}

export default page
