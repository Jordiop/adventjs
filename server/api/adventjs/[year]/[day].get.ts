async function readScriptFile(year: string, day: string): Promise<{ script: string, extension: string }> {
  for (const ext of ['ts', 'js']) {
    try {
      const script = await useStorage('assets:content').getItem(`${year}/day${day}/script.${ext}`)
      if (script) {
        return { script: script as string, extension: ext }
      }
    } catch (error) {
      console.log(error)
    }
  }
  throw new Error('Script file not found')
}

export default defineEventHandler(async (event) => {
  const year = getRouterParam(event, 'year')
  const day = getRouterParam(event, 'day')

  if (!year || !['2024', '2025'].includes(year)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid year'
    })
  }

  if (!day || !/^\d+$/.test(day)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid day'
    })
  }

  try {
    const readme = await useStorage('assets:content').getItem(`${year}/day${day}/readme.md`)
    const { script, extension } = await readScriptFile(year, day)

    if (!readme) {
      throw new Error('Readme not found')
    }

    return {
      year,
      day: parseInt(day),
      readme: readme as string,
      script,
      language: extension === 'ts' ? 'typescript' : 'javascript'
    }
  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: 404,
      statusMessage: 'Exercise not found'
    })
  }
})
