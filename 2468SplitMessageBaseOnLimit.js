/**
 * @param {string} message
 * @param {number} limit
 * @return {string[]}
 */
var splitMessage = function(message, limit) {
    let count = 0;
    let capacity = 0;
    let tailLength;
    while (true) {
        count++;
        if (count < 10) {
            tailLength = 5;
        } else if (count < 100) {
            //每到一个10位，后面的总数要多一位 所以9个数 -9 99个数-99
            if (count === 10) capacity -= 9;
            tailLength = 7;
        } else if ( count < 1000) {
            if (count === 100) capacity -=99;
            tailLength = 9;
        } else {
            if (count === 1000) capacity -= 999;
            tailLength = 11;
        }
        if (tailLength >= limit) return [];
        capacity += limit - tailLength;
        if (capacity >= message.length) {
            const ans = [];
            //记录当前分割字符的位置
            let k = 0;
            for (let j = 1; j < count + 1; j++) {
                const tail = `<${j}/${count}>`
                //最后一个段meesage
                if (j === count) {
                    ans.push(message.slice(k) + tail);
                } else {
                    //确定现在目前每段能放多少字符
                    const m = limit - tail.length;
                    ans.push(message.slice(k, k + m) + tail);
                    k += m;
                }
            }
            return ans;
        }
    }
};
//不适用二分的原因是因为每当 10分位的时候 capcity要变小在增加 不是名义上单调