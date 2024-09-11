/**
 * router 的range问题，比如router是 Router A [0,0] , Router B[0,8], 
 * Router C[10,8]（坐标）, Router D [0,28] R = 10（范围内的都是connected）, 
 * 输入start router和end router，返回是否能从start传递到end，每次传递只能在range内
 */

function canTransmit(routers, R, start, end) {
    const n = routers.length;
    const isConnected = (router1, router2) => {
        const [x1, y1] = router1;
        const [x2, y2] = router2
        const distance = Math.sqrt((x2 - x1) ** 2 - (y2 - y1) **2 );
        return distance <= R;
    }
    const graph = Array.from({ length: n}, () => []);
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; i++) {
            if (isConnected(routers[i], routers[j])) {
                graph[i].push(j);
                graph[j].push(i);
            }
        }
    }

    const queue = [start]
    const visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0) {
        const router = queue.shift();
        if (router === end) {
            return true;
        }
        for (const neighbor of graph[router]) {
            if (!visited.has(neighbor.toString())){
                queue.push(neighbor);
                visited.add(neighbor.toString());
            }
        }
    }

    return false;
}

// follow up: router会优先传递给最近的 还可以吗
const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

function canTransmit(routers, R, start, end) {
    const n = routers.length;

    const getDistance = (router1, router2) => {
        const [x1, y1] = router1;
        const [x2, y2] = router2;
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1)**2);
    }

    const graph = Array.from({ length: n }, () => []);

    for (let i = 0; i < n; i++) {
        for (let j = i+ 1; j < n; j++) {
            if (getDistance(routers[i], routers[j]) < R) {
                graph[i].push(j);
                graph[j].push(i);
            }
        }
    }

    const minHeap = new MinPriorityQueue({ compare: (a, b) => a[0] - b[0]});
    const visited = new Set();
    minHeap.enqueue([0, start]);
    visited.add(start.toString());

    while (!minHeap.isEmpty()) {
        const [currDistance, currRouter] = minHeap.dequeue();
        if (currRouter === end) {
            return true;
        }
        for (const neighbor of graph[currRouter]) {
            if (!visited.has(neighbor.toString())) {
                const distance = getDistance(routers[currRouter], routers[neighbor]);
                minHeap.enqueue([currDistance + distance, neighbor]);
                visited.add(neighbor.toString());
            }
        }
    }
    return false;
}
