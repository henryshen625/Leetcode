var combine = function(n, k) {
    const result = [];
    const path = [];
    const backtracking = function(n, k, start) {
        if (path.length === k) {
            result.push([...path]);
            return;
        }
        for (let i = start; i <= n - (k - path.length) + 1; i ++) {
            path.push(i);
            backtracking(n, k, i + 1);
            path.pop();
        }
    }
    backtracking(n, k, 1);
    return result;
};