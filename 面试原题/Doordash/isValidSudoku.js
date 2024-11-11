var isValidSudoku = function(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] !== '.') {
                if (!isValid(board[i][j], i, j, board)) {
                    return false;
                }
            }
        }
    }
    return true;
};



function isValid(number, row, col, board) {
    //col
    for(let i = 0; i < board.length; i++) {
        if (i !== col && board[row][i] === number) {
            return false;
        }
    }
    for(let j = 0; j < board.length; j++) {
        if (j !== row && board[j][col] === number) {
            return false;
        }
    }
    const colLeft = Math.floor(col / 3) * 3;
    const rowTop = Math.floor(row / 3) * 3;

    for (let k = rowTop; k < rowTop + 3; k++) {
        for (let l = colLeft; l < colLeft + 3; l++) {
            if ((k !== row || l !== col) && board[k][l] === number) {
                return false;
            }
        }
    }
    return true;
}


var solveSudoku = function(board) {
    function isValid(number, row, col) {
    //col
        for(let i = 0; i < board.length; i++) {
            if (i !== col && board[row][i] === number) {
                return false;
            }
        }
        for(let j = 0; j < board.length; j++) {
            if (j !== row && board[j][col] === number) {
                return false;
            }
        }
        const colLeft = Math.floor(col / 3) * 3;
        const rowTop = Math.floor(row / 3) * 3;

        for (let k = rowTop; k < rowTop + 3; k++) {
            for (let l = colLeft; l < colLeft + 3; l++) {
                if ((k !== row || l !== col) && board[k][l] === number) {
                    return false;
                }
            }
        }
        return true;
    }
    function backTracking() {
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[0].length; j++) {
                if(board[i][j] !== '.') continue
                for(let val = 1; val <= 9; val++) {
                    if(isValid(`${val}`, i, j)) {
                        board[i][j] = `${val}`
                        if (backTracking()) {
                            return true
                        }
                        
                        board[i][j] = `.`
                    }
                }
                return false
            }
        }
        return true
    }
    backTracking(board)
    return board;
};