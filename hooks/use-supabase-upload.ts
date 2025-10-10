import { runMLPipeline } from '@/lib/runMLPipeline'
import { createClient } from '@/lib/supabase/client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { type FileError, type FileRejection, useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation'

const supabase = createClient()

interface FileWithPreview extends File {
  preview?: string
  errors: readonly FileError[]
}

type UseSupabaseUploadOptions = {
  bucketName: string
  path?: string
  allowedMimeTypes?: string[]
  maxFileSize?: number
  maxFiles?: number
  cacheControl?: number
  upsert?: boolean
  /**
   * Event name for DB insert
   */
  event?: string
  /**
   * People JSON for DB insert
   */
  people?: Record<string, boolean>
}

type UseSupabaseUploadReturn = ReturnType<typeof useSupabaseUpload>

const useSupabaseUpload = (options: UseSupabaseUploadOptions) => {
  const {
    bucketName,
    path,
    allowedMimeTypes = [],
    maxFileSize = Number.POSITIVE_INFINITY,
    maxFiles = 1,
    cacheControl = 3600,
    upsert = false,
    event = 'default_event',
    people = {}
  } = options

  const router = useRouter()
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ name: string; message: string }[]>([])
  const [successes, setSuccesses] = useState<string[]>([])

  const isSuccess = useMemo(() => {
    if (errors.length === 0 && successes.length === 0) {
      return false
    }
    if (errors.length === 0 && successes.length === files.length) {
      return true
    }
    return false
  }, [errors.length, successes.length, files.length])

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const validFiles = acceptedFiles
        .filter((file) => !files.find((x) => x.name === file.name))
        .map((file) => {
          ; (file as FileWithPreview).preview = URL.createObjectURL(file)
            ; (file as FileWithPreview).errors = []
          return file as FileWithPreview
        })

      const invalidFiles = fileRejections.map(({ file, errors }) => {
        ; (file as FileWithPreview).preview = URL.createObjectURL(file)
          ; (file as FileWithPreview).errors = errors
        return file as FileWithPreview
      })

      const newFiles = [...files, ...validFiles, ...invalidFiles]
      setFiles(newFiles)
    },
    [files, setFiles]
  )

  const dropzoneProps = useDropzone({
    onDrop,
    noClick: true,
    accept: allowedMimeTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize,
    maxFiles: maxFiles,
    multiple: maxFiles !== 1,
  })

  const onUpload = useCallback(async () => {
    setLoading(true)

    const filesWithErrors = errors.map((x) => x.name)
    const filesToUpload =
      filesWithErrors.length > 0
        ? [
          ...files.filter((f) => filesWithErrors.includes(f.name)),
          ...files.filter((f) => !successes.includes(f.name)),
        ]
        : files

    const responses = await Promise.all(
      filesToUpload.map(async (file) => {
        const fullPath = !!path ? `${path}/${file.name}` : file.name

        // 1️⃣ Upload file
        const { error } = await supabase.storage
          .from(bucketName)
          .upload(fullPath, file, {
            cacheControl: cacheControl.toString(),
            upsert,
          })

        if (error) {
          return { name: file.name, message: error.message }
        }

        // 2️⃣ Get public URL
        const { data } = supabase.storage.from(bucketName).getPublicUrl(fullPath)
        const publicUrl = data?.publicUrl ?? ''
        console.log(publicUrl, "publicUrl")

        // 3️⃣ Insert row into DB table
        const { error: dbError } = await supabase
          .from('imagerecord')
          .insert({
            file_name: publicUrl,
            event: event,
            people: {},
          })

        if (dbError) {
          console.error('DB insert error:', dbError)
          return { name: file.name, message: dbError.message }
        }

        return { name: file.name, message: undefined }
      })
    )

    const responseErrors = responses
      .filter((x): x is { name: string; message: string } => x.message !== undefined)

    setErrors(responseErrors)

    const responseSuccesses = responses.filter((x) => x.message === undefined)
    const newSuccesses = Array.from(
      new Set([...successes, ...responseSuccesses.map((x) => x.name)])
    )
    setSuccesses(newSuccesses)

    if (responseErrors.length === 0 && responseSuccesses.length > 0) {
      await runMLPipeline()
      router.push('/gallery')
    }

    setLoading(false)
  }, [files, path, bucketName, errors, successes, cacheControl, upsert, event, people])

  useEffect(() => {
    if (files.length === 0) {
      setErrors([])
    }

    if (files.length <= maxFiles) {
      let changed = false
      const newFiles = files.map((file) => {
        if (file.errors.some((e) => e.code === 'too-many-files')) {
          file.errors = file.errors.filter((e) => e.code !== 'too-many-files')
          changed = true
        }
        return file
      })
      if (changed) {
        setFiles(newFiles)
      }
    }
  }, [files.length, setFiles, maxFiles])

  return {
    files,
    setFiles,
    successes,
    isSuccess,
    loading,
    errors,
    setErrors,
    onUpload,
    maxFileSize: maxFileSize,
    maxFiles: maxFiles,
    allowedMimeTypes,
    ...dropzoneProps,
  }
}

export { useSupabaseUpload, type UseSupabaseUploadOptions, type UseSupabaseUploadReturn }

