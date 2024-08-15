var findKthLargest = function(nums1, nums2, k) {
    // 合并两个数组
    let merged = nums1.concat(nums2);
    
    // 排序
    merged.sort((a, b) => a - b);
    
    // 返回第 k 大的元素
    return merged[merged.length - k];
};


// follow up: O(log(k))

function findKthLargest(nums1, nums2, k) {
    const len1 = nums1.length;
    const len2 = nums2.length;

    function findKth(nums1, index1, nums2, index2, k) {
        // 如果 nums1 全部被排除，那么答案一定在 nums2 中
        if (index1 >= len1) {
            return nums2[index2 + k - 1];
        }

        // 如果 nums2 全部被排除，那么答案一定在 nums1 中
        if (index2 >= len2) {
            return nums1[index1 + k - 1];
        }

        // 如果 k = 1，那就返回两个数组中当前元素的最大值
        if (k === 1) {
            return Math.min(nums1[index1], nums2[index2]);
        }

        // 选择在 nums1 和 nums2 中比较的元素
        const mid1 = index1 + Math.floor(k / 2) - 1;
        const mid2 = index2 + Math.floor(k / 2) - 1;

        const pivot1 = mid1 < len1 ? nums1[mid1] : Infinity;
        const pivot2 = mid2 < len2 ? nums2[mid2] : Infinity;

        if (pivot1 > pivot2) {
            // 排除 nums2 的前 half 个元素
            return findKth(nums1, index1, nums2, mid2 + 1, k - (mid2 - index2 + 1));
        } else {
            // 排除 nums1 的前 half 个元素
            return findKth(nums1, mid1 + 1, nums2, index2, k - (mid1 - index1 + 1));
        }
    }

    return findKth(nums1, 0, nums2, 0, len1 + len2 - k + 1); // Convert k-th largest to k-th smallest
}
