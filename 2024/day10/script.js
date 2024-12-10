function compile(instructions) {
    const registers = {}; 
     let pointer = 0;
     while (pointer < instructions.length) {
         const [command, arg1, arg2] = instructions[pointer].split(' ');
         switch (command) {
             case 'MOV':
                 const value = isNaN(arg1) ? (registers[arg1] || 0) : parseInt(arg1, 10);
                 registers[arg2] = value;
                 break;
             case 'INC':
                 registers[arg1] = (registers[arg1] || 0) + 1;
                 break;
             case 'DEC':
                 registers[arg1] = (registers[arg1] || 0) - 1;
                 break;
             case 'JMP':
                 if ((registers[arg1] || 0) === 0) {
                     pointer = parseInt(arg2, 10);
                     continue; 
                 }
                 break;
             default:
                 throw new Error(`Instrucción desconocida: ${command}`);
         }
         pointer++; 
     }
     return registers['A'];
 }