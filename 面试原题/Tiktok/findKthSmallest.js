/*
Find the Kth Smallest Element in Two Sorted Arrays
Description:

Given two sorted arrays nums1 and nums2 of size m and n respectively, and an integer k, return the kth smallest element in the combined sorted array of nums1 and nums2.

Constraints:

nums1 and nums2 are sorted in ascending order.
0 <= m, n <= 10^4
1 <= k <= m + n
The overall run time complexity should be O(log(min(m, n))).
The space complexity should be O(1).

Input: nums1 = [1, 3, 5], nums2 = [2, 4, 6], k = 4
Output: 4
Explanation: The combined sorted array is [1, 2, 3, 4, 5, 6] and the 4th smallest element is 4.

Input: nums1 = [-5, -3, -1, 1], nums2 = [-2, 0, 3, 4, 5], k = 6
Output: 1
Explanation: The combined sorted array is [-5, -3, -2, -1, 0, 1, 3, 4, 5] and the 6th smallest element is 1.

Input: nums1 = [-2, -1, 3, 5, 6, 8], nums2 = [0, 1, 2, 5, 9], k = 4
*/

function findKthSmallest(nums1, nums2, k) {
    const len1 = nums1.length;
    const len2 = nums2.length;

    if (len1 > len2) {
        return findKthSmallest(nums2, nums1, k)
    }
    if (len1 === 0) {
        return nums2[k - 1];
    }
    if (k === 1) {
        return Math.min(nums1[0], nums2[0]);
    }
    const pa = Math.min(Math.floor(k / 2), len1);
    const pb = k - pa;

    if (nums1[pa - 1] < nums2[pb - 1]) {
        return findKthSmallest(nums1.slice(pa), nums2, k - pa);
    } else {
        return findKthSmallest(nums1, nums2.slice(pb), k - pb);
    }
}

const nums1 = [-2, -1, 3, 5, 6, 8];
const nums2 = [0, 1, 2, 5, 9];
const k = 4;
console.log(findKthSmallest(nums1, nums2, k));