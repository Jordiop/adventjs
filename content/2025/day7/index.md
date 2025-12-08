# Dia 7: Decorar el árbol de Navidad

¡Es hora de decorar el árbol de Navidad 🎄! Escribe una función que reciba:

height → la altura del árbol (número de filas).
ornament → el carácter del adorno (por ejemplo, "o" o "@").
frequency → cada cuántas posiciones de asterisco aparece el adorno.
El árbol se dibuja con asteriscos *, pero cada frequency posiciones, el asterisco se reemplaza por el adorno.

El conteo de posiciones empieza en 1, desde la copa hasta la base, de izquierda a derecha. Si frequency es 2, los adornos aparecen en las posiciones 2, 4, 6, etc.

El árbol debe estar centrado y tener un tronco # de una línea al final.

🧩 Ejemplos
drawTree(5, 'o', 2)
//     *
//    o*o
//   *o*o*
//  o*o*o*o
// *o*o*o*o*
//     #

drawTree(3, '@', 3)
//   *
//  *@*
// *@**@
//   #

drawTree(4, '+', 1)
//    +
//   +++
//  +++++
// +++++++
//    #

## Solution

```typescript
function drawTree(height: number, ornament: string, frequency: number): string {
  let result = '';
  let position = 1;
  
  for (let row = 1; row <= height; row++) {
    const spaces = ' '.repeat(height - row);
    
    const elements = 2 * row - 1;
    
    let line = '';
    for (let i = 0; i < elements; i++) {
      if (position % frequency === 0) {
        line += ornament;
      } else {
        line += '*';
      }
      position++;
    }
    
    result += spaces + line + '\n';
  }
  
  result += ' '.repeat(height - 1) + '#';
  
  return result;
}
drawTree(5, 'o', 2)
```