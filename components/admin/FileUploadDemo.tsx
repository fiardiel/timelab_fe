'use client'

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'

export default function FileUploadDemo() {
  const props = useSupabaseUpload({
    bucketName: 'timespace',
    allowedMimeTypes: ['image/*'],
    maxFiles: 2,
    maxFileSize: 1000 * 1000 * 10,
    event: 'test', // dynamic event name
    people: { rafi: true, john: true } // dynamic people JSON
  })

  return (
    <div className="w-[500px]">
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  )
}

