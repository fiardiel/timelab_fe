'use client'

import { createClient } from "./supabase/client";


/**
 * Deletes an image from Supabase Storage given its full public URL.
 * @param imageUrl - The full public URL of the image
 * @param bucketName - The Supabase bucket name where the image is stored
 * @returns Promise<{ success: boolean; error?: string }>
 */
export async function deleteImage(imageUrl: string, bucketName: string): Promise<{ success: boolean; error?: string }> {
  const publicPath = imageUrl.split('/storage/v1/object/public/timespace/')[1]
  const supabase = createClient()

  try {
    const { error: storageError } = await supabase
      .storage
      .from(bucketName)
      .remove([publicPath])
    if (storageError) {
      return { success: false, error: storageError.message }
    }

    const { error: dbError } = await supabase
      .from('imagerecord')
      .delete()
      .eq('file_name', imageUrl)

    if (dbError) {
      return { success: false, error: dbError.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Unexpected error' }
  }
}
