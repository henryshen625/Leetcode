var maxSubArray = function(nums) {
    let result = -Infinity;
    let counter = 0;

    for (let i = 0; i < nums.length; i++) {
        counter += nums[i];
        if (counter > result) {
            result = counter;
        }
        //遇见负数应该立马重置counter
        if (counter < 0) {
            counter = 0;
        }
    }
    return result;
};