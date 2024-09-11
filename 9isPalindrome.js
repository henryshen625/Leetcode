var isPalindrome = function(x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) {
        return false;
    }
    if (x === 0) return true;
    let lastHalf = 0;
    while (x > lastHalf) {
        lastHalf = lastHalf * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    return x === lastHalf || x === Math.floor(lastHalf / 10);
};