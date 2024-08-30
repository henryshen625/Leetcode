/**
 * @param {character[][]} grid
 * @return {number}
 */
 var numIslands = function(grid) {
    const dir = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const bfs = function(grid, x, y) {
        const queue = [];
        queue.push([x, y]);
        grid[x][y] = "2";
        while (queue.length !== 0) {
            const current = queue.shift();
            for (let i = 0; i < 4; i ++) {
                const nextX = current[0] + dir[i][0];
                const nextY = current[1] + dir[i][1];
                if (nextX < 0 || nextX >= grid.length || nextY < 0 || nextY >= grid[0].length) continue;
                if (grid[nextX][nextY] === "1") {
                    grid[nextX][nextY] = "2";
                    queue.push([nextX, nextY]);
                }
            }
        }
    }
    let res = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "1") {
                res ++;
                bfs(grid, i, j);
            }
        }
    }
    return res;
};