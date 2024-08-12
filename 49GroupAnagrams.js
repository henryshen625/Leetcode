/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = new Map();
    for (const char of strs) {
        let temp = Array(26).fill(0);

        for(let i = 0; i < char.length; i++) {
            temp[char[i].charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
        }
        // 注意：如果数组 temp 作为key 会导致一个问题：在 JS中，数组是对象，两个内容相同的数组在 Map 中不会被视为相同的键
        // 所以需要转换成string作为key
        const key = temp.join(',');
        if (!map.has(key)) {
            map.set(key, [char]);
        } else {
            map.get(key).push(char);
        }
    }
    return Array.from(map.values()); 
};