/*** 
 问题描述
你有一个包含 g_nodes 个节点和 g_edges 条边的无向图。每个节点有一个关联的数值。你的任务是找到一个K-星形图（k-star graph），并返回该星形图的最大值和。

K-星形图：以某个节点为中心，并连接最多 k 个其他节点的子图，称为 k-星形图。一个 k-star 中心节点可以连接最多 k 条边。
目标：找出和最大的 k-星形图，并返回该和。

输入：
g_nodes：图中的节点数。
g_from 和 g_to：两个长度为 g_edges 的数组，描述了图中的每条边。g_from[i] 和 g_to[i] 表示一条边连接了节点 g_from[i] 和节点 g_to[i]。
values：长度为 g_nodes 的数组，表示每个节点的数值。
k：指定星形图最多可以连接的节点数（即星形图中心节点可以连接最多 k 条边 ）。
并非一定要用到K 个点 
g_nodes = 5
g_from = [1, 1, 3, 3, 3]
g_to = [2, 3, 4, 5, 1]
values = [10, 20, 30, 40, 50]
k = 2

g_nodes = 7
g_from = [0, 1, 1, 3, 3, 3]
g_to = [1, 2, 4, 5, 6, 4]
values = [1, 2, 3, 4, 10, -10, -20]
k = 2
16
* **/

function bestSumKStar(gNodes, gFrom, gTo, values, k) {
    const graph = Array.from({ length: gNodes }, () => []);

    // 构建邻接表
    for (let i = 0; i < gFrom.length; i++) {
        graph[gFrom[i]].push(gTo[i]);
        graph[gTo[i]].push(gFrom[i]);
    }

    let maxSum = -Infinity;

    // 遍历每个节点，计算以该节点为中心的k-star和
    for (let i = 0; i < gNodes; i++) {
        const neighbors = graph[i];

        // 如果该节点没有邻居，跳过
        if (neighbors.length === 0) continue;

        // 获取相邻节点的值，并排序
        const neighborValues = neighbors.map(neighbor => values[neighbor]).sort((a, b) => b - a);

        let starSum = values[i];

        // 添加k个最大值的邻居节点值，如果邻居值为负，考虑跳过或处理
        for (let j = 0; j < Math.min(k, neighborValues.length); j++) {
            if (neighborValues[j] < 0) break;  // 负值处理
            starSum += neighborValues[j];
        }

        // 更新最大和
        maxSum = Math.max(maxSum, starSum);
    }

    return maxSum;
}
