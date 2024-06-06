/**
 * @param {string} n
 * @return {string}
 */

 var nearestPalindromic = function(n) {
    const len = n.length;
    const m = BigInt(n);
    if (m < 10n || m === BigInt(10 ** (len - 1))) return (m - 1n).toString(); // 10 < 或 10,100...10000
    if (m + 1n === BigInt(10 ** len)) return (m + 2n).toString(); // 9,99...9999
    if (m - 1n === BigInt(10 ** (len - 1))) return (m - 2n).toString(); // 11,101...10001
    const pre = n.slice(0, len + 1 >>> 1); // 取一半，长度为奇数，多取 1 位
    let minDiff = Number.MAX_SAFE_INTEGER, ans = '';
    for (let i = -1; i <= 1; i++) { // 依次枚举 -1 +0 +1 三种情况，最小的最接近原数的结果先被找到
      const newPre = (parseInt(pre, 10) + i).toString(); // ↓ 长度为奇数，翻转少翻 1 位
      const newStr = newPre + (len & 1 ? newPre.slice(0, -1) : newPre).split('').reverse().join(''); // len & 1 位运算 是奇数为 1
      const diff = Math.abs(n - newStr) // 最接近：与原数的差绝对值最小
      if (diff && diff < minDiff) { // 差不能为 0 ，即找不能与原数一样，差绝对值最小的
        minDiff = diff;
        ans = newStr;
      }
    }
    return ans;
  }
  