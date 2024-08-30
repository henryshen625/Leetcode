function lengthOfLongestSubstring(s) {
    if (s.length === 0) return 0;
    let result = -Infinity;
    let left = 0;
    const map = new Map();

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        map.set(char, (map.get(char) || 0) + 1);
        if (i - left + 1 <= map.size) {
            result = Math.max(result, i - left + 1);
        }
        while (i - left + 1 > map.size) {
            const letter = s[left];
            map.set(letter, map.get(letter) - 1);
            if (map.get(letter) === 0) {
                map.delete(letter);
            }
            left++;
        }
    }
    return result;
}