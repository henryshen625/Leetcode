class Trie {
    constructor() {
        this.children = {};  // 存储子节点
        this.isEnd = false;  // 标记是否是单词的结尾
    }

    insert(word) {
        //将当前的 Trie 根节点赋值给 node 变量，用于遍历 Trie 树结构。
        let node = this;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new Trie();  // 如果不存在这个字符，创建新节点
            }
            node = node.children[char];  // 移动到下一个节点
        }
        node.isEnd = true;  // 标记这个节点为单词结尾
    }

    search(word) {
        let node = this;
        for (const char of word) {
            if (!node.children[char]) {
                return false;  // 如果中途找不到字符，返回 false
            }
            node = node.children[char];  // 移动到下一个节点
        }
        return node.isEnd;  // 最后检查是否是完整单词的结尾
    }

    startsWith(prefix) {
        let node = this;
        for (const char of prefix) {
            if (!node.children[char]) {
                return false;  // 如果中途找不到字符，返回 false
            }
            node = node.children[char];  // 移动到下一个节点
        }
        return true;  // 如果所有字符都存在，则返回 true
    }
}