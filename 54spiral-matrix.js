function spiralOrder(matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) return [];
    const result = [];
    const row = matrix.length;
    const col = matrix[0].length;
    let left  = 0, right = col - 1; top = 0; bottom = row - 1;

    while (left <= right && top <= bottom) {
        // 左到右 1 - 3 两遍都包涵
        for (let col  = left; col <= right; col++) {
            result.push(matrix[top][col]);
        }
        //上到下 6 - 9 不包含上
        for (let row = top + 1; row <= bottom; row++) {
            result.push(matrix[row][right]);
        }
        // 这里是指 如果上下 左右都各差一行以上的话 可以 
        if (left < right && top < bottom) {
            // 右到左 8 左右都不包含
            for (let col = right - 1; col > left; col--) {
                result.push(matrix[bottom][col]);
            }
            //下到上 7 - 4 不包含上
            for (let row = bottom; row > top; row--) {
                result.push(matrix[row][left])
            }
        }
        top++;
        left++;
        right--;
        bottom--;
    }
    return result;
}