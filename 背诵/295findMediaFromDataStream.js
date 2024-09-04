class MedianFinder {
    constructor() {
        // 最大堆，存储较小的一半
        this.maxHeap = new MaxPriorityQueue();
        // 最小堆，存储较大的一半
        this.minHeap = new MinPriorityQueue();
    }

    addNum(num) {
        // 先加入最大堆
        this.maxHeap.enqueue(num);

        // 保证最大堆的最大值小于最小堆的最小值
        this.minHeap.enqueue(this.maxHeap.dequeue().element);

        // 如果最小堆的大小超过最大堆，移回最大堆以保持平衡
        if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.enqueue(this.minHeap.dequeue().element);
        }
    }

    findMedian() {
        // 如果总数是奇数，返回最大堆的根节点
        if (this.maxHeap.size() > this.minHeap.size()) {
            return this.maxHeap.front().element;
        }

        // 如果是偶数，返回两个堆的根节点的平均值
        return (this.maxHeap.front().element + this.minHeap.front().element) / 2;
    }
}


/**
 使用两个堆（优先队列）解决这个问题：

最大堆：存储较小的一半数据。
最小堆：存储较大的一半数据。
为了保持中位数的性质：

最大堆中的所有元素都小于或等于最小堆中的所有元素。
如果数据总数是奇数，最大堆的元素个数应该比最小堆多 1 个；如果是偶数，则两个堆的元素个数相等。
详细步骤：
addNum(num)：

首先将 num 插入到最大堆（存储较小一半的元素）。
然后将最大堆的最大元素（也就是根节点）移入最小堆，确保最大堆中的所有元素都比最小堆中的元素小。
最后，如果最小堆的大小超过最大堆，将最小堆的最小元素移回最大堆，以确保两个堆的平衡性。
findMedian()：

如果总元素数为奇数，则最大堆的根节点就是中位数。
如果总元素数为偶数，则中位数为最大堆的根节点和最小堆的根节点的平均值。
 */