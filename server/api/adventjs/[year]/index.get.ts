import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const year = getRouterParam(event, 'year')

  if (!year || !['2024', '2025'].includes(year)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid year'
    })
  }

  try {
    // Try server assets first (for production)
    try {
      const storage = useStorage('assets:content')
      const keys = await storage.getKeys(year)

      console.log('Using server assets - keys:', keys)

      if (keys.length > 0) {
        const daySet = new Set<number>()
        for (const key of keys) {
          const match = key.match(/day(\d+)/)
          if (match && match[1]) {
            daySet.add(parseInt(match[1]))
          }
        }

        const days = Array.from(daySet)
          .map(day => ({
            day,
            path: `day${day}`
          }))
          .sort((a, b) => a.day - b.day)

        return {
          year,
          days
        }
      }
    } catch (storageError) {
      console.log('Server assets failed, falling back to filesystem:', storageError)
    }

    // Fallback to filesystem (for development)
    const baseDir = join(process.cwd(), 'content', year)
    console.log('Using filesystem - baseDir:', baseDir)

    const entries = await readdir(baseDir, { withFileTypes: true })
    const days = entries
      .filter(entry => entry.isDirectory() && entry.name.startsWith('day'))
      .map((entry) => {
        const dayNum = entry.name.replace('day', '')
        return {
          day: parseInt(dayNum),
          path: entry.name
        }
      })
      .sort((a, b) => a.day - b.day)

    return {
      year,
      days
    }
  } catch (error) {
    console.log('Error in index.get.ts:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to read exercises'
    })
  }
})
