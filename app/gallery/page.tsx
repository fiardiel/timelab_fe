import GalleryImages from '@/components/admin/GalleryImages'
import { fetchImages } from '@/lib/fetchImages'

const GalleryPage = async () => {
  const images = await fetchImages()

  return (
    <div>
      <GalleryImages images={images} />
    </div>
  )
}

export default GalleryPage
