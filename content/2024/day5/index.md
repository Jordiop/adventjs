---
navigation:
  order: 5
---

# Dia 5: Organización de botas mágicas

Santa Claus's elves 🧝🧝‍♂️ have found a bunch of mismatched magic boots in the workshop. Each boot is described by two values:

- type indicates if it's a left boot (I) or a right boot (R).
- size indicates the size of the boot.

Your task is to help the elves pair all the boots of the same size having a left and a right one. To do this, you should return a list of the available sizes after pairing the boots.

```javascript
const shoes = [
  { type: 'I', size: 38 },
  { type: 'R', size: 38 },
  { type: 'R', size: 42 },
  { type: 'I', size: 41 },
  { type: 'I', size: 42 }
]

organizeShoes(shoes)
// [38, 42]

const shoes2 = [
  { type: 'I', size: 38 },
  { type: 'R', size: 38 },
  { type: 'I', size: 38 },
  { type: 'I', size: 38 },
  { type: 'R', size: 38 }
]
// [38, 38]

const shoes3 = [
  { type: 'I', size: 38 },
  { type: 'R', size: 36 },
  { type: 'R', size: 42 },
  { type: 'I', size: 41 },
  { type: 'I', size: 42 }
]

organizeShoes(shoes3)
// []
```

## Solution

```javascript
function organizeShoes(shoes) {
  const counts = {}

  for (const shoe of shoes) {
    const { type, size } = shoe
    if (!counts[size]) counts[size] = { I: 0, R: 0 }
    counts[size][type]++
  }

  const result = []

  for (const size in counts) {
    const pairs = Math.min(counts[size].I, counts[size].R)
    for (let i = 0; i < pairs; i++) {
      result.push(Number(size))
    }
  }

  return result
}

organizeShoes([
  { type: 'I', size: 38 },
  { type: 'R', size: 38 },
  { type: 'I', size: 40 },
  { type: 'I', size: 39 },
  { type: 'R', size: 39 },
  { type: 'R', size: 39 }
])
```
