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
