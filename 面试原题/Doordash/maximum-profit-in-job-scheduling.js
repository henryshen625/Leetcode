//leetcode 1235

var jobScheduling = function(startTime, endTime, profit) {
    const times = [];
    for (let i = 0; i < startTime.length; i++) {
        times.push([startTime[i], endTime[i], profit[i]]);
    }
    times.sort((a, b) => a[1] - b[1]);
    const n = times.length
    const dp = Array(n + 1).fill(0);
    dp[0] = 0;
    for (let i = 0; i < n; i++) {
        const j = search(times, i, times[i][0]);
        dp[i + 1] = Math.max(dp[i], dp[j + 1] + times[i][2]);
    }
    return dp[n];
};

function search(jobs, right, upper) {
    let left = 0;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (jobs[mid][1] <= upper) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return right;
}

//You're a dasher, and you want to try planning out your schedule. You can view a list of deliveries along with their associated start time, end time, and dollar amount for completing the order. Assuming dashers can only deliver one order at a time, determine the maximum amount of money you can make from the given deliveries.
// The inputs are as follows:

/** 
int start_time: when you plan to start your schedule
int end_time: when you plan to end your schedule
int d_starts[n]: the start times of each delivery[i]
int d_ends[n]: the end times of each delivery[i]
int d_pays[n]: the pay for each delivery[i]
The output should be an integer representing the maximum amount of money you can make by forming a schedule with the given deliveries.
Example #1
start_time = 0
end_time = 10
d_starts = [2, 3, 5, 7]
d_ends = [6, 5, 10, 11]
d_pays = [5, 2, 4, 1]
Expected output: 6
*/

const on = 0;
const off = 10;
const startTime = [2, 3, 5, 7];
const endTime = [6, 5, 10, 11];
const pay = [5, 2, 4, 1];
var jobScheduling1 = function(on, off, startTime, endTime, profit) {
    const times = [];
    for (let i = 0; i < startTime.length; i++) {
        if (startTime[i] >= on && endTime[i] <= off) {
            times.push([startTime[i], endTime[i], profit[i]]);
        }
    }
    times.sort((a, b) => a[1] - b[1]);
    const n = times.length
    const dp = Array(n + 1).fill(0);
    dp[0] = 0;
    for (let i = 0; i < n; i++) {
        const j = search1(times, i, times[i][0]);
        dp[i + 1] = Math.max(dp[i], dp[j + 1] + times[i][2]);
    }
    return dp[n];
};

function search1(jobs, right, upper) {
    let left = 0;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (jobs[mid][1] <= upper) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return right;
}
console.log(jobScheduling1(on, off, startTime, endTime, pay));