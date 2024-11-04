function rollDices(n) {
    if (n === 0) return [];
    const result = [];

    function backTracking(combination) {
        if (combination.length === n) {
            result.push([...combination]);
            return;
        }
        for (let index = 1; index < 6; index++) {
            combination.push(index);
            backTracking(combination);
            combination.pop();
        }
    }
    backTracking([]);
    return result;
}

console.log(rollDices(3))