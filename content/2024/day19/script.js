function distributeWeight(weight) {
  const boxes = []
  let remainingWeight = weight
  const boxWeights = [10, 5, 2, 1]
  const boxArt = {
    1: [' _ ', '|_|'],
    2: [' ___ ', '|___|'],
    5: [' _____ ', '|     |', '|_____|'],
    10: [' _________ ', '|         |', '|_________|']
  }

  for (const boxWeight of boxWeights) {
    while (remainingWeight >= boxWeight) {
      boxes.push(boxWeight)
      remainingWeight -= boxWeight
    }
  }
  boxes.reverse()

  if (boxes.length === 0) return ''

  const result = []
  let totalLines = 0

  boxes.forEach((box, i) => {
    totalLines += boxArt[box].length
    if (i < boxes.length - 1) totalLines--
  })

  for (let i = 0; i < totalLines; i++) result.push('')

  let currentLine = 0
  for (let i = 0; i < boxes.length; i++) {
    const currentBox = boxArt[boxes[i]]
    const isLastBox = i === boxes.length - 1

    for (let j = 0; j < currentBox.length; j++) {
      let line = currentBox[j]
      const isFirstLine = j === 0

      if (!isFirstLine) line = line.trimEnd()

      if (result[currentLine].length > 0) {
        const lastEnd = result[currentLine].trimEnd().length
        result[currentLine] = result[currentLine].trimEnd() + line.slice(lastEnd)
      } else {
        result[currentLine] = line
      }

      if (j < currentBox.length - 1 || isLastBox) currentLine++
    }
  }

  for (let i = 1; i < result.length; i++) {
    result[i] = result[i].trimEnd()
  }

  return result.join('\n')
}

// pending optimization

distributeWeight(16)
