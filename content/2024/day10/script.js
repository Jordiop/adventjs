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
