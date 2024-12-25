/**
 * @param {string} code - The magical code to execute
 * @returns {number} - The final value after executing the code
 */
function execute(code) {
    let value = 0;
     let position = 0;
     
     while (position < code.length) {
         const instruction = code[position];
         
         switch (instruction) {
             case '>':
                 position++;
                 break;
                 
             case '+':
                 value++;
                 position++;
                 break;
                 
             case '-':
                 value--;
                 position++;
                 break;
                 
             case '[':
                 if (value === 0) {
                     let bracketCount = 1;
                     while (bracketCount > 0) {
                         position++;
                         if (code[position] === '[') bracketCount++;
                         if (code[position] === ']') bracketCount--;
                     }
                 }
                 position++;
                 break;
                 
             case ']':
                 if (value !== 0) {
                     let bracketCount = 1;
                     while (bracketCount > 0) {
                         position--;
                         if (code[position] === ']') bracketCount++;
                         if (code[position] === '[') bracketCount--;
                     }
                 }
                 position++;
                 break;
                 
             case '{':
                 if (value === 0) {
                     let braceCount = 1;
                     while (braceCount > 0) {
                         position++;
                         if (code[position] === '{') braceCount++;
                         if (code[position] === '}') braceCount--;
                     }
                 }
                 position++;
                 break;
                 
             case '}':
                 position++;
                 break;
                 
             default:
                 position++;
                 break;
         }
     }
     
     return value;
 }
   