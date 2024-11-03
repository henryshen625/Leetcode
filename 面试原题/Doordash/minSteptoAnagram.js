function minSteps(s, t) {
    const sChar = Array(26).fill(0);
    const tChar = Array(26).fill(0);

    for (const char of s) {
        sChar[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    for (const char of t) {
        tChar[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    let step = 0;
    for (let i = 0; i < 26; i++) {
        if (sChar[i] > tChar[i]) {
            step += sChar[i] - tChar[i];
        }
    }
    return step;
}

const input = "anagram"
const list = ["grammar", "grammer", "anagram"]
// K = 2
const result = [];
for (const word of list) {
    if (minSteps(input, word) === 2 || minSteps(input, word) === 0) {
        result.push(word);
    }
}

console.log(result);

// printfindKAnagrams(intput, list, K))
// print(["grammar", "anagram"])


// input = "anagram"
// list = ["grammar"]
// K = 3
// printfindKAnagrams(intput, list, K))
// print(["grammar"])


// input = "anagram"
// list = ["grammar"]
// K = 1
// printfindKAnagrams(intput, list, K))
// print([])


// input = "omexyb grillg"
// list = ["omgxca grille"]
// K = 2
// printfindKAnagrams(intput, list, K))
// print(["omgxca grille"])