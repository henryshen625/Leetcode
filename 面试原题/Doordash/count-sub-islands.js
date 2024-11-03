/** 
At DoorDash, we need to make sure that drivers are available at popular locations to deliver food.
There are certain location clusters in a city that need drivers, and a driver can only cover certain location clusters.
A location cluster is considered “covered” if the driver can deliver for the entire location cluster.
How many location clusters are covered?
*/

var countSubIslands = function(grid1, grid2) {
    let result = 0;
    const m = grid1.length;
    const n = grid1[0].length;
    const dfs = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n) {
            return true;
        }
        if (grid2[i][j] === 0) {
            return true;
        }
        if (grid1[i][j] === 0) {
            return false;
        }
        grid2[i][j] = 0;
        const down = dfs(i + 1, j);
        const up = dfs(i - 1, j);
        const right = dfs(i, j + 1);
        const left = dfs (i, j - 1);
        return down && up && right && left;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid2[i][j] === 1) {
                if (dfs(i, j)) {
                    result++;
                }
            }
        }
    }

    return result;
};

const grid1 = [[1,1,1,0,0], [0,1,1,1,1], [0,0,0,0,0], [1,0,0,1,0], [1,1,0,1,1]];
const grid2 = [[1,1,1,0,0], [0,0,1,1,1], [0,1,0,0,0], [1,0,1,1,0], [0,1,0,1,0]];
console.log(countSubIslands(grid1, grid2));