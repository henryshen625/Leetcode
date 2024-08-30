/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
 var exist = function(board, word) {
    const m = board.length, n = board[0].length;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let result = false; // 全局变量，跟踪是否找到单词

    const dfs = function(row, col, index) {
        if (row < 0 || row >= m || col < 0 || col >= n || board[row][col] !== word[index] || result) {
            return; // 边界检查、字符不匹配或已经找到单词
        }

        if (index === word.length - 1) {
            result = true; // 找到完整单词
            return;
        }

        const char = board[row][col];
        board[row][col] = '#'; // 标记为已访问

        for (const [di, dj] of directions) {
            dfs(row + di, col + dj, index + 1);
        }

        board[row][col] = char; // 恢复棋盘状态
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === word[0]) {
                dfs(i, j, 0);
                if (result) return true; // 如果找到单词，立即返回true
            }
        }
    }
    return result; // 返回结果
};