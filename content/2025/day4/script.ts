/**
 * @param {string} code - The code to decipher
 * @returns {string} The deciphered PIN
 */
function decodeSantaPin(code: string): string | null {
  if (!code || code.length <= 2) return null

  const code_array = code.match(/[^[\]]+/g);
  if (!code_array || code_array.length < 4) return null;
  
  let lock = ""
  
  for (const fragment of code_array) {
    if (fragment === "<") {
      if (lock.length === 0) return null
      lock += lock[lock.length - 1]
      continue
    }
    
    let number = parseInt(fragment[0])
    if (isNaN(number)) return null
    
    for (let i = 1; i < fragment.length; i++) {
      if (fragment[i] === "+") {
        number = (number + 1) % 10
      } else if (fragment[i] === "-") {
        number = (number - 1 + 10) % 10
      }
    }
    
    lock += number.toString()
  }
  
  return lock.length === 4 ? lock : null
}