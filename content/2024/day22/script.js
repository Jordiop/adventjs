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
