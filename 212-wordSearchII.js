class Trie {
    constructor() {
        this.root = {};
        this.word = null;
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node[char]) {
                node[char] = new Trie();
            }
            node = node[char];
        }
        node.word = word;
    }
}

var findWords = function(board, words) {
    if (!board.length || !board[0].length || !words.length) return [];

    const trie = new Trie();
    const ans = new Set();
    const m = board.length, n = board[0].length;

    for (const word of words) {
        trie.insert(word);
    }

    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const dfs = function(node, i, j) {
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] === '#') return;
        const ch = board[i][j];
        node = node[ch];
        if (!node) return;
        
        if (node.word) {
            ans.add(node.word);
            node.word = null; // Avoid duplicate entries
        }

        board[i][j] = '#'; // Mark as visited
        for (const [di, dj] of directions) {
            dfs(node, i + di, j + dj);
        }
        board[i][j] = ch; // Restore the board
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (trie.root[board[i][j]]) {
                dfs(trie.root, i, j);
            }
        }
    }
    return Array.from(ans);
};
