import GalleryImages from '@/components/admin/GalleryImages'
import { Button } from '@/components/ui/button'
import { fetchImages } from '@/lib/fetchImages'
import { Upload } from 'lucide-react'
import Link from 'next/link'

const GalleryPage = async () => {
  const images = await fetchImages()

  return (
    <div>
      <Button className='ml-6 mt-6 text-lg bg-blue-500' size={'lg'} asChild>
        <Link href={'/'}>
          Upload Image <Upload />
        </Link>
      </Button>
      <GalleryImages images={images} />
    </div>
  )
}

export default GalleryPage
