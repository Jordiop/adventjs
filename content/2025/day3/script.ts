function drawGift(size: number, symbol: string) {
  if (size < 2) {
    return "";
  }
  
  let result = [];
  
  for (let i = 0; i < size; i++) {
    let row = "";
    
    for (let j = 0; j < size; j++) {
      if (i === 0 || i === size - 1) {
        row += symbol;
      }
      else if (j === 0 || j === size - 1) {
        row += symbol;
      }
      else {
        row += " ";
      }
    }
    
    result.push(row);
  }
  
  return result.join("\n");
}