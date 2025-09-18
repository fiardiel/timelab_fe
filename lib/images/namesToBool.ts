const namesToBoolMap = (names: string[]) => {
  return names.reduce<Record<string, boolean>>((acc, raw) => {
    const k = raw.trim().toLowerCase()
    if (k) acc[k] = true
    return acc
  }, {})
}
