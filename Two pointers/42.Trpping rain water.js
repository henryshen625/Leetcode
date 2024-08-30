var trap = function(height) {
    // 初始化左右指针
    let left = 0;
    let right = height.length - 1;

    // 初始化左右最大值
    let leftMax = 0;
    let rightMax = 0;

    // 存储最终结果的变量
    let result = 0;

    // 当左指针小于右指针时，继续循环
    while (left < right) {
        // 更新左边和右边的最大高度
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);

        // 如果左边的最大高度大于右边的最大高度
        if (leftMax > rightMax) {
            // 右边可以储水的高度为右边最大高度减去当前右边高度
            result += rightMax - height[right];
            // 向左移动右指针
            right--;
        } else {
            // 如果左边的最大高度小于或等于右边的最大高度
            // 左边可以储水的高度为左边最大高度减去当前左边高度
            result += leftMax - height[left];
            // 向右移动左指针
            left++;
        }
    }
    
    // 返回计算的总储水量
    return result;
}
