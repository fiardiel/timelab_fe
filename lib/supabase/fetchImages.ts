'use server'

import { createClient } from '@/lib/supabase/client'

export const fetchImages = async () => {
  const supabaseClient = createClient()
  const { data, error } = await supabaseClient
    .from('imagerecord')
    .select('*')

  if (error || !data) {
    console.error('Error fetching image records:', error)
    return []
  } else {
    return (data || [])
  }
}
