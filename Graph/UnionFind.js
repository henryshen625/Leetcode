class UnionFind {
    constructor(n) {
        this.count = n;
        this.roots = new Array(n).fill(0).map((_, index) => index);
    }
    findRoot(x) {
        if (this.roots[x] !== x) {
            this.roots[x] = this.findRoot(this.roots[x]);
        }
        return this.roots[x];
    }
    union(x,y){
        const rx = this.findRoot(x);
        const ry = this.findRoot(y);
        this.roots[rx] = ry;
        this.count--;
    }
    isConnected(x,y){
        return this.findRoot(x) === this.findRoot(y)
    }
}