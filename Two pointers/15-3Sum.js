/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
    const result = [];
    nums.sort((a,b) => a - b);
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) {
            break;
        }
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            if (nums[i] + nums[left] + nums[right] > 0) {
                right --;
            } else if (nums[i] + nums[left] + nums[right] < 0) {
                left ++;
            } else {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) {
                    left ++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right --;
                }
                right --;
                left ++;
            }
        }
    }
    return result;
};