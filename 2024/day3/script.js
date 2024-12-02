function organizeInventory(inventory) {
    return inventory.reduce((acc, { name, quantity, category }) => {
        if (!acc[category]) acc[category] = {};
        if (!acc[category][name]) acc[category][name] = 0;
        acc[category][name] += quantity;
        return acc;
    }, {});
}
