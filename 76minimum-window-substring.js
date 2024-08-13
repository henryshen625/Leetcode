/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

function minWindow(s, t) {
    if (t.length > s.length) {
        return '';
    }
    const map = new Map();
    for (const c of t) {
        map.set(c, (map.get(c) || 0) + 1);
    }

    let result = [0, Infinity];
    let left = 0;
    let needCnt = t.length;

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (map.has(char) && map.get(char) > 0) {
            needCnt--;
        }
        map.set(char, (map.get(char) || 0) - 1);
        if (needCnt === 0) {
            while (true) {
                const char2 = s[left];
                if (map.get(char2) === 0) {
                    break;
                }
                map.set(char2, map.get(char2) + 1);
                left++;
            }
            if (i - left < result[1] - result[0]) {
                result = [left, i];
            }
            map.set(s[left], map.get(s[left]) + 1);
            needCnt++;
            left++;
        }
    }
    return result[1] > s.length ? '' : s.slice(result[0], result[1] + 1);
}