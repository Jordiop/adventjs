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

  const baseDir = join(process.cwd(), '..', year)

  try {
    const entries = await readdir(baseDir, { withFileTypes: true })
    const days = entries
      .filter(entry => entry.isDirectory() && entry.name.startsWith('day'))
      .map(entry => {
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
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to read exercises'
    })
  }
})
