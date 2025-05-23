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

  return urls
}

