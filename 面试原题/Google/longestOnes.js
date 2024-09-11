//1. leetcode 485:
function findMaxConsecutiveOnes(nums) {
    let result = 0;
    let index = -1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            index = i;
        } else {
            result = Math.max(result, i - index);
        }
    }
    return result;
}

// 2.leetcode 1004 转换成当0的个数小等于k的时候 窗口最大值

var longestOnes = function(nums, k) {
    let left = 0;
    let ans = 0;
    let counter = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) {
            counter++;
        }
        while(counter > k) {
            if (nums[left] === 0) {
                counter--;
            }
            left++;
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
};