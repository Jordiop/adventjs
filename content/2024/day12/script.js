function calculatePrice(ornaments) {
    const values = {
      '*': 1,    // Copo de nieve
      'o': 5,    // Bola de Navidad
      '^': 10,   // Arbolito decorativo
      '#': 50,   // Guirnalda brillante
      '@': 100,  // Estrella polar
    };
  
    let total = 0;
  
    for (let i = 0; i < ornaments.length; i++) {
      const current = ornaments[i];
      const next = ornaments[i + 1];
  
      if (!values.hasOwnProperty(current)) return undefined;
      
      if (next && values[current] < values[next]) total -= values[current];
      else total += values[current];
    }
  
    return total;
  }
  