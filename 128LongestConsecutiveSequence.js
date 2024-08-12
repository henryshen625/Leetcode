/**
 * @param {number[]} nums
 * @return {number}
 */
// 从最小的数字开始找最长的连续序列
var longestConsecutive = function(nums) {
    if (nums.length === 0) {
        return 0;
    }
    const set = new Set(nums);
    let result = 0;

    for(const num of nums) {
        if (!set.has(num - 1)) {
            let currentNum = num;
            let current = 1;
            while (set.has(currentNum + 1)) {
                current++;
                currentNum++;
            }
            result = Math.max(current, result);
        }
    }
    return result;
};