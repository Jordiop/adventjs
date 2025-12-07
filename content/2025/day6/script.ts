type Glove = { hand: 'L' | 'R', color: string }

function matchGloves(gloves: Glove[]): string[] {
  const counts: Record<string, { L: number, R: number }> = {}

  for (const glove of gloves) {
    const { color, hand } = glove

    if (!counts[color]) {
      counts[color] = { L: 0, R: 0 }
    }

    counts[color][hand]++
  }

  const pairs: string[] = []

  for (const color in counts) {
    const { L, R } = counts[color]
    const pairCount = Math.min(L, R)

    for (let i = 0; i < pairCount; i++) {
      pairs.push(color)
    }
  }

  return pairs
}

matchGloves([
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'red' },
  { hand: 'L', color: 'blue' },
  { hand: 'L', color: 'green' },
  { hand: 'R', color: 'blue' },
  { hand: 'R', color: 'yellow' }
])
