'use client'

import GalleryImage from '@/components/admin/GalleryImage'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'
import { DialogTitle } from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { deleteImage } from '@/lib/deleteImage'


interface GalleryImagesProps {
  images: { image_url: string, people: string }[]
}

const GalleryImages: React.FC<GalleryImagesProps> = ({ images }) => {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const router = useRouter()

  const onDelete = async (imageUrl: string) => {
    const { success, error } = await deleteImage(imageUrl, 'timespace')
    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6 p-6">
      {images.map((image, idx) => (
        <Dialog key={image.image_url} onOpenChange={(open) => !open && setSelectedUrl(null)}>
          <DialogTrigger asChild>
            <div className='cursor-pointer' onClick={() => setSelectedUrl(image.image_url)}>
              <GalleryImage imageSrc={image.image_url} index={idx} />
            </div>
          </DialogTrigger>

          <DialogContent className="max-w-4xl w-full p-4">
            <DialogTitle />
            {selectedUrl && (
              <div className="w-full flex flex-col items-center gap-4">
                <Image
                  src={selectedUrl}
                  alt="Selected"
                  height={500}
                  width={500}
                  onLoad={() => setIsImageLoading(false)}
                  className={cn(
                    "transition duration-700 object-contain rounded-md",
                    isImageLoading
                      ? "grayscale blur-lg"
                      : "opacity-100 grayscale-0 blur-0"
                  )}
                />
              </div>
            )}
            <DialogFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='destructive'>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the image.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form className='w-full flex' onSubmit={async (e) => {
                      e.preventDefault()
                      await onDelete(selectedUrl || '')
                    }}>
                      <AlertDialogAction className='w-full flex' type='submit'>
                        Yes, delete it
                      </AlertDialogAction>
                    </form>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>)
}

export default GalleryImages
