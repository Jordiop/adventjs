# Ejercicio: Mover el reno robot aspirador

Los elfos han construido un reno 🦌 robot aspirador (@) para limpiar un poco el taller de cara a las navidades.

El reno se mueve sobre un tablero para recoger cosas del suelo (*) y debe evitar obstáculos (#).

Recibirás dos parámetros:

board: un string que representa el tablero.
moves: un string con los movimientos: 'L' (izquierda), 'R' (derecha), 'U' (arriba), 'D' (abajo).
Reglas del movimiento:

Si el reno se sale del tablero o choca contra un obstáculo (#) → devuelve 'crash'.
Si el reno recoge algo del suelo (*) durante los movimientos → devuelve 'success'.
Si el reno no recoge nada ni se estrella → devuelve 'fail'.
Importante: Ten en cuenta que en el board la primera y última línea están en blanco y deben descartarse.

Ejemplo:

```typescript
const board = `
.....
.*#.*
.@...
.....
`

moveReno(board, 'D')
// ➞ 'fail' -> se mueve pero no recoge nada

moveReno(board, 'U')
// ➞ 'success' -> recoge algo (*) justo encima

moveReno(board, 'RU')
// ➞ 'crash' -> choca contra un obstáculo (#)

moveReno(board, 'RRRUU')
// ➞ 'success' -> recoge algo (*)

moveReno(board, 'DD')
// ➞ 'crash' -> se choca con la parte de abajo del tablero

moveReno(board, 'UUU')
// ➞ 'success' -> recoge algo del suelo (*) y luego se choca por arriba

moveReno(board, 'RR')
// ➞ 'fail' -> se mueve pero no recoge nada
```

## Solution

```typescript

// FIRST VERSION (7/8 stars)
type Board = string
type Moves = string
type Result = 'fail' | 'crash' | 'success'

function moveReno(board: Board, moves: Moves): Result {

  const lines = board.split('\n').slice(1, -1)
  
  let position: [number, number] = [0, 0]
  for (let y = 0; y < lines.length; y++) {
    const x = lines[y].indexOf('@')
    if (x !== -1) {
      position = [x, y]
      break
    }
  }

  for (const move of moves) {
    let [x, y] = position

    if (move === 'L') x -= 1
    if (move === 'R') x += 1
    if (move === 'U') y -= 1
    if (move === 'D') y += 1

    if (y < 0 || y >= lines.length || x < 0 || x >= lines[0].length) {
      return 'crash'
    }

    const cell = lines[y][x]

    if (cell === '#') return 'crash'
    
    if (cell === '*') return 'success'

    position = [x, y]
  }

  return 'fail'
}

// SECOND VERSION (8/8 stars) (adventjs wanted auxiliary functions instead of all in one)
type Board = string
type Moves = string
type Result = 'fail' | 'crash' | 'success'

function moveReno(board: Board, moves: Moves): Result {
  const lines = board.split('\n').slice(1, -1)
  
  function findRenoPosition(): [number, number] {
    for (let y = 0; y < lines.length; y++) {
      const x = lines[y].indexOf('@')
      if (x !== -1) return [x, y]
    }
    return [0, 0]
  }

  function getNewPosition([x, y]: [number, number], move: string): [number, number] {
    const moves: Record<string, [number, number]> = {
      'L': [x - 1, y],
      'R': [x + 1, y],
      'U': [x, y - 1],
      'D': [x, y + 1]
    }
    return moves[move] || [x, y]
  }

  function checkPosition([x, y]: [number, number]): Result | null {
    if (y < 0 || y >= lines.length || x < 0 || x >= lines[0].length) {
      return 'crash'
    }

    const cell = lines[y][x]
    
    if (cell === '#') return 'crash'
    if (cell === '*') return 'success'
    
    return null 
  }

  let position = findRenoPosition()

  for (const move of moves) {
    const newPosition = getNewPosition(position, move)
    const result = checkPosition(newPosition)
    
    if (result !== null) return result
    
    position = newPosition
  }

  return 'fail'
}

```