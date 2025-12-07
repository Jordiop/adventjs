function createXmasTree(height, ornament) {
  if (height < 1) return ''
  let tree = ''
  const trunk = '_'.repeat(height - 1) + '#' + '_'.repeat(height - 1) + '\n'
  for (let i = 0; i < height; i++) {
    const spaces = '_'.repeat(height - i - 1)
    const decorations = ornament.repeat(2 * i + 1)
    tree += spaces + decorations + spaces + '\n'
  }
  return tree + trunk + trunk.trim()
}

createXmasTree(5, 'o')
