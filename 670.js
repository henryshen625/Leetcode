var maximumSwap = function (num) {
    const numString = num.toString();
    let maxIndex = numString.length - 1;
    let p = -1;
    let q = -1;
    for (let i = numString.length - 2; i >= 0; i--) {
        if (numString[i] > numString[maxIndex]) {
            maxIndex = i;
        } else if (numString[i] < numString[maxIndex]) {
            p = i;
            q = maxIndex;
        }
    }
    if (q === -1) {
        return num;
    } else {
        const numArray = numString.split('');
        const temp = numArray[q];
        numArray[q] = numArray[p];
        numArray[p] = temp;
        return parseInt(numArray.join(''));
    }
}

console.log(maximumSwap(9952767));
console.log(maximumSwap(2736));
console.log(maximumSwap(9973));
//core algo: 交换数字时p,q nums[q]越大越好， p越小越好，maxIndex只保存最大的