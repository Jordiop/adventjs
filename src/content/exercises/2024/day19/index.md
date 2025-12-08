---
navigation:
  order: 19
---

# Dia 19: Apilar cajas de regalos

¡Se acerca el día para repartir regalos! Necesitamos apilar los regalos que transportaremos en el trineo 🛷 y para eso los vamos a meter en cajas 📦.

Los regalos se pueden meter en 4 cajas distintas, donde cada caja soporta 1, 2, 5, 10 de peso y se representan así:

```js
    _
1: |_|
    _____
2: |_____|
    _____
5: |     |
   |_____|
     _________
10: |         |
    |_________|

// Representación en JavaScript:
const boxRepresentations = {
  1: [" _ ", "|_|"] ,
  2: [" ___ ", "|___|"],
  5: [" _____ ", "|     |", "|_____|"],
  10: [" _________ ", "|         |", "|_________|"]
}
```

Tu misión es que al recibir el peso de los regalos, uses las mínimas cajas posibles y que, además, las apiles de menos peso (arriba) a más peso (abajo). Siempre alineadas a la izquierda.

Además, ten en cuenta que al apilarlas, se reusa el borde inferior de la caja.

```js
distributeWeight(1)
// Devuelve:
//  _
// |_|

distributeWeight(2)
// Devuelve:
//  ___
// |___|

distributeWeight(3)
// Devuelve:
//  _
// |_|_
// |___|

distributeWeight(4)
// Devuelve:
//  ___
// |___|
// |___|

distributeWeight(5)
// Devuelve:
//  _____
// |     |
// |_____|

distributeWeight(6)
// Devuelve:
//  _
// |_|___
// |     |
// |_____|
```


Nota: ¡Ten cuidado con los espacios en blanco! No añadas espacios en blanco a la derecha de una caja si no son necesarios.

## Solution

```javascript
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
```
