# Regalos sin vigilancia

El grinch quiere robar los regalos de Navidad del almacén. Para ello necesita saber qué regalos no tienen vigilancia.

El almacén se representa como un array de strings (string[]), donde cada regalo (*) está protegido si su posición está junto a una cámara (#). Cada espacio vacío se representa con un punto (.).

Tu tarea es contar cuántos regalos están sin vigilancia, es decir, que no tienen ninguna cámara adyacente (arriba, abajo, izquierda o derecha).

Ten en cuenta: solo se considera como "adyacente" las 4 direcciones cardinales, no en diagonal.

Los regalos en las esquinas o bordes pueden estar sin vigilancia, siempre que no tengan cámaras directamente al lado.

```typescript
findUnsafeGifts([
  '.*.',
  '*#*',
  '.*.'
]) // ➞ 0

// Todos los regalos están junto a una cámara

findUnsafeGifts([
  '...',
  '.*.',
  '...'
]) // ➞ 1

// Este regalo no tiene cámaras alrededor

findUnsafeGifts([
  '*.*',
  '...',
  '*#*'
]) // ➞ 2
// Los regalos en las esquinas superiores no tienen cámaras alrededor

findUnsafeGifts([
  '.....',
  '.*.*.',
  '..#..',
  '.*.*.',
  '.....'
]) // ➞ 4

// Los cuatro regalos no tienen cámaras, porque están en diagonal a la cámara
```

# Solution

```typescript
function findUnsafeGifts(warehouse: string[]): number {
  const rows = warehouse.length;
  const cols = warehouse[0].length;
  let unsafeCount = 0;
  
  const directions: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (warehouse[row][col] === '*') {
        let hasCameraAdjacent = false;
        
        for (const [dx, dy] of directions) {
          const newRow = row + dx;
          const newCol = col + dy;
          
          if (newRow >= 0 && newRow < rows && 
              newCol >= 0 && newCol < cols) {
            if (warehouse[newRow][newCol] === '#') {
              hasCameraAdjacent = true;
              break;
            }
          }
        }
        
        if (!hasCameraAdjacent) {
          unsafeCount++;
        }
      }
    }
  }
  
  return unsafeCount;
}
```