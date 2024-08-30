/** 假设有两个字符串数组 a 和 b，要求找出任意一个来自数组 a 的字符串和任意一个来自数组 b 的字符串之间的最长公共前缀（LCP），并返回这个最长公共前缀的长度。

Trie 的解决思路
Trie 是一个非常适合处理前缀匹配的问题的数据结构。我们可以通过以下步骤解决这个问题：

构建 Trie 树：首先将第一个数组中的所有字符串插入到 Trie 树中。
查找最长公共前缀：然后遍历第二个数组中的每个字符串，并在 Trie 树中查找它们的最长公共前缀。
*/

class Trie {
    constructor() {
        this.children = {};  // 存储子节点，key 为字符，value 为 Trie 节点
        this.isEnd = false;  // 标记是否是单词的结尾
    }

    insert(word) {
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

    // 添加一个方法来查找最长公共前缀的长度
    longestCommonPrefix(word) {
        let node = this;
        let prefixLength = 0;
        for (const char of word) {
            if (node.children[char]) {
                prefixLength++;
                node = node.children[char];  // 移动到下一个节点
            } else {
                break;  // 遇到不匹配的字符，结束前缀查找
            }
        }
        return prefixLength;
    }
}
const trie = new Trie();

// 插入单词
trie.insert("apple");
trie.insert("app");

// 查找单词
console.log(trie.search("apple"));  // 输出: true
console.log(trie.search("app"));    // 输出: true
console.log(trie.search("appl"));   // 输出: false

// 查找前缀
console.log(trie.startsWith("app")); // 输出: true
console.log(trie.startsWith("apx")); // 输出: false

// 查找最长公共前缀
console.log(trie.longestCommonPrefix("applepie"));  // 输出: 5
console.log(trie.longestCommonPrefix("apricot"));   // 输出: 3
