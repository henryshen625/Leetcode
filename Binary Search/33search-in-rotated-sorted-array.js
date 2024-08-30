function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid; // 找到目标值，返回索引
        }

        // 判断哪一部分是有序的
        if (nums[left] <= nums[mid]) {
            // 左半部分是有序的
            if (nums[left] <= target && target < nums[mid]) {
                // 如果目标值在有序的左半部分
                right = mid - 1;
            } else {
                // 否则目标值在右半部分
                left = mid + 1;
            }
        } else {
            // 右半部分是有序的
            if (nums[mid] < target && target <= nums[right]) {
                // 如果目标值在有序的右半部分
                left = mid + 1;
            } else {
                // 否则目标值在左半部分
                right = mid - 1;
            }
        }
    }

    return -1; // 没找到目标值，返回 -1
}