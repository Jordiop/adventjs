function filterGifts(gifts: string[]): string[] {
  return gifts?.filter((gift: string) => !gift.includes('#')) ?? []
}

filterGifts(['#toy', 'doll', 'ball', '#puzzle'])
