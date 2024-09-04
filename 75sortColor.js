var sortColors = function(nums) {
    let p0 = 0; // 指向0的边界
    let p2 = nums.length - 1; // 指向2的边界
    let i = 0; // 当前遍历位置

    while (i <= p2) {
        if (nums[i] === 0) {
            // 如果当前元素是0，和p0交换，并将p0和i都往前移
            [nums[i], nums[p0]] = [nums[p0], nums[i]];
            p0++;
            i++;
        } else if (nums[i] === 2) {
            // 如果当前元素是2，和p2交换，并将p2往后移 
            // 但此时不移动 i 因为从右边换过来的元素还没有检查过。
            [nums[i], nums[p2]] = [nums[p2], nums[i]];
            p2--;
        } else {
            // 如果是1，只需继续向前移动i
            i++;
        }
    }
};
