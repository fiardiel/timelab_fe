'use server'

export const fetchPeopleMapForFile = async (file: File): Promise<Record<string, boolean>> => {
  const form = new FormData()
  form.append('image', file, file.name)

  const res = await fetch('https://your-backend.example.com/extract-people', {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    throw new Error(`Backend failed (${res.status})`)
  }

  return (await res.json()) as Record<string, boolean>
}

