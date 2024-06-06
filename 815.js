/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
 var numBusesToDestination = function(routes, source, target) {
    // 如果起始车站和目标车站相同，返回0
    if (source === target) return 0;
    // 创建一个映射，用于存储每个车站可以乘坐的公交车路线索引
    const stationToIndex = new Map();
    for (let i = 0; i < routes.length; i++) {
        for (const station of routes[i]) {
            if (!stationToIndex.has(station)) stationToIndex.set(station, []);
            stationToIndex.get(station).push(i);
        }
    }

    // 如果起始车站或目标车站不在任何公交车路线中，返回-1
    if (!stationToIndex.has(source) || !stationToIndex.has(target)) {
        return -1;
    }
    // 初始化队列，存储当前车站和已乘坐的公交车次数
    const queue = [[source, 0]];
    // 用于存储已乘坐过的公交车路线索引，避免重复乘坐
    const usedIndex = new Set();
    // 用于存储已乘坐过的公交车路线索引，避免重复乘坐
    const usedNode = new Set();
    usedNode.add(source);

    while(queue.length) {
        // 取出当前车站和已乘坐的公交车次数
        const [u, w] = queue.shift();
        // 获取当前车站的所有公交车路线索引
        const indices = stationToIndex.get(u);
        // 如果当前车站是目标车站，返回已乘坐的公交车次数
        if (u === target) {
            return w;
        }
         // 遍历所有公交车路线索引
        for(const index of indices) {
            // 如果该路线已乘坐过，跳过
            if (usedIndex.has(index)) continue;
             // 记录该路线已乘坐
            usedIndex.add(index);
            // 遍历该路线的所有车站
            for(const v of routes[index]) {
                // 如果该车站已访问过，跳过
                if (usedNode.has(v)) continue;
                 // 记录该车站已访问
                usedNode.add(v);
                // 将新车站和已乘坐的公交车次数+1加入队列
                queue.push([v, w + 1]);
            }
        }
    }
    return -1;
};