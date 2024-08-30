/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function(n, connections) {
    const adjList = Array.from({ length: n }, () => []);
    let changes = 0;

    connections.forEach(([from, to]) => {
        adjList[from].push([to, true]);
        adjList[to].push([from, false]);
    })

    const queue = [0];
    const visited = new Array(n).fill(false);
    visited[0] = true;

    while (queue.length > 0) {
        const node = queue.shift();

        for (const [neighbor, needsChange] of adjList[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                if (needsChange) changes++;
                queue.push(neighbor);
            }
        }
    }
    return changes;
};