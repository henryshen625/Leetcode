/**
 * @param {character[][]} grid
 * @return {number}
 */
 var numIslands = function(grid) {
    let result = 0;
    const dfs = function(x, y, grid) {
        if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) return;
        if (grid[x][y] !== "1") {
            return;
        }
        grid[x][y] = "2";
        dfs(x - 1, y, grid);
        dfs(x + 1, y, grid);
        dfs(x, y + 1, grid);
        dfs(x, y - 1, grid);
    }
    for (let i = 0; i < grid.length; i ++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "1") {
                result ++;
                dfs(i, j, grid);
            }
        }
    }
    return result;
};