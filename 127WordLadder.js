/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */


function ladderLength(beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) return 0;
    const queue = [[beginWord, 1]];
    const wordSet = new Set(wordList);

    while (queue.length > 0) {
        const [word, step] = queue.shift();
        if (word === endWord) {
            return step;
        }
        for (let i = 0; i < word.length; i++) {
            for (let j = 97; j <= 122; j++) {
                const newWord = word.slice(0, i) + String.fromCharCode(j) + word.slice(i + 1);
                if (wordSet.has(newWord)) {
                    queue.push([newWord, step + 1]);
                    wordSet.delete(newWord);
                }
            }
        }
    }
    return 0;
}