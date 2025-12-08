---
navigation:
  order: 6
---

# Dia 6: Emparejar guantes mágicos

En el taller de Santa, los elfos han encontrado una montaña de guantes mágicos totalmente desordenados. Cada guante viene descrito por dos valores:

hand: indica si es un guante izquierdo (L) o derecho (R)
color: el color del guante (string)
Tu tarea es ayudarles a emparejar guantes: Un par válido es un guante izquierdo y uno derecho del mismo color.

Debes devolver una lista con los colores de todos los pares encontrados. Ten en cuenta que puede haber varios pares del mismo color.

🧩 Ejemplos

```ts
const gloves = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' },
  { hand: 'L', color: 'green' }
]

matchGloves(gloves)
// ["red", "green"]

const gloves2 = [
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' }
]

matchGloves(gloves2)
// ["gold", "gold"]

const gloves3 = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' }
]

matchGloves(gloves3)
// []
```

## Solution

```typescript
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
```