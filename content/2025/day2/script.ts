function manufactureGifts(
  giftsToProduce: Array<{ toy: string, quantity: number }>
): string[] {
  return giftsToProduce.flatMap(gift => Array(Math.max(0, gift.quantity)).fill(gift.toy))
}

manufactureGifts([
  { toy: 'doll', quantity: 2 },
  { toy: 'car', quantity: 3 },
  { toy: 'puzzle', quantity: 0 }
])
