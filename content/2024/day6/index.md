---
navigation:
  order: 6
---

# Dia 6: Verificación de regalos en la caja

Ya hemos empaquetado cientos de regalos 🎁… pero a un elfo se le ha olvidado revisar si el regalo, representado por un asterisco *, está dentro de la caja.

La caja tiene un regalo (*) y cuenta como dentro de la caja si:

- Está rodeada por # en los bordes de la caja.
- El * no está en los bordes de la caja.

Ten en cuenta entonces que el * puede estar dentro, fuera o incluso no estar. Y debemos devolver true si el * está dentro de la caja y false en caso contrario.

Ejemplos:

```javascript
inBox([
  "###",
  "#*#",
  "###"
]) // ➞ true

inBox([
  "####",
  "#* #",
  "#  #",
  "####"
]) // ➞ true

inBox([
  "*####",
  "#   #",
  "#  #*",
  "####"
]) // ➞ false

inBox([
  "#####",
  "#   #",
  "#   #",
  "#   #",
  "#####"
]) // ➞ false
```

## Solution

```javascript
function inBox(box) {
  for (let i = 1; i < box.length - 1; i++) {
    const row = box[i]
    const starIndex = row.indexOf('*')
    if (starIndex > 0 && starIndex < row.length - 1) {
      return true
    }
  }
  return false
}

inBox([
  '*****',
  '*   *',
  '* * *',
  '*   *',
  '*****'
])
```
