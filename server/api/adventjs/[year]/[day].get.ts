import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

async function readIndexFile(year: string, day: string): Promise<string> {
  try {
    const content = await useStorage('assets:content').getItem(`${year}/day${day}/index.md`)
    if (content) {
      return content as string
    }
  } catch (error) {
    console.log('Server assets index.md not found, falling back to filesystem')
    console.log(error)
  }

  const baseDir = join(process.cwd(), 'content', year, `day${day}`)
  try {
    return await readFile(join(baseDir, 'index.md'), 'utf-8')
  } catch (error) {
    console.log('Filesystem index.md not found')
    console.log(error)
    throw new Error('Index file not found')
  }
}

function parseIndexContent(content: string): { readme: string, script: string, language: string } {
  const withoutFrontmatter = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')

  const parts = withoutFrontmatter.split(/\r?\n## Solution\r?\n/)
  if (parts.length < 2 || !parts[0] || !parts[1]) {
    throw new Error('Invalid index.md format - missing Solution section')
  }

  const readme = parts[0].trim()
  const solutionSection = parts[1].trim()

  const codeBlockMatch = solutionSection.match(/```(typescript|javascript)\r?\n([\s\S]*?)\r?\n```/)
  if (!codeBlockMatch || !codeBlockMatch[1] || !codeBlockMatch[2]) {
    throw new Error('Invalid index.md format - missing code block')
  }

  const language = codeBlockMatch[1]
  const script = codeBlockMatch[2]

  return {
    readme,
    script,
    language
  }
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
    const indexContent = await readIndexFile(year, day)
    const { readme, script, language } = parseIndexContent(indexContent)

    return {
      year,
      day: parseInt(day),
      readme,
      script,
      language
    }
  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: 404,
      statusMessage: 'Exercise not found'
    })
  }
})
