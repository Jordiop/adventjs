# Recorrido de un regalo en la fábrica

Simula el recorrido de un regalo dentro de una fábrica y devuelve cómo termina. Para ello debes crear una función runFactory(factory).

factory es un string[] donde cada celda puede ser:

> < ^ v movimientos
. salida correcta
Ten en cuenta que todas las filas tienen la misma longitud y que no habrá otros símbolos.

El regalo siempre empieza en la posición (0,0) (arriba a la izquierda). En cada paso lee la celda actual y se mueve según la dirección. Si llega a una celda con un punto (.) significa que ha salido correctamente de la fábrica.

Resultado

Devuelve uno de estos valores:

'completed' si llega a un .
'loop' si visita una posición dos veces
'broken' si sale fuera del tablero
Ejemplos

```typescript
runFactory([
  '>>.'
]) // 'completed'

runFactory([
  '>>>'
]) // 'broken'

runFactory([
  '>><'
]) // 'loop'

runFactory([
  '>>v',
  '..<'
]) // 'completed'

runFactory([
  '>>v',
  '<<<'
]) // 'broken'

runFactory([
  '>v.',
  '^..'
]) // 'completed'

runFactory([
  'v.',
  '^.'
]) // 'loop'
```

```typescript
type Factory = string[]
type Result = 'completed' | 'broken' | 'loop'

function runFactory(factory: Factory): Result {
  const directions: Record<string, [number, number]> = {
    '>': [0, 1],
    '<': [0, -1],
    '^': [-1, 0],
    'v': [1, 0]
  }
  
  const visited = new Set<string>()
  let row = 0
  let col = 0
  
  while (true) {
    const key = `${row},${col}`
    
    if (visited.has(key)) return 'loop'
    visited.add(key)
    
    const cell = factory[row][col]
    
    if (cell === '.') return 'completed'
    
    const [dRow, dCol] = directions[cell]
    row += dRow
    col += dCol
    
    if (row < 0 || row >= factory.length || col < 0 || col >= factory[0].length) {
      return 'broken'
    }
  }
}
```