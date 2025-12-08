---
navigation:
  order: 9
---

# Dia 9: Tren mágico de frutas

Los elfos están jugando con un tren 🚂 mágico que transporta regalos. Este tren se mueve en un tablero representado por un array de strings.

El tren está compuesto por una locomotora (@), seguida de sus vagones (o), y debe recoger frutas mágicas (*) que le sirve de combustible. El movimiento del tren sigue las siguientes reglas:

Recibirás dos parámetros board y mov.

board es un array de strings que representa el tablero:

    @ es la locomotora del tren.
    o son los vagones del tren.
    * es una fruta mágica.
    · son espacios vacíos.

mov es un string que indica el próximo movimiento del tren desde la cabeza del tren @:

    'L': izquierda
    'R': derecha
    'U': arriba
    'D': abajo.

Con esta información, debes devolver una cadena de texto:

    'crash': Si el tren choca contra los bordes del tablero o contra sí mismo.
    'eat': Si el tren recoge una fruta mágica (*).
    'none': Si avanza sin chocar ni recoger ninguna fruta mágica.

Ejemplo:

```js
const board = ['·····', '*····', '@····', 'o····', 'o····']

console.log(moveTrain(board, 'U'))
// ➞ 'eat'
// Porque el tren se mueve hacia arriba y encuentra una fruta mágica

console.log(moveTrain(board, 'D'))
// ➞ 'crash'
// El tren se mueve hacia abajo y la cabeza se choca consigo mismo

console.log(moveTrain(board, 'L'))
// ➞ 'crash'
// El tren se mueve a la izquierda y se choca contra la pared

console.log(moveTrain(board, 'R'))
// ➞ 'none'
// El tren se mueve hacia derecha y hay un espacio vacío en la derecha
```

## Solution

```javascript
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
```
