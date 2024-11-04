class StreamProcessor {
    constructor(x) {
        this.x = x;
        this.queue = [];
    }

    setValue(time, value) {
        while (this.queue.length > 0 && this.queue[0][0] < time - this.x) {
            this.queue.shift();
        }
        while (this.queue.length > 0 && this.queue[this.queue.length - 1][1] < value) {
            this.queue.pop();
        }
        this.queue.push([time, value]);
    }

    maxValue(time) {
        while (this.queue.length > 0 && this.queue[0][0] < time - this.x) {
            this.queue.shift();
        }
        if (this.queue.length === 0) {
            return -1;
        }
        return this.queue[0][1];
    }
}

const sp = new StreamProcessor(5);
sp.setValue(0, 5);
sp.setValue(1, 6);
sp.setValue(2, 4);
sp.setValue(3, 7);
console.log(sp.maxValue(2)); // 输出 6