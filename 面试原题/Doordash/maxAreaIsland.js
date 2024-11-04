function maxAreaOfIsland(grid) {
    let result = 0;
    if (grid.length === 0) {
        return result;
    }
    const m = grid.length;
    const n = grid[0].length;

    const dfs = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n) {
            return 0;
        }
        if (grid[i][j] === 0) {
            return 0;
        }

        grid[i][j] = 0;

        return dfs(i + 1, j) + dfs (i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1) + 1;
    }

    for (let i = 0; i < m; i ++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                result = Math.max(result, dfs(i, j));
            }
        }
    }
    return result;
}

//Follow up: if number if not 1 and 0; find the max island or path

const island = [
    [1,1,1,2,2],
    [6,5,3,3,3],
    [5,5,5,5,1]
];

function maxAreaOfIsland2(grid) {
    let result = 0;
    if (grid.length === 0) {
        return result;
    }
    const m = grid.length;
    const n = grid[0].length;

    const dfs = (i, j, target) => {
        if (i < 0 || i >= m || j < 0 || j >= n) {
            return 0;
        }
        if (grid[i][j] === -1) {
            return 0;
        }
        if (grid[i][j] !== target) {
            return 0;
        }

        grid[i][j] = -1;

        return dfs(i + 1, j, target) + dfs (i - 1, j, target) + dfs(i, j + 1, target) + dfs(i, j - 1, target) + 1;
    }

    for (let i = 0; i < m; i ++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] !== -1) {
                result = Math.max(result, dfs(i, j, grid[i][j]))
            }
        }
    }
    return result;
}

console.log(maxAreaOfIsland2(island));