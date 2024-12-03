function organizeInventory(inventory) {
    return inventory.reduce((acc, { category, name, quantity }) => {
      acc[category] ||= {};
      acc[category][name] = acc[category][name] ||= 0;
      acc[category][name] += quantity;
      return acc;
    }, {});
  }