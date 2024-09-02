var findMedianSortedArrays = function(nums1, nums2) {
    // 保证 nums1 是较短的那个数组
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }

    const m = nums1.length;
    const n = nums2.length;
    const halfLen = Math.floor((m + n + 1) / 2);

    let imin = 0, imax = m;

    while (imin <= imax) {
        const i = Math.floor((imin + imax) / 2);
        const j = halfLen - i;

        if (i < m && nums2[j - 1] > nums1[i]) {
            // i is too small, must increase it
            imin = i + 1;
        } else if (i > 0 && nums1[i - 1] > nums2[j]) {
            // i is too big, must decrease it
            imax = i - 1;
        } else {
            // i is perfect

            let maxLeft;
            if (i === 0) {
                maxLeft = nums2[j - 1];
            } else if (j === 0) {
                maxLeft = nums1[i - 1];
            } else {
                maxLeft = Math.max(nums1[i - 1], nums2[j - 1]);
            }

            if ((m + n) % 2 === 1) {
                return maxLeft;
            }

            let minRight;
            if (i === m) {
                minRight = nums2[j];
            } else if (j === n) {
                minRight = nums1[i];
            } else {
                minRight = Math.min(nums1[i], nums2[j]);
            }

            return (maxLeft + minRight) / 2;
        }
    }

    return 0;
};
