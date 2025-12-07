function drawRace(indices, length) {
    return indices.map((index, i) => {
        const lane = '~'.repeat(length).split('');
        const position = index > 0 ? index : (index < 0 ? length + index : -1);
        lane[position] = 'r';
        return ' '.repeat(indices.length - i - 1) + lane.join('') + ` /${i + 1}`;
    }).join('\n');
}