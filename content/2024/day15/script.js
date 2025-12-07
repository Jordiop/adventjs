function drawTable(data) {
  const headers = Object.keys(data[0])
  const columnWidths = headers.map(header =>
    Math.max(header.length, ...data.map(row => String(row[header]).length))
  )

  const createLine = () =>
    '+-' + columnWidths.map(width => '-'.repeat(width)).join('-+-') + '-+'

  const createRow = rowData =>
    '| ' + rowData.map((cell, i) => cell.padEnd(columnWidths[i], ' ')).join(' | ') + ' |'

  const headerRow = createRow(headers.map(header => header.charAt(0).toUpperCase() + header.slice(1)))
  const dataRows = data.map(row => createRow(headers.map(header => String(row[header]))))

  return [
    createLine(),
    headerRow,
    createLine(),
    ...dataRows,
    createLine()
  ].join('\n')
}

console.log(drawTable([
  { name: 'Alice', city: 'London' },
  { name: 'Bob', city: 'Paris' },
  { name: 'Charlie', city: 'New York' }
]))

console.log(drawTable([
  { gift: 'Doll', quantity: 10 },
  { gift: 'Book', quantity: 5 },
  { gift: 'Music CD', quantity: 1 }
]))
