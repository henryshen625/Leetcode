

var buddyStrings = function(s, goal) {
    if (s.length !== goal.length) {
        return false;
    }
    const a = Array(26).fill(0);
    const b = Array(26).fill(0);
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
        const x = s.charCodeAt(i) - 'a'.charCodeAt(0);
        const y = goal.charCodeAt(i) - 'a'.charCodeAt(0);
        a[x]++;
        b[y]++;
        if (x != y) {
            sum++;
        }
    }
    let ok = false;
    for (let i = 0; i < 26; i++) {
        if (a[i] !== b[i]) return false;
        if (a[i] > 1) ok = true;
    }

    return sum === 2 || (sum === 0 && ok);
};

const input = "hotpot"
list = ["hottop", "hotopt", "hotpit", "httoop", "hptoot"]
const result = [];
for (const char of list) {
    if (buddyStrings(input, char)) {
        result.push(char);
    }
}
console.log(result);

//print(["hottop", "hotopt", "hptoot"])
// input = "biryani"
// list = ["biryani", "biryeni", "biriyani", "biriany", "briynai"]
// print(findSimilarRestaurants(intput, list))
// print(["biryani", "biriany"])


// input = "omega grill"
// list = ["omeag grill", "omeea grill", "omega gril", "omegla gril"]
// print(findSimilarRestaurants(intput, list))
// print(["omeag grill"])