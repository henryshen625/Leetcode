function longestConsecutive(nums) {
    if (nums.length == 0 || nums.length == 1) return nums.length;
    const map = new Set(nums);
    let result = -Infinity;

    for (const num of nums) {
        //找起点 避免重复计算
        if (!map.has(num - 1)) {
            let counter = 1;
            let current = num;
            while (map.has(current + 1)) {
                counter++;
                current++;
            }
            result = Math.max(result, counter);
        }
    }
    return result;
}
