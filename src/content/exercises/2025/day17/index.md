# Ejercicio: ¿Hay 4 luces seguidas?

En el Polo Norte han montado un panel de luces navideñas 🎄✨ para decorar el taller. Cada luz puede estar encendida con un color o apagada.

El panel se representa como una matriz donde cada celda puede ser:

'.' → luz apagada
'R' → luz roja
'G' → luz verde
Los elfos quieren saber si en el panel existe una línea de 4 luces del mismo color encendidas y alineadas (solo horizontal ↔ o vertical ↕). Las luces apagadas ('.') no cuentan.

hasFourLights([
  ['.', '.', '.', '.', '.'],
  ['R', 'R', 'R', 'R', '.'],
  ['G', 'G', '.', '.', '.']
])
// true → hay 4 luces rojas en horizontal

```ts
hasFourLights([
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.']
])
// true → hay 4 luces verdes en vertical

hasFourLights([
  ['R', 'G', 'R'],
  ['G', 'R', 'G'],
  ['G', 'R', 'G']
])
```
// false → no hay 4 luces del mismo color seguidas
Nota: El tablero puede ser de cualquier tamaño. No hay diagonales.

## Solución

```typescript
function hasFourLights(board: string[][]): boolean {
  if (board.length === 0) return false;
  
  const rows = board.length;
  const cols = board[0].length;
  
  // Verificar horizontales
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j <= cols - 4; j++) {
      const color = board[i][j];
      if (color !== '.' && 
          color === board[i][j + 1] && 
          color === board[i][j + 2] && 
          color === board[i][j + 3]) {
        return true;
      }
    }
  }
  
  // Verificar verticales
  for (let i = 0; i <= rows - 4; i++) {
    for (let j = 0; j < cols; j++) {
      const color = board[i][j];
      if (color !== '.' && 
          color === board[i + 1][j] && 
          color === board[i + 2][j] && 
          color === board[i + 3][j]) {
        return true;
      }
    }
  }
  
  return false;
}
```
