/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function(s) {
    const ops = [1];  // 栈，用于存储当前符号状态，初始化为正号
    let sign = 1;     // 当前符号，初始化为正号

    let result = 0;   // 结果变量
    const n = s.length; // 字符串长度
    let i = 0;  // 当前扫描位置

    while (i < n) {
        if (s[i] === ' ') {
            i++;  // 跳过空格
        } else if (s[i] === '+') {
            sign = ops[ops.length - 1];  // 设置当前符号为栈顶的值（正号）
            i++;
        } else if (s[i] === '-') {
            sign = -ops[ops.length - 1];  // 设置当前符号为栈顶的值的负号
            i++;
        } else if (s[i] === '(') {
            ops.push(sign);  // 将当前符号状态压入栈
            i++;
        } else if (s[i] === ')') {
            ops.pop();  // 弹出栈顶符号状态
            i++;
        } else {
            let num = 0;
            // 解析连续的数字字符
            while (i < n && !isNaN(parseInt(s[i]))) {
                num = num * 10 + (s[i].charCodeAt() - '0'.charCodeAt());
                i++;
            }
            // 根据当前符号累加到结果中
            result += sign * num;
        }
    }
    return result;  // 返回最终结果
};
