function organizeShoes(shoes) {
    const counts = {};
  
    for (const shoe of shoes) {
      const { type, size } = shoe;
      if (!counts[size]) counts[size] = { I: 0, R: 0 };
      counts[size][type]++;
    }
  
    const result = [];
    
    for (const size in counts) {
      const pairs = Math.min(counts[size].I, counts[size].R);
      for (let i = 0; i < pairs; i++) {
        result.push(Number(size));
      }
    }
  
    return result;
  }
  