export default defineEventHandler(async (event) => {
  const year = getRouterParam(event, 'year')

  if (!year || !['2024', '2025'].includes(year)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid year'
    })
  }

  try {
    const storage = useStorage('assets:content')
    const keys = await storage.getKeys(year)

    // Extract day numbers from keys like "2024/day1/readme.md"
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
  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to read exercises'
    })
  }
})
