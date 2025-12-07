/**
 * @typedef {Record<string, number>} GiftsCount
 */

/**
 * @typedef {{ missing: GiftsCount, extra: GiftsCount }} Result
 */

/**
 * @param {string[]} received
 * @param {string[]} expected
 * @returns {Result}
 */
function fixGiftList(received, expected) {
  function createFrequencyCounter(arr) {
    return arr.reduce((counter, item) => {
      counter[item] = (counter[item] || 0) + 1
      return counter
    }, {})
  }

  const receivedCount = createFrequencyCounter(received)
  const expectedCount = createFrequencyCounter(expected)

  const missing = {}
  const extra = {}

  for (const gift in expectedCount) {
    const diff = expectedCount[gift] - (receivedCount[gift] || 0)
    if (diff > 0) {
      missing[gift] = diff
    }
  }

  for (const gift in receivedCount) {
    const diff = receivedCount[gift] - (expectedCount[gift] || 0)
    if (diff > 0) {
      extra[gift] = diff
    }
  }

  return { missing, extra }
}

fixGiftList(
  ['doll', 'car', 'doll', 'puzzle'],
  ['doll', 'car', 'puzzle', 'puzzle', 'teddy']
)
