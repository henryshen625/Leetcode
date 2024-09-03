function reverseWords(s) {
    let word = s.trim().split(' ').filter(s => s); // 过滤掉空白字符串
    word.reverse(); // 翻转数组
    return word.join(' '); // 以单个空格连接成字符串
}


//底层实现：
var reverseWords = function(s) {
    // 转换为数组并移除多余空格
    s = removeSpace(Array.from(s));
    
    // 翻转整个字符串
    reverse(s, 0, s.length - 1);
    
    // 翻转每个单词
    let start = 0;
    for (let i = 0; i <= s.length; i++) {
        if (s[i] === ' ' || i === s.length) {
            reverse(s, start, i - 1);
            start = i + 1;
        }
    }
    
    return s.join('');
};

function removeSpace(s) {
    let slow = 0;
    for (let fast = 0; fast < s.length; fast++) {
        if (s[fast] !== ' ' || (slow > 0 && s[slow - 1] !== ' ')) {
            s[slow++] = s[fast];
        }
    }
    // 截断尾部多余空格
    return s.slice(0, slow > 0 && s[slow - 1] === ' ' ? slow - 1 : slow);
}

function reverse(str, start, end) {
    while (start < end) {
        [str[start], str[end]] = [str[end], str[start]];  // 使用解构赋值交换
        start++;
        end--;
    }
}
