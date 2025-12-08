---
navigation:
  order: 10
---

# Dia 10: Intérprete de ensamblador mágico

Los elfos programadores están creando un pequeño ensamblador mágico para controlar las máquinas del taller de Santa Claus.

Para ayudarles, vamos a implementar un intérprete sencillo que soporte las siguientes instrucciones mágicas:

    MOV x y: Copia el valor x (puede ser un número o el contenido de un registro) en el registro y
    INC x: Incrementa en 1 el contenido del registro x
    DEC x: Decrementa en 1 el contenido del registro x
    JMP x y: Si el valor del registro x es 0 entonces salta a la instrucción en el índice y y sigue ejecutándose el programa desde ahí.

Comportamiento esperado:

    Si se intenta acceder, incrementar o decrementar a un registro que no ha sido inicializado, se tomará el valor 0 por defecto.
    El salto con JMP es absoluto y lleva al índice exacto indicado por y.
    Al finalizar, el programa debe devolver el contenido del registro A. Si A no tenía un valor definido, retorna undefined.

```js
const instructions = [
  'MOV -1 C', // copia -1 al registro 'C',
  'INC C', // incrementa el valor del registro 'C'
  'JMP C 1', // salta a la instrucción en el índice 1 si 'C' es 0
  'MOV C A', // copia el registro 'C' al registro 'a',
  'INC A' // incrementa el valor del registro 'a'
]

compile(instructions) // -> 2

/**
 Ejecución paso a paso:
 0: MOV -1 C -> El registro C recibe el valor -1
 1: INC C    -> El registro C pasa a ser 0
 2: JMP C 1  -> C es 0, salta a la instrucción en el índice 1
 1: INC C    -> El registro C pasa a ser 1
 2: JMP C 1  -> C es 1, ignoramos la instrucción
 3: MOV C A  -> Copiamos el registro C en A. Ahora A es 1
 4: INC A    -> El registro A pasa a ser 2
 */
```

## Solution

```javascript
function compile(instructions) {
  const registers = {}
  for (let pointer = 0; pointer < instructions.length; pointer++) {
    const [command, arg1, arg2] = instructions[pointer].split(' ')
    switch (command) {
      case 'MOV':
        registers[arg2] = isNaN(arg1) ? (registers[arg1] || 0) : parseInt(arg1, 10)
        break
      case 'INC':
        registers[arg1] = (registers[arg1] || 0) + 1
        break
      case 'DEC':
        registers[arg1] = (registers[arg1] || 0) - 1
        break
      case 'JMP':
        if ((registers[arg1] || 0) === 0) {
          pointer = parseInt(arg2, 10) - 1
        }
        break
      default:
        throw new Error(`Unknown instruction: ${command}`)
    }
  }
  return registers['A']
}

compile([
  'MOV 5 A',
  'INC A',
  'DEC A',
  'DEC A',
  'JMP A 2',
  'INC A'
])
```
