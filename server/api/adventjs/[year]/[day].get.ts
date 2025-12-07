import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

async function readScriptFile(baseDir: string): Promise<{ script: string; extension: string }> {
  for (const ext of ['ts', 'js']) {
    try {
      const script = await readFile(join(baseDir, `script.${ext}`), 'utf-8')
      return { script, extension: ext }
    } catch {
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

  const dayFolder = `day${day}`
  const baseDir = join(process.cwd(), 'content', year, dayFolder)

  try {
    const readme = await readFile(join(baseDir, 'readme.md'), 'utf-8')
    const { script, extension } = await readScriptFile(baseDir)

    return {
      year,
      day: parseInt(day),
      readme,
      script,
      language: extension === 'ts' ? 'typescript' : 'javascript'
    }
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Exercise not found'
    })
  }
})
