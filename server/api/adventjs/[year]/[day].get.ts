import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

async function readScriptFile(year: string, day: string): Promise<{ script: string, extension: string }> {
  // Try server assets first (for production)
  for (const ext of ['ts', 'js']) {
    try {
      const script = await useStorage('assets:content').getItem(`${year}/day${day}/script.${ext}`)
      if (script) {
        return { script: script as string, extension: ext }
      }
    } catch (error) {
      // Silently continue to next extension or fallback
      console.log('Server assets script file not found, falling back to filesystem')
      console.log(error)
    }
  }

  // Fallback to filesystem (for development)
  const baseDir = join(process.cwd(), 'content', year, `day${day}`)
  for (const ext of ['ts', 'js']) {
    try {
      const script = await readFile(join(baseDir, `script.${ext}`), 'utf-8')
      return { script, extension: ext }
    } catch (error) {
      // Continue to next extension
      console.log('Server assets script file not found, falling back to filesystem')
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
    let readme: string | null = null

    // Try server assets first (for production)
    try {
      const readmeContent = await useStorage('assets:content').getItem(`${year}/day${day}/readme.md`)
      if (readmeContent) {
        readme = readmeContent as string
      }
    } catch (storageError) {
      // Fallback to filesystem
      const baseDir = join(process.cwd(), 'content', year, `day${day}`)
      readme = await readFile(join(baseDir, 'readme.md'), 'utf-8')
      console.log('Server assets readme not found, falling back to filesystem')
      console.log(storageError)
    }

    const { script, extension } = await readScriptFile(year, day)

    if (!readme) {
      throw new Error('Readme not found')
    }

    return {
      year,
      day: parseInt(day),
      readme,
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
