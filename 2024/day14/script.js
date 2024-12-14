function minMovesToStables(reindeer, stables) {
    reindeer.sort((a, b) => a - b);
    stables.sort((a, b) => a - b);
    let totalMoves = 0;
    for (let i = 0; i < reindeer.length; i++) {
        totalMoves += Math.abs(reindeer[i] - stables[i]);
    }  
    return totalMoves;
}