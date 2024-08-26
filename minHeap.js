class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        const currentValue = this.heap[index];

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parentValue = this.heap[parentIndex];

            if (currentValue >= parentValue) break;

            this.heap[index] = parentValue;
            this.heap[parentIndex] = currentValue;
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleDown(index) {
        const length = this.heap.length;
        const currentValue = this.heap[index];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let swap = null;

            if (leftChildIndex < length && this.heap[leftChildIndex] < currentValue) {
                swap = leftChildIndex;
            }

            if (rightChildIndex < length && this.heap[rightChildIndex] < (swap === null ? currentValue : this.heap[leftChildIndex])) {
                swap = rightChildIndex;
            }

            if (swap === null) break;

            this.heap[index] = this.heap[swap];
            this.heap[swap] = currentValue;
            index = swap;
        }
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }
}
