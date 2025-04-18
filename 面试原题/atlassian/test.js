function findWord(words, str) {
    // 统计字符串中各字符的频率
    const strFreq = {};
    for (const char of str) {
      strFreq[char] = (strFreq[char] || 0) + 1;
    }
    
    // 遍历每个单词，检查是否可以在字符串中构造出该单词的 anagram
    for (const word of words) {
      const wordFreq = {};
      for (const char of word) {
        wordFreq[char] = (wordFreq[char] || 0) + 1;
      }
      
      let isFound = true;
      for (const char in wordFreq) {
        if (!strFreq[char] || strFreq[char] < wordFreq[char]) {
          isFound = false;
          break;
        }
      }
      
      if (isFound) {
        return word;
      }
    }
    
    // 如果没有匹配的单词，则返回 null（或其它提示）
    return null;
}
  
  // 测试示例
const words = ["cat", "baby", "bird", "fruit"];
  
const string1 = "tacjbcebef";
console.log(findWord(words, string1)); // 输出 "cat"
  
const string2 = "bacdrigb";
console.log(findWord(words, string2)); // 输出 "bird"
  

function findPath(grid, target) {
    const rows = grid.length;
    if (rows === 0) return null;
    const cols = grid[0].length;
  
    // dfs递归函数：先检查边界，再检查当前格子字符是否符合要求
    function dfs(i, j, index, path) {
      // 先检查边界条件
      if (i < 0 || i >= rows || j < 0 || j >= cols) return false;
      
      // 再检查当前格子的字符是否与target中对应字符匹配
      if (grid[i][j] !== target[index]) return false;
      
      // 将当前坐标加入路径
      path.push([i, j]);
      
      // 如果已经匹配完target中的所有字符，则返回true
      if (index === target.length - 1) return true;
      
      // 尝试向右移动
      if (dfs(i, j + 1, index + 1, path)) return true;
      // 尝试向下移动
      if (dfs(i + 1, j, index + 1, path)) return true;
      
      // 如果都不成功，则回溯
      path.pop();
      return false;
    }
  
    // 遍历网格中所有可能的起点（即与target首字符相同的格子），并开始dfs搜索
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === target[0]) {
          const path = [];
          if (dfs(i, j, 0, path)) {
            return path;
          }
        }
      }
    }
    // 如果没有找到合法路径，则返回null
    return null;
  }
  
  // 示例测试
  const grid = [
    ['a', 'b', 'c', 'd'],
    ['e', 'f', 'g', 'h'],
    ['i', 'j', 'k', 'l'],
    ['m', 'n', 'o', 'p']
  ];
  const target = "bfgh"; // 示例目标字符串
  
  const result = findPath(grid, target);
  if (result) {
    console.log("路径为:", result);
  } else {
    console.log("未找到匹配路径。");
  }
  

