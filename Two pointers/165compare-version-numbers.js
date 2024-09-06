var compareVersion = function(version1, version2) {
    const m = version1.length;
    const n = version2.length;
    let i = 0;
    let j = 0;

    while (i < m || j < n) {
        let num1 = 0;
        while(i < m && version1[i] !== '.') {
            num1 = num1 * 10 + parseInt(version1[i]);
            i++;
        }

        let num2 = 0;
        while (j < n && version2[j] !== '.') {
            num2 = num2 * 10 + parseInt(version2[j]);
            j++;
        }

        if (num1 > num2) {
            return 1;
        } else if (num1 < num2) {
            return -1;
        }
        console.log(num1, num2);
        i++;
        j++;
    }
    return 0;
};