---
navigation:
  order: 22
---

# Dia 22: Generar combinaciones de juguetes

Santa Claus 🎅 está revisando una lista de juguetes únicos que podría incluir en su bolsa mágica de regalos. Quiere explorar todas las combinaciones posibles de juguetes. Quiere ver todas las combinaciones que realmente contengan al menos un juguete.

Tu tarea es escribir una función que, dado un array de juguetes, devuelva todas las combinaciones posibles.

Importante: Debes devolverlo en el orden que aparecen los juguetes y de combinaciones de 1 a n juguetes.

```js
generateGiftSets(['car', 'doll', 'puzzle'])
// [
//   ['car'],
//   ['doll'],
//   ['puzzle'],
//   ['car', 'doll'],
//   ['car', 'puzzle'],
//   ['doll', 'puzzle'],
//   ['car', 'doll', 'puzzle']
// ]

generateGiftSets(['ball'])
// [
//   ['ball']
// ]

generateGiftSets(['game', 'pc'])
// [
//   ['game'],
//   ['pc'],
//   ['game', 'pc']
// ]
```

Nota: En el array de entrada siempre habrá al menos un juguete y nunca habrá juguetes duplicados.

## Solution

```javascript
/**
 * @param {string[]} gifts - List of unique gifts.
 * @returns {string[][]} - All possible combinations of gifts, sorted by length.
 */
function generateGiftSets(gifts) {
  const combinations = []
  function generateCombinationsOfSize(start, currentCombination, size) {
    if (currentCombination.length === size) {
      combinations.push([...currentCombination])
      return
    }

    for (let i = start; i < gifts.length; i++) {
      currentCombination.push(gifts[i])
      generateCombinationsOfSize(i + 1, currentCombination, size)
      currentCombination.pop()
    }
  }

  for (let size = 1; size <= gifts.length; size++) {
    generateCombinationsOfSize(0, [], size)
  }

  return combinations
}

generateGiftSets(['doll', 'car', 'puzzle'])
```
