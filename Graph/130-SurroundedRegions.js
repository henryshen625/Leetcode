function solve(board) {
    const m = board.length;
    const n = board[0].length;
    const dfs = (x, y) => {
        if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) return;
        if (board[x][y] === 'X' || board[x][y] === 'A') return;
        board[x][y] = 'A';
        dfs(x + 1, y);
        dfs(x - 1, y);
        dfs(x, y + 1);
        dfs(x, y - 1);
        return;
    }

    for (let i = 0; i < m; i++) {
        if (board[i][0] === 'O') dfs(i, 0);
        if (board[i][n - 1] === 'O') dfs(i, n - 1);
    }

    for (let j = 0 ; j < n; j++) {
        if (board[0][j] === 'O') dfs(0, j);
        if (board[m - 1][j] === 'O') dfs(m - 1, j);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') {
                board[i][j] = 'X';
            } else if (board[i][j] === 'A') {
                board[i][j] = 'O';
            }
        }
    }
    return;
}