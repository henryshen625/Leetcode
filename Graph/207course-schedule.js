/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const inDegree = new Array(numCourses).fill(0);
    const map = {};
    for (let i = 0; i < prerequisites.length; i++) {
        inDegree[prerequisites[i][0]]++
        if (map[prerequisites[i][1]]) {
            map[prerequisites[i][1]].push(prerequisites[i][0]);
        } else {
            map[prerequisites[i][1]] = [prerequisites[i][0]];
        }
    }
    const queue = [];
    for (let i = 0; i < inDegree.length; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    let count = 0;
    while (queue.length !== 0) {
        const select = queue.shift();
        count++;
        const toEnqueue = map[select];
        if (toEnqueue && toEnqueue.length !== 0) {
            for (const course of toEnqueue) {
                inDegree[course]--;
                if (inDegree[course] === 0) queue.push(course)
            }
        }
    }
    return count === numCourses;
};