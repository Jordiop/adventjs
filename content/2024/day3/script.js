function organizeInventory(inventory) {
  return inventory.reduce((acc, { category, name, quantity }) => {
    acc[category] ||= {}
    acc[category][name] = acc[category][name] ||= 0
    acc[category][name] += quantity
    return acc
  }, {})
}

organizeInventory([
  { category: 'toys', name: 'doll', quantity: 3 },
  { category: 'toys', name: 'car', quantity: 5 },
  { category: 'books', name: 'storybook', quantity: 2 },
  { category: 'toys', name: 'doll', quantity: 2 }
])
