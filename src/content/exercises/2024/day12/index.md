---
navigation:
  order: 12
---

# Dia 12: Precio de árboles de Navidad

Estás en un mercado muy especial en el que se venden árboles de Navidad 🎄. Cada uno viene decorado con una serie de adornos muy peculiares, y el precio del árbol se determina en función de los adornos que tiene.

    *: Copo de nieve - Valor: 1
    o: Bola de Navidad - Valor: 5
    ^: Arbolito decorativo - Valor: 10
    #: Guirnalda brillante - Valor: 50
    @: Estrella polar - Valor: 100

Normalmente se sumarían todos los valores de los adornos y ya está…

Pero, ¡ojo! Si un adorno se encuentra inmediatamente a la izquierda de otro de mayor valor, en lugar de sumar, se resta su valor.

```js
calculatePrice('***')  // 3   (1 + 1 + 1)
calculatePrice('*o')   // 4   (5 - 1)
calculatePrice('o*')   // 6   (5 + 1)
calculatePrice('*o*')  // 5  (-1 + 5 + 1) 
calculatePrice('**o*') // 6  (1 - 1 + 5 + 1) 
calculatePrice('o***') // 8   (5 + 3)
calculatePrice('*o@')  // 94  (-5 - 1 + 100)
calculatePrice('*#')   // 49  (-1 + 50)
calculatePrice('@@@')  // 300 (100 + 100 + 100)
calculatePrice('#@')   // 50  (-50 + 100)
calculatePrice('#@Z')  // undefined (Z es desconocido)
```

## Solution

```javascript
function calculatePrice(ornaments) {
  const values = {
    '*': 1, // Copo de nieve
    'o': 5, // Bola de Navidad
    '^': 10, // Arbolito decorativo
    '#': 50, // Guirnalda brillante
    '@': 100 // Estrella polar
  }

  let total = 0

  for (let i = 0; i < ornaments.length; i++) {
    const current = ornaments[i]
    const next = ornaments[i + 1]

    if (!Object.hasOwn(values, current)) return undefined

    if (next && values[current] < values[next]) total -= values[current]
    else total += values[current]
  }

  return total
}

calculatePrice('*o^#@')
```
