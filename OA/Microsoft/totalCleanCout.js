/***
问题描述： 你有一个机器人，它正在清扫一个大小为 N x M 的矩形网格，网格由一个字符串数组 R 表示：

"." 表示空地，机器人可以清扫这些方格。
"x" 表示障碍物，机器人无法通过这些方格。
机器人从网格的左上角 (0, 0) 开始，初始方向为向右。它会尽可能沿着当前方向前进，直到遇到边界或障碍物。每次遇到边界或障碍物时，机器人顺时针旋转 90 度，并尝试沿新的方向继续移动。

每当机器人移动到一个新的方格时，该方格被视为已清扫。问题的目标是计算机器人能清扫多少个方格（每个方格只会被清扫一次）。机器人最终可能陷入一个循环，此时它会不断重复清扫已清扫过的方格。

输入：
R 是一个 N 行、M 列的字符串数组，R[i][j] 是网格中的方格（. 或 x）。
输出：
返回机器人能清扫的方格总数（不重复清扫相同方格）。 

["..x..", "...x.", "x....", "..x.."]
6
[".......", ".......", "......."]
21
* * */


function solution(R) {
    const n = R.length;
    const m = R[0].length;

    const directions = [
        [0, 1],  // 右
        [1, 0],  // 下
        [0, -1], // 左
        [-1, 0]  // 上
    ];

    let directionIndex = 0; // 初始方向为右
    let x = 0, y = 0;

    const visited = new Set();  // 记录已清扫过的方格
    visited.add(`${x},${y}`);

    let cleanCount = 1;  // 初始位置已清扫

    const stateVisited = new Set();  // 用于记录位置和方向的状态组合
    stateVisited.add(`${x},${y},${directionIndex}`);

    while (true) {
        const [dx, dy] = directions[directionIndex];
        const newX = x + dx;
        const newY = y + dy;

        // 检查是否可以移动到新位置
        if (newX >= 0 && newX < n && newY >= 0 && newY < m && R[newX][newY] === '.') {
            // 更新机器人位置
            x = newX;
            y = newY;

            const pos = `${x},${y}`;
            if (!visited.has(pos)) {
                visited.add(pos);
                cleanCount++;
            }
        } else {
            // 不能移动，顺时针旋转 90 度
            directionIndex = (directionIndex + 1) % 4;
        }

        // 检查是否重复状态
        const state = `${x},${y},${directionIndex}`;
        if (stateVisited.has(state)) {
            break;  // 如果状态已经访问过，说明进入循环，终止
        } else {
            stateVisited.add(state);
        }
    }

    return cleanCount;
}
