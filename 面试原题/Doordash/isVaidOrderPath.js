const list_orders = [
    ['P1', 'P2', 'D1', 'D2'], 
    ['P1', 'D1', 'P2', 'D2'], 
    ['P1', 'D2', 'D1', 'P2'], 
    ['P1', 'D2'], 
    ['P1', 'P2'], 
    ['P1', 'D1', 'D1'], 
    [], 
    ['P1', 'P1', 'D1'], 
    ['P1', 'P1', 'D1', 'D1'], 
    ['P1', 'D1', 'P1'], 
    ['P1', 'D1', 'P1', 'D1']
]

function isValidOrderPath(orders) {
    if (orders.length === 0) return true;
    const pickSet = new Set();
    const dropSet = new Set();
    for (const order of orders) {
        const orderAction = order[0];
        const orderNumer = order[1];
        if (orderAction === 'P') {
            if (pickSet.has(orderNumer)) {
                return false;
            }
            pickSet.add(orderNumer);
        } else if (orderAction === 'D') {
            if (dropSet.has(orderNumer) || !pickSet.has(orderNumer)) {
                return false;
            }
            dropSet.add(orderNumer);
        } else {
            return false;
        }
    }
    return pickSet.size === dropSet.size;
}

//Given an integer representing number of orders, print all possible valid order paths 