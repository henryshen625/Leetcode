/**
 * 核心思想是：对于任意一个点 (i, j)，机器人只能从它的左边 (i, j-1) 或者上边 (i-1, j) 到达。因此，走到 (i, j) 
 * 的路径总数是从 (i, j-1) 和 (i-1, j) 到达的路径之和。
 */

var uniquePaths = function(m, n) {
    const dp = Array(m).fill().map(() => Array(n).fill(null));
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1;
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[m - 1][n - 1];
};

//空间压缩：
function uniquePaths(m, n) {
    // 初始化一维数组 dp，长度为 n，并初始化为 1
    const dp = Array(n).fill(1);

    // 遍历每一行，从第 1 行开始
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j - 1];
        }
    }

    // 最终 dp[n-1] 是从起点到终点的路径数
    return dp[n - 1];
}

/***
 我们只维护一维数组 dp，其中：dp[j] 表示当前行的第 j 列的路径数。
当遍历到当前行的某一列时，dp[j] 会使用之前的值（即 dp[j] 对应的是上一行的第 j 
列的路径数），同时 dp[j] 会被更新为当前列的值。
dp[j] 原本存储的是上一行第 j 列的值（对应 dp[i-1][j]）。
dp[j-1] 是当前行的前一列的值（对应 dp[i][j-1]）。
 */