"use server"

import { supabase } from "@/lib/supabaseClient"

export const fetchImages = async () => {
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!
  const { data, error } = await supabase.storage.from(bucketName).list("")

  if (error || !data) {
    console.error("Error fetching images:", error)
    return []
  }

  const urls = data.map((file) =>
    supabase.storage.from(bucketName).getPublicUrl(file.name).data.publicUrl
  )

  // Return as 5 chunks of 4
  return [
    urls.slice(0, 4),
    urls.slice(4, 8),
    urls.slice(8, 12),
    urls.slice(12, 16),
    urls.slice(16, 20)
  ]
}

