function moveTrain(board, mov) {
  const rows = board.length
  const cols = board[0].length
  let headRow, headCol
  board.some((row, i) => {
    const col = row.indexOf('@')
    if (col !== -1) {
      headRow = i
      headCol = col
      return true
    }
    return false
  })

  const direction = {
    L: [0, -1],
    R: [0, 1],
    U: [-1, 0],
    D: [1, 0]
  }
  const [dRow, dCol] = direction[mov]
  const newRow = headRow + dRow
  const newCol = headCol + dCol

  if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
    return 'crash'
  }

  const newCell = board[newRow][newCol]

  if (newCell === '@' || newCell === 'o') {
    return 'crash'
  }

  const result = newCell === '*' ? 'eat' : 'none'

  const newBoard = board.map(row => row.split(''))
  newBoard[headRow][headCol] = 'o'
  newBoard[newRow][newCol] = '@'

  if (result === 'none') {
    const flatIndex = board.flat().lastIndexOf('o')
    if (flatIndex !== -1) {
      const lastRow = Math.floor(flatIndex / cols)
      const lastCol = flatIndex % cols
      board[lastRow][lastCol] = '·'
    }
  }

  for (let i = 0; i < rows; i++) {
    board[i] = newBoard[i].join('')
  }

  return result
}

moveTrain([
  '·····',
  '··@··',
  '··*··',
  '·····',
  '·····'
], 'D')
