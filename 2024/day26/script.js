function getCompleted(timeWorked, totalTime) {
    const getSeconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    const partSeconds = getSeconds(timeWorked);
    const totalSeconds = getSeconds(totalTime);
    
    const gcd = (a, b) => {
        while (b) {
            [a, b] = [b, a % b];
        }
        return a;
    };

    const divisor = gcd(partSeconds, totalSeconds);
    const numerator = partSeconds / divisor;
    const denominator = totalSeconds / divisor;

    return `${Math.round((numerator / denominator) * 100)}%`;
}