class Trie {
    constructor() {
        this.children = {};
        this.word = null;
    }

    insert(word) {
        let node = this;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new Trie()
            }
            node = node.children[char];
        }
        node.word = word;
        return;
    }
}

function findWords(board, words) {
    const result = [];
    const m = board.length;
    const n = board[0].length;
    const trie = new Trie(); 

    for (const word of words) {
        trie.insert(word);
    }
    const dfs = (node, i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n) return;
        if (board[i][j] === '#') return;
        const char = board[i][j];
        node = node[char]
        if (!node) return;
        if (node.word) {
            result.push(node.word);
            node.word = null;
        }
        board[i][j] = '#'

        dfs(node.children, i + 1, j);
        dfs(node.children, i - 1, j);
        dfs(node.children, i, j + 1);
        dfs(node.children, i, j - 1);
       
        board[i][j] = char;
    }

    for (let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            if (trie.children[board[i][j]]) {
                dfs(trie.children, i, j);
            }
        }
    }
    return result;
}