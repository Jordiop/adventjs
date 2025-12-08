---
navigation:
  order: 25
---

# Dia 25: Lenguaje de programación mágico

¡Ya hemos repartido todos los regalos! De vuelta al taller, ya comienzan los preparativos para el año que viene.

Un elfo genio está creando un lenguaje de programación mágico 🪄, que ayudará a simplificar la entrega de regalos a los niños en 2025.

Los programas siempre empiezan con el valor 0 y el lenguaje es una cadena de texto donde cada caracter representa una instrucción:

    > Se mueve a la siguiente instrucción
    + Incrementa en 1 el valor actual
    - Decrementa en 1 el valor actual
    [ y ]: Bucle. Si el valor actual es 0, salta a la instrucción después de ]. Si no es 0, vuelve a la instrucción después de [
    {y }: Condicional. Si el valor actual es 0, salta a la instrucción después de }. Si no es 0, sigue a la instrucción después de {

Tienes que devolver el valor del programa tras ejecutar todas las instrucciones.

```js
execute('+++') // 3
execute('+--') // -1
execute('>+++[-]') // 0
execute('>>>+{++}') // 3
execute('+{[-]+}+') // 2
execute('{+}{+}{+}') // 0
execute('------[+]++') // 2
execute('-[++{-}]+{++++}') // 5
```

Nota: Un condicional puede tener un bucle dentro y también un bucle puede tener un condicional. Pero nunca se anidan dos bucles o dos condicionales.

## Solution

```javascript
/**
 * @param {string} code - The magical code to execute
 * @returns {number} - The final value after executing the code
 */
function execute(code) {
  let value = 0
  let position = 0

  while (position < code.length) {
    const instruction = code[position]

    switch (instruction) {
      case '>':
        position++
        break

      case '+':
        value++
        position++
        break

      case '-':
        value--
        position++
        break

      case '[':
        if (value === 0) {
          let bracketCount = 1
          while (bracketCount > 0) {
            position++
            if (code[position] === '[') bracketCount++
            if (code[position] === ']') bracketCount--
          }
        }
        position++
        break

      case ']':
        if (value !== 0) {
          let bracketCount = 1
          while (bracketCount > 0) {
            position--
            if (code[position] === ']') bracketCount++
            if (code[position] === '[') bracketCount--
          }
        }
        position++
        break

      case '{':
        if (value === 0) {
          let braceCount = 1
          while (braceCount > 0) {
            position++
            if (code[position] === '{') braceCount++
            if (code[position] === '}') braceCount--
          }
        }
        position++
        break

      case '}':
        position++
        break

      default:
        position++
        break
    }
  }

  return value
}

execute('++>+++[<+>-]{>+<}')
```
