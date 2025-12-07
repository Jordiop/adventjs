function detectBombs(grid) {
  const rows = grid.length
  const cols = grid[0].length
  const result = Array.from({ length: rows }, () => Array(cols).fill(0))

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ]

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col]) {
        directions.forEach(([dx, dy]) => {
          const newRow = row + dx
          const newCol = col + dy
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            result[newRow][newCol]++
          }
        })
      }
    }
  }

  return result
}

detectBombs([
  [false, true, false],
  [false, false, false],
  [true, false, false]
])
