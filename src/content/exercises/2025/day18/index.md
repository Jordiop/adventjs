# Ejercicio: ¿Hay 4 luces seguidas en cualquier dirección?

El panel de luces navideñas 🎄✨ del taller ha sido un éxito total. Pero los elfos quieren ir un paso más allá: ahora quieren detectar si hay una línea de 4 luces del mismo color también en diagonal.

El panel sigue siendo una matriz donde cada celda puede ser:

'.' → luz apagada
'R' → luz roja
'G' → luz verde
Ahora tu función debe devolver true si existe una línea de 4 luces del mismo color encendidas y alineadas, ya sea horizontal ↔, vertical ↕ o diagonal ↘↙.

```ts
hasFourInARow([
  ['R', '.', '.', '.'],
  ['.', 'R', '.', '.'],
  ['.', '.', 'R', '.'],
  ['.', '.', '.', 'R']
])
// true → hay 4 luces rojas en diagonal ↘

hasFourInARow([
  ['.', '.', '.', 'G'],
  ['.', '.', 'G', '.'],
  ['.', 'G', '.', '.'],
  ['G', '.', '.', '.']
])
// true → hay 4 luces verdes en diagonal ↙

hasFourInARow([
  ['R', 'R', 'R', 'R'],
  ['G', 'G', '.', '.'],
  ['.', '.', '.', '.'],
  ['.', '.', '.', '.']
])
// true → hay 4 luces rojas en horizontal

hasFourInARow([
  ['R', 'G', 'R'],
  ['G', 'R', 'G'],
  ['G', 'R', 'G']
])
```
// false → no hay 4 luces del mismo color seguidas
Nota: El tablero puede ser de cualquier tamaño.

## Solución

```typescript
function hasFourInARow(board: string[][]): boolean {
  if (board.length === 0) return false;
  
  const rows = board.length;
  const cols = board[0].length;
  
  const directions = [
    [0, 1],   // Horizontal 
    [1, 0],   // Vertical   
    [1, 1],   // Diagonal
    [1, -1]   // Diagonal
  ];
  
  const checkLine = (row: number, col: number, dRow: number, dCol: number): boolean => {
    const color = board[row][col];
    if (color === '.') return false;
    
    for (let k = 1; k < 4; k++) {
      const newRow = row + k * dRow;
      const newCol = col + k * dCol;
      
      if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
        return false;
      }
      
      if (board[newRow][newCol] !== color) {
        return false;
      }
    }
    
    return true;
  };
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (const [dRow, dCol] of directions) {
        if (checkLine(i, j, dRow, dCol)) {
          return true;
        }
      }
    }
  }
  
  return false;
}
```