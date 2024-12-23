function findInAgenda(agenda, phone) {
    const entries = agenda.split('\n').map(line => {
      const phoneMatch = line.match(/\+\d{1,2}-\d{3}-\d{3}-\d{3}/);
      const phone = phoneMatch ? phoneMatch[0] : '';
      const nameMatch = line.match(/<([^>]+)>/);
      const name = nameMatch ? nameMatch[1] : '';
  
      // regex asked to ai
      let address = line
        .replace(/\+\d{1,2}-\d{3}-\d{3}-\d{3}/, '') 
        .replace(/<[^>]+>/, '') 
        .trim();
  
      return { phone, name, address };
    });
  
    const matches = entries.filter(entry => 
      entry.phone.includes(phone)
    );
  
    if (matches.length !== 1) return null;
    
    return {
      name: matches[0].name,
      address: matches[0].address
    };
  }
    
// pending optimization