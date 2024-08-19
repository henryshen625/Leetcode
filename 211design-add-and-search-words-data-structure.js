
var WordDictionary = function() {
    this.root = new Trie();
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    this.root.insert(word);
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    const dfs = (index, node) => {
        if (!node) return false;
        if (index === word.length) {
            return node.isEnd;
        }
        const ch = word[index];
        if (ch !== '.') {
           return dfs(index + 1, node.children[ch]);
        } else {
           for (const child of Object.values(node.children)) {
                if (dfs(index + 1, child)) {
                    return true;
                }
            }
        }
        return false;
    }
    return dfs(0, this.root);
};

/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

 class Trie {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }

    insert(word) {
        let node = this;
        for (const char of word) {
           if (!node.children[char]) {
                node.children[char] = new Trie();
            }
            node = node.children[char];
        }
        node.isEnd = true;
        return;
    }
 }