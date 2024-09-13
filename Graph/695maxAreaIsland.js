function maxAreaOfIsland(grid) {
    let result = 0;
    const m = grid.length;
    const n = grid[0].length;

    const dfs = (x, y) => {
        if (x < 0 || x >= m || y < 0 || y >= n) {
            return 0;
        }
        if (grid[x][y] === 0) {
            return 0;
        }
        grid[x][y] = 0;
        return 1 + dfs(x + 1, y) + dfs(x - 1, y) + dfs(x, y + 1) + dfs(x, y - 1);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                result = Math.max(dfs(i, j), result);
            }
        }
    }

    return result;
}