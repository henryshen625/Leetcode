var cloneGraph = function(node) {
    if (!node) return null;
    const visited = new Map();
    const queue = [node];

    visited.set(node, new _Node(node.val, []));

    while(queue.length > 0) {
        const n = queue.shift();
        for (let neighbor of n.neighbors) {
            if (!visited.has(neighbor)) {
                visited.set(neighbor, new _Node(neighbor.val, []));
                queue.push(neighbor);
            }
            visited.get(n).neighbors.push(visited.get(neighbor));
        }
    }
    return visited.get(node);
};