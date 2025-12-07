function prepareGifts(gifts) {
  return [...new Set(gifts)].sort((a, b) => a - b)
}

prepareGifts([5, 3, 2, 3, 1, 5, 4])
