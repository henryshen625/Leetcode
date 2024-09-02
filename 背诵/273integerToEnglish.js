var numberToWords = function(num) {
    if (num === 0) return "Zero"; // 特殊情况处理，如果数字为 0，直接返回 "Zero"

    // 1 到 19 的英文单词表示
    const belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", 
                         "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", 
                         "Eighteen", "Nineteen"];
    
    // 20, 30, ... 90 的英文单词表示
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    
    // 千位、百万位、十亿位等单位词
    const thousands = ["", "Thousand", "Million", "Billion"];

    // 辅助函数，用于将小于 1000 的数转换为单词
    function helper(num) {
        if (num === 0) return ""; // 如果当前数字为 0，返回空字符串（处理递归边界）
        if (num < 20) return belowTwenty[num] + " "; // 如果数字小于 20，直接返回其单词表示
        if (num < 100) return tens[Math.floor(num / 10)] + " " + helper(num % 10); // 如果数字小于 100，处理十位和个位
        if (num < 1000) return belowTwenty[Math.floor(num / 100)] + " Hundred " + helper(num % 100); // 如果数字小于 1000，处理百位和余下的部分
        
        // 处理大于等于 1000 的部分
        for (let i = 0; i < thousands.length; i++) {
            // 依次检查千位、百万位、十亿位等
            if (num < 1000 ** (i + 2)) {
                // 计算当前数字的高位部分，并递归处理低位部分
                return helper(Math.floor(num / (1000 ** (i + 1)))) + thousands[i + 1] + " " + helper(num % (1000 ** (i + 1)));
            }
        }
    }

    return helper(num).trim(); // 去掉结果末尾的多余空格，并返回结果
};


/***
特殊情况处理：

如果输入的 num 为 0，我们直接返回 "Zero"。这是唯一一个特殊情况，其他数字都通过 helper 函数处理。
基础数据：

belowTwenty: 包含了 1 到 19 的数字对应的英文单词，直接可以查找使用。
tens: 包含了 20 到 90 的数字对应的英文单词，用于处理十位数。
thousands: 包含了不同数量级的单位词，比如 "Thousand", "Million", "Billion"。
辅助函数 helper：

递归处理小数字：如果 num < 20，直接查表返回相应的单词。
递归处理两位数：如果 num < 100，先处理十位数，再递归处理个位数。
递归处理三位数：如果 num < 1000，先处理百位数，再递归处理余下的部分。
递归处理大数字：对于 num >= 1000 的数字，依次检查其是否位于千位、百万位或十亿位及以上。通过递归方式先处理高位部分，然后处理低位部分并拼接上相应的单位词。 
* 
 */