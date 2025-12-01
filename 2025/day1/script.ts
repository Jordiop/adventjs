function filterGifts(gifts: string[]): string[] {
  return gifts?.filter((gift: string) => !gift.includes("#")) ?? [];
}
