import GalleryImage from '@/components/admin/GalleryImage'
import { fetchImages } from '@/lib/fetchImages'
import SwiperGallery from '@/components/admin/SwiperGallery'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const GalleryIndexPage = async ({ params }: { params: { index: string } }) => {
  const images = await fetchImages()
  const imageIndex = parseInt(params.index, 10)

  if (isNaN(imageIndex) || imageIndex < 0 || imageIndex >= images.length) {
    notFound()
  }

  return (
    <>
      {/* Same grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6 p-6">
        {images.map((image, idx) => (
          <Link key={image.image_url} href={`/gallery/${idx}`}>
            <GalleryImage imageSrc={image.image_url} index={idx} />
          </Link>
        ))}
      </div>

      {/* Modal Swiper */}
      <SwiperGallery images={images} initialSlide={imageIndex} />
    </>
  )
}

export default GalleryIndexPage

