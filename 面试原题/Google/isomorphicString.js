//1. leetcode 205
function isIsomorphic(s, t) {
    const map1 = new Map();
    const map2 = new Map();
    for (let i = 0; i < s.length; i++) {
        const sChar = s[i];
        const tChar = t[i];
        if ((map1.has(tChar) && map1.get(tChar) !== sChar) || (map2.has(sChar) && map2.get(sChar) !== tChar)) {
            return false;
        }
        map1.set(tChar, sChar);
        map2.set(sChar, tChar);
    }
    return true;
}

// 给一个字符串列表，找出所有同构的字符串，并将它们进行分组;

function groupIsomorphicStrings(strings) {
    const groups = new Map();  // 用来存储不同的签名和对应的字符串组

    // 遍历字符串列表
    for (const str of strings) {
        const signature = getSignature(str);  // 为每个字符串计算签名

        if (!groups.has(signature)) {
            groups.set(signature, []);  // 如果没有这个签名的组，创建一个
        }
        groups.get(signature).push(str);  // 把当前字符串加入到对应签名的组中
    }

    // 返回所有分组的结果
    return Array.from(groups.values());
}

// 获取字符串的签名
function getSignature(str) {
    const map = new Map();
    let signature = '';
    let uniqueId = 0;

    for (const char of str) {
        if (!map.has(char)) {
            map.set(char, uniqueId++);  // 给每个新字符分配一个唯一的id
        }
        signature += map.get(char);  // 根据字符顺序构造签名
    }

    return signature;
}