function minimumOperationsToMakeEqual(x, y) {
    if (x <= y) return y - x;
    let ans = x - y;
    const vis = Array(x + ans + 1).fill(false);
    let queue = [];
    let step = 0;
    const add = v => {
        if (v < y) {
            ans = Math.min(ans, step + 1 + (y - v));
        } else if (!vis[v]) {
            vis[v] = true;
            queue.push(v)
        }
    }
    add(x);
    
    while (true) {
        const temp = [...queue];
        queue = [];
        for (const v of temp) {
            if (v === y) {
                return Math.min(ans, step);
            }
            if (v % 11 === 0) {
                add(v / 11);
            }
            if (v % 5 === 0) {
                add(v / 5);
            }
            add(v + 1);
            add(v - 1);
        }
        step += 1;
    }
}