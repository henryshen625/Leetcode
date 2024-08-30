/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
function numBusesToDestination(routes, source, target) {
    if (source === target) return 0;
    const stopToBus = new Map();
    for (let i = 0; i < routes.length; i++) {
        for (const stop of routes[i]) {
            if (!stopToBus.has(stop)) {
                stopToBus.set(stop, []);
            }
            stopToBus.get(stop).push(i);
        }
    }

    const queue = [];
    const visitedBuses = new Set();
    const visitedStops = new Set();

    queue.push([source, 0]);

    while (queue.length > 0) {
        const [currStop, busCount] = queue.shift();
        visitedStops.add(currStop);
        for (const bus of stopToBus.get(currStop) || []) {
            if (visitedBuses.has(bus)) continue;
            visitedBuses.add(bus);
            for (const stop of routes[bus]) {
                if (stop === target) return busCount + 1;
                if (!visitedStops.has(stop)) {
                    queue.push([stop, busCount + 1]);
                    visitedStops.add(stop);
                }
            }
        }
    }
    return -1;
}