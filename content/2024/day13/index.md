---
navigation:
  order: 13
---

# Dia 13: Robot repartidor de regalos

Los elfos del Polo Norte han creado un robot 🤖 especial que ayuda a Papá Noel a distribuir regalos dentro de un gran almacén. El robot se mueve en un plano 2D y partimos desde el origen (0, 0).

Queremos saber si, tras ejecutar una serie de movimientos, el robot vuelve a estar justo donde empezó.

Las órdenes básicas del robot son:

    L: Mover hacia la izquierda
    R: Mover hacia la derecha
    U: Mover hacia arriba
    D: Mover hacia abajo

Pero también tiene ciertos modificadores para los movimientos:

    *: El movimiento se realiza con el doble de intensidad (ej: *R significa RR)
    !: El siguiente movimiento se invierte (ej: R!L se considera como RR)
    ?: El siguiente movimiento se hace sólo si no se ha hecho antes (ej: R?R significa R)

Nota: Cuando el movimiento se invierte con ! se contabiliza el movimiento invertido y no el original. Por ejemplo, !U?U invierte el movimiento de U, por lo que contabiliza que se hizo el movimiento D pero no el U. Así !U?U se traduce como D?U y, por lo tanto, se haría el movimiento U final.

Debes devolver:

    true: si el robot vuelve a estar justo donde empezó
    [x, y]: si el robot no vuelve a estar justo donde empezó, devolver la posición donde se detuvo

```js
isRobotBack('R')     // [1, 0]
isRobotBack('RL')    // true
isRobotBack('RLUD')  // true
isRobotBack('*RU')   // [2, 1]
isRobotBack('R*U')   // [1, 2]
isRobotBack('LLL!R') // [-4, 0]
isRobotBack('R?R')   // [1, 0]
isRobotBack('U?D')   // true
isRobotBack('R!L')   // [2,0]
isRobotBack('U!D')   // [0,2]
isRobotBack('R?L')   // true
isRobotBack('U?U')   // [0,1]
isRobotBack('*U?U')  // [0,2]
isRobotBack('U?D?U') // true

// Ejemplos paso a paso:
isRobotBack('R!U?U') // [1,0]
// 'R'  -> se mueve a la derecha 
// '!U' -> se invierte y se convierte en 'D'
// '?U' -> se mueve arriba, porque no se ha hecho el movimiento 'U'

isRobotBack('UU!U?D') // [0,1]
// 'U'  -> se mueve arriba
// 'U'  -> se mueve arriba
// '!U' -> se invierte y se convierte en 'D'
// '?D' -> no se mueve, ya que ya se hizo el movimiento 'D'
```

## Solution

```javascript
function isRobotBack(moves) {
  let position = [0, 0]
  let visited = new Set()
  let skipNext = false
  let invertNext = false

  const directionMap = {
    L: [-1, 0],
    R: [1, 0],
    U: [0, 1],
    D: [0, -1]
  }

  for (let i = 0; i < moves.length; i++) {
    const command = moves[i]

    if (skipNext) {
      skipNext = false
      continue
    }

    if (command === '*') {
      if (i + 1 < moves.length && directionMap[moves[i + 1]]) {
        const move = directionMap[moves[i + 1]]
        const effectiveMove = invertNext ? [-move[0], -move[1]] : move
        position[0] += 2 * effectiveMove[0]
        position[1] += 2 * effectiveMove[1]
        visited.add(`${effectiveMove[0]},${effectiveMove[1]}`)
        skipNext = true
        invertNext = false
      }
    } else if (command === '!') {
      invertNext = true
    } else if (command === '?') {
      if (i + 1 < moves.length && directionMap[moves[i + 1]]) {
        const move = moves[i + 1]
        const moveVector = directionMap[move]

        const effectiveMove = invertNext
          ? [-moveVector[0], -moveVector[1]]
          : moveVector

        const effectiveKey = `${effectiveMove[0]},${effectiveMove[1]}`

        if (!visited.has(effectiveKey)) {
          visited.add(effectiveKey)
          position[0] += effectiveMove[0]
          position[1] += effectiveMove[1]
        }
        invertNext = false
        skipNext = true
      }
    } else if (directionMap[command]) {
      let move = directionMap[command]
      if (invertNext) {
        move = [-move[0], -move[1]]
        invertNext = false
      }

      position[0] += move[0]
      position[1] += move[1]

      const moveKey = `${move[0]},${move[1]}`
      visited.add(moveKey)
    }
  }

  return position[0] === 0 && position[1] === 0 ? true : position
}

// Test cases
console.log(isRobotBack('R')) // [1, 0]
console.log(isRobotBack('RL')) // true
console.log(isRobotBack('RLUD')) // true
console.log(isRobotBack('*RU')) // [2, 1]
console.log(isRobotBack('R*U')) // [1, 2]
console.log(isRobotBack('LLL!R')) // [-4, 0]
console.log(isRobotBack('R?R')) // [1, 0]
console.log(isRobotBack('U?D')) // true
console.log(isRobotBack('R!L')) // [2, 0]
console.log(isRobotBack('U!D')) // [0, 2]
console.log(isRobotBack('R?L')) // true
console.log(isRobotBack('U?U')) // [0, 1]
console.log(isRobotBack('*U?U')) // [0, 2]
console.log(isRobotBack('U?D?U')) // true
console.log(isRobotBack('R!U?U')) // [1, 0]
console.log(isRobotBack('UU!U?D')) // [0, 1]
```
