function calculate(s) {
    let res = 0;
    let num = 0;
    let sign = 1;
    const stack = [];

    for (const c of s) {
        if (!isNaN(parseInt(c))) {
            num = num * 10 + parseInt(c);
        } else if (c === "+" || c === "-") {
            res += sign * num;
            num = 0;
            sign = c === "+" ? 1 : -1;
        } else if (c === '(') {
            stack.push(res);
            stack.push(sign);
            res = 0;
            sign = 1;
        } else if (c === ')') {
            res += sign * num;
            num = 0;
            res *= stack.pop();
            res += stack.pop();
        }
    }
    res += sign * num;
    return res;
}