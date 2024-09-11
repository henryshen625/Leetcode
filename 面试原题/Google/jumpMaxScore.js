/*
一个一维数组[3,10,2,12] 判断从起始点0到最后终点的最大分数，
每次跳跃格数任意（1格或者直接跳到最后），score = 目的地的 score * distance，
比如直接跳到最后分数是 12*3 = 36， 如果一格格跳是10+2+12 = 24。
*/

function maxScore(nums) {
    let maxScore = 0;
    let i = 0;
    const n = nums.length;

    while (i < n - 1) {
        const directJumpScore = nums[n - 1] * (n - 1 - i);
        const stepScore = nums[i + 1];
        if (directJumpScore >= stepScore) {
            maxScore += directJumpScore;
            break;
        } else {
            maxScore += stepScore;
            i++;
        }
    }
    return maxScore;
}