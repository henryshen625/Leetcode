function subarraySum(nums, k) {
    //default
    const map = { 0: 1 };
    let prefixSum = 0;
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
        prefixSum += nums[i];
        if (map[prefixSum - k]) {
            count += map[prefixSum - k];
        }
        if (map[prefixSum]) {
            map[prefixSum]++;
        } else {
            map[prefixSum] = 1;
        }
    }
    return count;
}

//前缀和 寻找 prefixSum[j]−prefixSum[i−1]==k
// -》 prefixSum[j] - k ?== prefixSum[i−1]