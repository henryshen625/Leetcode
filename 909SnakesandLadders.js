/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function(board) {
    const n = board.length;
    const vis = new Array(n * n + 1).fill(0);

    const queue = [[1, 0]];
    while (queue.length) {
        const p = queue.shift();
        for (let i = 1; i <= 6; i++) {
            let nextStep = p[0] + i;
            if (nextStep > n * n) break;
            const rc = id2rc(nextStep, n);
            if (board[rc[0]][rc[1]] > 0) {
                nextStep = board[rc[0]][rc[1]];
            }
            if (nextStep === n * n) {
                return p[1] + 1;
            }
            if (!vis[nextStep]) {
                vis[nextStep] = true;
                queue.push([nextStep, p[1] + 1]);
            }
        }
    }
    return - 1;
};

const id2rc = (idx, n) => {
    let r = Math.floor((idx - 1) / n), c = (idx - 1) % n;
    if (r % 2 === 1) c = n - 1 - c;
    return [n - 1 - r, c];
}